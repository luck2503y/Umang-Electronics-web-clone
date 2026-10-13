import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ShaderSphere from './ShaderSphere';

const pillProducts = [
  { title: 'Smart TV', image: '/assets/products/smart-tv.jpg', tag: 'Smart 4K' },
  { title: 'Refrigerator', image: '/assets/products/refrigerator.jpg', tag: 'Inverter' },
  { title: 'Air Conditioner', image: '/assets/products/air-conditioner.jpg', tag: '5-Star AC' },
  { title: 'Air Fryer', image: '/assets/products/air-fryer.jpg', tag: 'Digital 360°' },
  { title: 'Washing Machine', image: '/assets/products/washing-machine.jpg', tag: 'Direct Drive' }
];

export default function Hero({ onOpenContact }) {
  const [currentTime, setCurrentTime] = useState('');
  const [activePillIdx, setActivePillIdx] = useState(0);
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.96]);

  useEffect(() => {
    const pillTimer = setInterval(() => {
      setActivePillIdx(prev => (prev + 1) % pillProducts.length);
    }, 2800);
    return () => clearInterval(pillTimer);
  }, []);

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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none'
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
      </div>

      {/* Main Center Content Container with Parallax Scroll Transition */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 4,
          maxWidth: '1200px',
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
            gap: '16px'
          }}
        >
          {/* Authorized Electronics Destination Badge */}
          <div
            style={{
              alignSelf: 'stretch',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              marginBottom: '8px'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
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
              >
                Authorized Consumer Electronics & Home Appliances
              </span>
            </div>
          </div>

          {/* Main 3-Row Headline Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0px',
              userSelect: 'none'
            }}
          >
            {/* ROW 1: Powering homes [gap 56px] with */}
            <div
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
            </div>

            {/* ROW 2: [Embedded Video width 142px] [gap 16px] cutting — edge */}
            <div
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
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                  flexShrink: 0
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillIdx}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
                        display: 'block'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 45%, rgba(255,255,255,0.06) 100%)',
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
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(4px)',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        pointerEvents: 'none',
                        lineHeight: '1.3'
                      }}
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
            </div>

            {/* ROW 3: smart [Rotating Sphere 80px] appliances */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
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
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
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
            </div>
          </div>

          {/* Right Bottom Shimmer Availability Text */}
          <div
            style={{
              alignSelf: 'stretch',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              marginTop: '4px'
            }}
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
          </div>
        </div>
      </motion.div>

      {/* Bottom Row Fixed Elements */}
      {/* 1. Bottom Left: Timezone */}
      <div
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
      </div>

      {/* 2. Bottom Center: Subtitle Paragraph */}
      <div
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
      </div>

      {/* 3. Bottom Right: Scroll Indicator */}
      <div
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
        <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
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
      </div>

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

        @media (max-width: 810px) {
          .hero-row-1, .hero-row-2, .hero-row-3 {
            flex-wrap: wrap !important;
            height: auto !important;
            gap: 12px !important;
          }
          .hero-bottom-left, .hero-bottom-right {
            display: none !important;
          }
          .hero-bottom-center {
            width: calc(100% - 40px) !important;
          }
        }
      `}</style>
    </section>
  );
}
