import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ShaderSphere from './ShaderSphere';

const pillProducts = [
  { title: 'Smart 4K TV', image: '/assets/hero_pill/smart-tv.webp', tag: 'Smart 4K' },
  { title: 'Hi-Fi Soundbar', image: '/assets/hero_pill/soundbar.webp', tag: 'Dolby Audio' },
  { title: 'Digital Air Fryer', image: '/assets/hero_pill/air-fryer.webp', tag: 'Rapid 360°' },
  { title: 'Microwave Oven', image: '/assets/hero_pill/microwave.webp', tag: 'Smart Sensor' },
  { title: 'Air Purifier', image: '/assets/hero_pill/air-purifier.webp', tag: 'True HEPA' },
  { title: 'Inverter AC', image: '/assets/hero_pill/air-conditioner.webp', tag: '5-Star Inverter' },
  { title: 'Smart Refrigerator', image: '/assets/hero_pill/refrigerator.webp', tag: 'Twin Cooling' }
];

export default function Hero({ onOpenContact, isPreloaderActive = false }) {
  const [currentTime, setCurrentTime] = useState('');
  const [activePillIdx, setActivePillIdx] = useState(0);
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroY = useTransform(scrollY, [0, 450], [0, -60]);
  const heroScale = useTransform(scrollY, [0, 450], [1, 0.96]);
  const bgY = useTransform(scrollY, [0, 600], [0, 90]);

  // Preload all pill images to guarantee instantaneous rendering
  useEffect(() => {
    pillProducts.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  // Cycle preview pill products only after preloader finishes
  useEffect(() => {
    if (isPreloaderActive) return;

    const pillTimer = setInterval(() => {
      setActivePillIdx(prev => (prev + 1) % pillProducts.length);
    }, 3200);
    return () => clearInterval(pillTimer);
  }, [isPreloaderActive]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-framer-name="Section - Hero"
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '800px',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        overflow: 'hidden'
      }}
    >
      {/* Background Graphic & Gradient Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          y: bgY
        }}
      >
        <img
          src="/assets/hero-electronics-bg.jpg"
          alt="Umang Electronics Showcase"
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
            background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.03) 13.3%, rgba(0, 0, 0, 0.09) 24.7%, rgba(0, 0, 0, 0.19) 38.1%, rgba(0, 0, 0, 0.31) 50.4%, rgba(0, 0, 0, 0.46) 63%, rgba(0, 0, 0, 0.62) 76%, rgba(0, 0, 0, 0.8) 87.7%, rgb(0, 0, 0) 100%)'
          }}
        />
      </motion.div>

      {/* Main Center Content Container with Parallax Scroll Transition */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 4,
          maxWidth: '1240px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: heroOpacity,
          y: heroY,
          scale: heroScale
        }}
      >
        {/* Header Block matching original dimensions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            width: '100%'
          }}
        >
          {/* Authorized Electronics Destination Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
            animate={isPreloaderActive ? { opacity: 0, y: -16, filter: 'blur(6px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              alignSelf: 'stretch',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              marginBottom: '8px'
            }}
            className="hero-badge-container"
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
              className="hero-badge-pill"
            >
              {/* Electronics Zap / Spark Icon SVG */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white" />
              </svg>
              <span
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeight: '400',
                  letterSpacing: '-0.06px',
                  color: 'rgb(255, 255, 255)'
                }}
                className="hero-badge-text"
              >
                Authorized Consumer Electronics & Home Appliances
              </span>
            </div>
          </motion.div>

          {/* Main 3-Row Headline Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0px',
              userSelect: 'none',
              width: '100%'
            }}
            className="hero-headline-stack"
          >
            {/* ROW 1: Powering homes [gap 56px] with */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
              animate={isPreloaderActive ? { opacity: 0, y: 35, filter: 'blur(8px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '56px',
                height: '96px'
              }}
              className="hero-row-1"
            >
              <span
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: 'clamp(44px, 6.2vw, 88px)',
                  lineHeight: '96px',
                  letterSpacing: '-2.64px',
                  fontWeight: '400',
                  color: '#ffffff',
                  whiteSpace: 'nowrap'
                }}
              >
                Powering homes
              </span>
              <span
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: 'clamp(44px, 6.2vw, 88px)',
                  lineHeight: '96px',
                  letterSpacing: '-2.64px',
                  fontWeight: '400',
                  color: '#ffffff',
                  whiteSpace: 'nowrap'
                }}
              >
                with
              </span>
            </motion.div>

            {/* ROW 2: [Embedded Video width 142px] [gap 16px] cutting — edge */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
              animate={isPreloaderActive ? { opacity: 0, y: 35, filter: 'blur(8px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                height: '96px'
              }}
              className="hero-row-2"
            >
              {/* Embedded Hero Electronics Showcase Pill */}
              <div
                style={{
                  width: '142px',
                  height: '80px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#0a0a0d',
                  backgroundImage: `url(${pillProducts[0].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1.5px solid rgba(255, 255, 255, 0.28)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                  flexShrink: 0
                }}
                className="hero-preview-pill"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activePillIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <img
                      src={pillProducts[activePillIdx].image}
                      alt={pillProducts[activePillIdx].title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        display: 'block'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 45%, rgba(255,255,255,0.06) 100%)',
                        pointerEvents: 'none'
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '5px',
                        left: '6px',
                        fontSize: '9px',
                        fontWeight: '600',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.95)',
                        backgroundColor: 'rgba(0, 0, 0, 0.72)',
                        backdropFilter: 'blur(6px)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        pointerEvents: 'none',
                        lineHeight: '1.2'
                      }}
                      className="hero-pill-tag"
                    >
                      {pillProducts[activePillIdx].tag}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <span
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: 'clamp(44px, 6.2vw, 88px)',
                  lineHeight: '96px',
                  letterSpacing: '-2.64px',
                  fontWeight: '400',
                  color: '#ffffff',
                  whiteSpace: 'nowrap'
                }}
              >
                cutting — edge
              </span>
            </motion.div>

            {/* ROW 3: smart [Rotating Sphere 80px] appliances */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
              animate={isPreloaderActive ? { opacity: 0, y: 35, filter: 'blur(8px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                height: '96px'
              }}
              className="hero-row-3"
            >
              <span
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: 'clamp(44px, 6.2vw, 88px)',
                  lineHeight: '96px',
                  letterSpacing: '-2.64px',
                  fontWeight: '400',
                  color: '#ffffff',
                  whiteSpace: 'nowrap'
                }}
              >
                smart
              </span>

              {/* 3D WebGL Shader Sphere Badge (80x80) */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                className="hero-sphere-badge"
              >
                <ShaderSphere />
              </div>

              <span
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: 'clamp(44px, 6.2vw, 88px)',
                  lineHeight: '96px',
                  letterSpacing: '-2.64px',
                  fontWeight: '400',
                  color: '#ffffff',
                  whiteSpace: 'nowrap'
                }}
              >
                appliances
              </span>
            </motion.div>
          </div>

          {/* Right Bottom Shimmer Availability Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isPreloaderActive ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              alignSelf: 'stretch',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              marginTop: '4px'
            }}
            className="hero-shimmer-container"
          >
            <div style={{ position: 'relative', userSelect: 'none' }}>
              <p
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  letterSpacing: '-0.07px',
                  lineHeight: '20px',
                  color: 'rgb(109, 109, 109)',
                  margin: 0
                }}
              >
                Genuine Warranties & Expert Doorstep Setup
              </p>
              <p
                aria-hidden="true"
                className="text-shimmer-Rdpc6mlp"
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  letterSpacing: '-0.07px',
                  lineHeight: '20px',
                  color: 'transparent',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  margin: 0,
                  pointerEvents: 'none'
                }}
              >
                Genuine Warranties & Expert Doorstep Setup
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Row Fixed Elements */}
      {/* 1. Bottom Left: Timezone */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isPreloaderActive ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          zIndex: 9,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        className="hero-bottom-left"
      >
        <span
          style={{
            fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
            fontSize: '14px',
            fontWeight: '300',
            lineHeight: '20px',
            letterSpacing: '-0.07px',
            color: '#ffffff',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {currentTime || '11:09 AM'}
        </span>
        <span
          style={{
            fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
            fontSize: '14px',
            fontWeight: '300',
            lineHeight: '20px',
            letterSpacing: '-0.07px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}
        >
          (Live Store Desk)
        </span>
      </motion.div>

      {/* 2. Bottom Center: Subtitle Paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isPreloaderActive ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9,
          textAlign: 'center',
          maxWidth: '520px',
          width: 'calc(100% - 320px)'
        }}
        className="hero-bottom-center"
      >
        <p
          style={{
            fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
            fontSize: '14px',
            fontWeight: '300',
            lineHeight: '20px',
            letterSpacing: '-0.07px',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0
          }}
        >
          Umang Electronics delivers premium home appliances, 4K entertainment systems, and precision kitchen equipment with certified manufacturer support.
        </p>
      </motion.div>

      {/* 3. Bottom Right: Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isPreloaderActive ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          zIndex: 9,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
        className="hero-bottom-right"
      >
        <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} className="hero-scroll-text">
          <span
            style={{
              fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
              fontSize: '14px',
              fontWeight: '300',
              lineHeight: '20px',
              letterSpacing: '-0.07px',
              color: 'rgba(255, 255, 255, 0.6)',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.96)' }}>Scroll </span>for more
          </span>
        </div>

        {/* Animated Light Line */}
        <div
          style={{
            width: '2px',
            height: '90px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="hero-scroll-line"
        >
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '45px',
              background: 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)'
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes shimmer-Rdpc6mlp {
          0% { background-position: 200%; }
          100% { background-position: -100%; }
        }
        .text-shimmer-Rdpc6mlp {
          background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 30.5%,
            rgb(255, 255, 255) 50%,
            transparent 69.5%,
            transparent 100%
          );
          background-size: 200% 200%;
          -webkit-background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer-Rdpc6mlp 3s linear infinite;
        }

        @media (max-width: 809.98px) {
          #hero {
            padding: 0 20px !important;
            height: 100vh !important;
            min-height: 640px !important;
          }
          .hero-badge-container {
            justify-content: flex-start !important;
            width: 100% !important;
            margin-bottom: 4px !important;
          }
          .hero-badge-pill {
            padding: 6px 12px !important;
          }
          .hero-badge-text {
            font-size: 11px !important;
          }
          .hero-headline-stack {
            width: 100% !important;
          }
          .hero-row-1, .hero-row-2, .hero-row-3 {
            width: 100% !important;
            justify-content: space-between !important;
            gap: unset !important;
            height: 58px !important;
          }
          .hero-row-1 span, .hero-row-2 span, .hero-row-3 span {
            font-size: clamp(34px, 10vw, 44px) !important;
            line-height: 58px !important;
            letter-spacing: -1.3px !important;
          }
          .hero-preview-pill {
            width: 64px !important;
            height: 40px !important;
            border-radius: 10px !important;
          }
          .hero-pill-tag {
            display: none !important;
          }
          .hero-sphere-badge {
            width: 40px !important;
            height: 40px !important;
          }
          .hero-shimmer-container {
            justify-content: flex-end !important;
            width: 100% !important;
            margin-top: 4px !important;
          }
          .hero-bottom-left {
            display: none !important;
          }
          .hero-bottom-right {
            bottom: 100px !important;
            left: 50% !important;
            right: unset !important;
            transform: translateX(-50%) !important;
          }
          .hero-scroll-text {
            display: none !important;
          }
          .hero-scroll-line {
            height: 60px !important;
          }
          .hero-bottom-center {
            bottom: 24px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 40px) !important;
            max-width: 350px !important;
          }
          .hero-bottom-center p {
            font-size: 13px !important;
            line-height: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
