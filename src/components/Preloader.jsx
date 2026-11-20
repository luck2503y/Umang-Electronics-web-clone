import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// The 8 authentic electronic product showcase cards matching the Umang Electronics catalogue
const introCards = [
  {
    id: 1,
    name: 'Rapid Air Fryer',
    image: '/assets/products/air-fryer.jpg',
    initialX: 600,
    delay: 0.55,
    zIndex: 11,
    stackY: -7
  },
  {
    id: 2,
    name: 'Convection Microwave Oven',
    image: '/assets/products/microwave-oven.jpg',
    initialX: -550,
    delay: 0.75,
    zIndex: 12,
    stackY: -6
  },
  {
    id: 3,
    name: 'Inverter Split Air Conditioner',
    image: '/assets/products/air-conditioner.jpg',
    initialX: 500,
    delay: 0.95,
    zIndex: 13,
    stackY: -5
  },
  {
    id: 4,
    name: 'Front-Load Washing Machine',
    image: '/assets/products/washing-machine-premium.jpg',
    initialX: -450,
    delay: 1.15,
    zIndex: 14,
    stackY: -4
  },
  {
    id: 5,
    name: 'French Door Refrigerator',
    image: '/assets/products/refrigerator.jpg',
    initialX: 400,
    delay: 1.35,
    zIndex: 15,
    stackY: -3
  },
  {
    id: 6,
    name: 'Surround Soundbar & Subwoofer',
    image: '/assets/products/soundbar.jpg',
    initialX: -350,
    delay: 1.55,
    zIndex: 16,
    stackY: -2
  },
  {
    id: 7,
    name: 'Audiophile Multimedia Speakers',
    image: '/assets/products/multimedia-speakers-premium.jpg',
    initialX: 300,
    delay: 1.75,
    zIndex: 17,
    stackY: -1
  },
  {
    id: 8,
    name: '4K Ultra HD OLED Smart TV',
    image: '/assets/products/oled-tv.jpg',
    initialX: -250,
    delay: 1.95,
    zIndex: 18,
    stackY: 0
  }
];

// True CSS cubic-bezier Newton-Raphson solver matching Framer [.3, 0, .2, 1.01]
function createCubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  function sampleX(t) { return ((ax * t + bx) * t + cx) * t; }
  function sampleY(t) { return ((ay * t + by) * t + cy) * t; }
  function sampleDerivX(t) { return (3 * ax * t + 2 * bx) * t + cx; }

  return function solve(x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = sampleX(t) - x;
      if (Math.abs(xEst) < 1e-5) return sampleY(t);
      const d = sampleDerivX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= xEst / d;
    }
    return sampleY(t);
  };
}
const curtainEase = createCubicBezier(0.3, 0, 0.2, 1.01);

export default function Preloader({ onComplete, brandName = 'Umang Electronics' }) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const maskRef = useRef(null);

  // Preload all 8 cards immediately to eliminate any asset latency
  useEffect(() => {
    introCards.forEach(card => {
      const img = new Image();
      img.src = card.image;
    });
  }, []);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    let animFrameId;
    const startTime = performance.now();

    // Exact calibrated timeline strictly matching madebykota.com
    const counterStart = 1000;     // counter sits at 0% for ~1.0s while brand unblurs & cards fly in
    const counterDuration = 1600;  // smoothly counts up to 100% at ~2600ms
    const curtainStart = 3700;     // holds complete 8-card stack + 100% counter for ~1.1s, wipes at 3700ms
    const curtainDuration = 900;   // curtain lift completes at 4600ms

    const tick = (now) => {
      const elapsed = now - startTime;

      // 1. Counter update with calibrated easing
      if (elapsed < counterStart) {
        setProgress(0);
      } else if (elapsed < counterStart + counterDuration) {
        const t = (elapsed - counterStart) / counterDuration;
        // Non-linear ease-out matching recorded values: rapid jump to ~60%, then smooth approach to 100%
        const ease = 1 - Math.pow(1 - t, 4);
        setProgress(Math.min(99, Math.floor(ease * 100)));
      } else {
        setProgress(100);
      }

      // 2. Curtain Lift Mask update (lifting from bottom of screen to top)
      if (maskRef.current) {
        if (elapsed < curtainStart) {
          const val = 'linear-gradient(0deg, rgba(0,0,0,0) -1%, rgba(0,0,0,1) 0%)';
          maskRef.current.style.webkitMaskImage = val;
          maskRef.current.style.maskImage = val;
        } else if (elapsed < curtainStart + curtainDuration) {
          const t = (elapsed - curtainStart) / curtainDuration;
          const easedT = Math.min(1, Math.max(0, curtainEase(t)));
          const p = easedT * 101;
          const val = `linear-gradient(0deg, rgba(0,0,0,0) ${p - 0.5}%, rgba(0,0,0,1) ${p}%)`;
          maskRef.current.style.webkitMaskImage = val;
          maskRef.current.style.maskImage = val;
        } else {
          const val = 'linear-gradient(0deg, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 101%)';
          maskRef.current.style.webkitMaskImage = val;
          maskRef.current.style.maskImage = val;
          setIsCompleted(true);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
          return;
        }
      }

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isCompleted) return null;

  // Split brand name into words and characters for staggered unblurring
  const words = brandName.split(' ');
  let charCounter = 0;

  return (
    <div
      ref={maskRef}
      data-framer-name="Mask"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#000000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(0deg, rgba(0,0,0,0) -1%, rgba(0,0,0,1) 0%)',
        maskImage: 'linear-gradient(0deg, rgba(0,0,0,0) -1%, rgba(0,0,0,1) 0%)'
      }}
    >
      {/* 1. Left Brand Name: Character-by-character unblur appear */}
      <div
        className="preloader-brand"
        style={{
          position: 'absolute',
          top: '50%',
          left: '40px',
          transform: 'translateY(-50%)',
          zIndex: 30,
          whiteSpace: 'nowrap'
        }}
      >
        <p
          style={{
            fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '-0.07px',
            lineHeight: '20px',
            color: '#ffffff',
            margin: 0,
            display: 'inline-flex',
            gap: '6px'
          }}
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, cIdx) => {
                const currentIdx = charCounter++;
                return (
                  <motion.span
                    key={cIdx}
                    initial={{ opacity: 0.001, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      delay: 0.15 + currentIdx * 0.035,
                      duration: 0.85,
                      ease: [0.3, 0, 0.2, 1]
                    }}
                    style={{
                      display: 'inline-block',
                      willChange: 'transform, filter, opacity'
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </p>
      </div>

      {/* 2. Right Percentage Counter: Tabular Lausanne 300 */}
      <div
        className="preloader-counter"
        style={{
          position: 'absolute',
          top: '50%',
          right: '49px',
          transform: 'translateY(-50%)',
          zIndex: 30
        }}
      >
        <span
          style={{
            fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
            fontSize: '14px',
            fontWeight: '300',
            letterSpacing: '-0.07px',
            lineHeight: '20px',
            color: '#ffffff',
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
            display: 'block'
          }}
        >
          {progress}%
        </span>
      </div>

      {/* 3. Center 8 Cards Stack with Exact Spring Physics & Layered Hierarchy */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {introCards.map((card) => {
          return (
            <motion.div
              key={card.id}
              className="preloader-card"
              transformTemplate={({ x, y }) => `translate(-50%, -50%) translate3d(${x}, ${y}, 0)`}
              initial={{
                x: card.initialX,
                y: 950,
                opacity: 1,
                scale: 1,
                rotate: 0
              }}
              animate={{
                x: 0,
                y: card.stackY || 0,
                opacity: 1,
                scale: 1,
                rotate: 0
              }}
              transition={{
                type: 'spring',
                damping: 48,
                stiffness: 220,
                mass: 1,
                delay: card.delay
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 'min(600px, 86vw)',
                aspectRatio: '1.6',
                zIndex: card.zIndex,
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                overflow: 'hidden',
                backgroundColor: '#0a0a0d',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.2)',
                willChange: 'transform'
              }}
            >
              <img
                src={card.image}
                alt={card.name}
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '16px'
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Responsive Styles strictly matching original CSS rules */}
      <style>{`
        @media (max-width: 1199.98px) {
          .preloader-card {
            width: 500px !important;
          }
        }
        @media (max-width: 809.98px) {
          .preloader-card {
            width: min(320px, 86vw) !important;
          }
          .preloader-brand {
            top: 40px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 100% !important;
            text-align: center !important;
            display: flex !important;
            justify-content: center !important;
          }
          .preloader-counter {
            top: 68px !important;
            right: unset !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </div>
  );
}
