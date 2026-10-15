import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const introCards = [
  { id: 1, name: 'smart-tv', title: '4K OLED Ultra Cinema', image: '/assets/hero_cards/smart-tv.webp', x: 260, y: 160, rotate: 6 },
  { id: 2, name: 'refrigerator', title: 'Twin Cooling Refrigerator', image: '/assets/hero_cards/refrigerator.webp', x: -240, y: 130, rotate: -7 },
  { id: 3, name: 'air-conditioner', title: 'Inverter Climate Control', image: '/assets/hero_cards/air-conditioner.webp', x: 200, y: 80, rotate: 4 },
  { id: 4, name: 'soundbar', title: 'Dolby Atmos Soundbar', image: '/assets/hero_cards/soundbar.webp', x: -180, y: 50, rotate: -5 },
  { id: 5, name: 'air-purifier', title: 'True HEPA Air Purifier', image: '/assets/hero_cards/air-purifier.webp', x: 140, y: 20, rotate: 3 },
  { id: 6, name: 'microwave', title: 'Smart Sensor Microwave', image: '/assets/hero_cards/microwave.webp', x: -100, y: -10, rotate: -3 },
  { id: 7, name: 'air-fryer', title: 'Digital Rapid Air Fryer', image: '/assets/hero_cards/air-fryer.webp', x: 0, y: 0, rotate: 0 }
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Disable body scroll during preloader
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds total

    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Smooth non-linear curve
      const easeVal = Math.floor(rawProgress * 100);
      setProgress(easeVal);

      if (rawProgress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }, 650);
        }, 150);
      }
    };

    const animId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: '#000000',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none'
          }}
        >
          {/* Top/Center Brand Name (Left aligned on desktop) */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', x: -20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '40px',
              transform: 'translateY(-50%)',
              zIndex: 20
            }}
            className="preloader-brand"
          >
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                letterSpacing: '-0.07px',
                lineHeight: '20px',
                color: '#ffffff',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
            >
              Umang Electronics
            </span>
          </motion.div>

          {/* Progress Percentage Counter (Right aligned on desktop) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '48px',
              transform: 'translateY(-50%)',
              zIndex: 20
            }}
            className="preloader-counter"
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
                whiteSpace: 'nowrap'
              }}
            >
              {progress}%
            </span>
          </div>

          {/* Center Card Stack */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {introCards.map((card, index) => {
              // Stagger appearance based on progress
              const threshold = (index / introCards.length) * 70;
              const isVisible = progress >= threshold;

              return (
                <motion.div
                  key={card.id}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 200,
                    x: 0,
                    rotate: 0
                  }}
                  animate={
                    isVisible
                      ? {
                          opacity: 1,
                          scale: 1,
                          y: isDone ? card.y * 3 : card.y * 0.4,
                          x: isDone ? card.x * 2.8 : card.x * 0.45,
                          rotate: card.rotate
                        }
                      : {
                          opacity: 0,
                          scale: 0.8,
                          y: 200,
                          x: 0,
                          rotate: 0
                        }
                  }
                  transition={{
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{
                    position: 'absolute',
                    width: 'min(580px, 78vw)',
                    aspectRatio: '16/10',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    backgroundColor: '#0d0e12',
                    border: '1.5px solid rgba(255, 255, 255, 0.16)',
                    boxShadow: '0 24px 70px rgba(0, 0, 0, 0.88), 0 4px 12px rgba(255, 255, 255, 0.05)',
                    transformOrigin: 'center center',
                    zIndex: 10 + index
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, rgba(255,255,255,0.06) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '18px',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '11px',
                      fontWeight: '500',
                      letterSpacing: '-0.02em',
                      fontFamily: '"TWK Lausanne 400", sans-serif'
                    }}
                  >
                    {card.title}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <style>{`
            @media (max-width: 810px) {
              .preloader-brand {
                top: 40px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
              }
              .preloader-counter {
                top: 68px !important;
                right: unset !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
