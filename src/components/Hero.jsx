import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero({ onOpenContact, isPreloaderActive = false }) {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 600], [0, 90]);

  const pillAnchorRef = useRef(null);
  const videoContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  // High-performance 60fps RAF scroll expansion matching Framer's exact math
  useEffect(() => {
    let animFrameId = null;
    let cachedAnchor = null;

    const measureAnchor = () => {
      const anchor = pillAnchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const currentScroll = window.scrollY || window.pageYOffset;
      cachedAnchor = {
        left: rect.left,
        top: rect.top + currentScroll,
        width: rect.width,
        height: rect.height
      };
    };

    measureAnchor();
    window.addEventListener('resize', measureAnchor);

    const update = () => {
      animFrameId = null;
      const heroVid = videoContainerRef.current;
      const overlay = overlayRef.current;
      const playreel = document.getElementById('playreel');
      if (!heroVid || !playreel) return;

      if (!cachedAnchor) measureAnchor();
      if (!cachedAnchor) return;

      const playreelRect = playreel.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // Exact Framer motion scroll formula:
      // Ic(playreelRect, vh) => (vh - playreelRect.top) / vh, clamped [0, 1]
      const progress = vh <= 0 ? 0 : Math.min(1, Math.max(0, (vh - playreelRect.top) / vh));

      if (progress <= 0) {
        // Natural relative placement inside Hero Row 2
        heroVid.style.position = 'relative';
        heroVid.style.left = '0px';
        heroVid.style.top = '0px';
        heroVid.style.width = '100%';
        heroVid.style.height = '100%';
        heroVid.style.borderRadius = '16px';
        heroVid.style.zIndex = '5';
        heroVid.style.pointerEvents = 'auto';
        heroVid.style.transform = 'none';
        if (overlay) overlay.style.opacity = '0';
      } else {
        const isMobile = vw < 810;
        const initialRadius = isMobile ? 10 : 16;

        // Exact Framer linear coordinate interpolation:
        // left: a.left + (r.left - a.left) * progress, where r.left = 0
        const curLeft = cachedAnchor.left * (1 - progress);

        // top: lerps from a.top to playreelRect.top until progress=1;
        // when progress >= 1, locks directly to playreelRect.top so it scrolls up naturally
        const curTop = progress >= 1
          ? playreelRect.top
          : cachedAnchor.top + (playreelRect.top - cachedAnchor.top) * progress;

        const curWidth = cachedAnchor.width + (vw - cachedAnchor.width) * progress;
        const curHeight = cachedAnchor.height + (vh - cachedAnchor.height) * progress;
        const curRadius = (1 - progress) * initialRadius;

        heroVid.style.position = 'fixed';
        heroVid.style.left = `${curLeft}px`;
        heroVid.style.top = `${curTop}px`;
        heroVid.style.width = `${curWidth}px`;
        heroVid.style.height = `${curHeight}px`;
        heroVid.style.borderRadius = `${curRadius}px`;
        heroVid.style.zIndex = '7';
        heroVid.style.pointerEvents = 'none';
        heroVid.style.overflow = 'hidden';
        heroVid.style.willChange = 'left, top, width, height, border-radius';

        if (overlay) {
          overlay.style.opacity = `${progress}`;
        }
      }

      // Simultaneously update Playreel typography & play button scale
      const isMobile = window.innerWidth < 768;
      const maxShift = isMobile ? Math.min(80, window.innerWidth * 0.2) : 300;
      const playX = -maxShift * (1 - progress);
      const reelX = maxShift * (1 - progress);
      const btnScale = 0.5 + 0.5 * progress;

      const playEl = document.getElementById('playreel-text-play');
      const reelEl = document.getElementById('playreel-text-reel');
      const timeEl = document.getElementById('playreel-text-time');
      const copyEl = document.getElementById('playreel-text-copy');
      const btnEl = document.getElementById('5czkxl');

      if (playEl) playEl.style.transform = `translateX(${playX}px)`;
      if (timeEl) timeEl.style.transform = `translateX(${playX}px)`;
      if (reelEl) reelEl.style.transform = `translateX(${reelX}px)`;
      if (copyEl) copyEl.style.transform = `translateX(${reelX}px)`;
      if (btnEl) btnEl.style.transform = `scale(${btnScale})`;
    };

    const onScroll = () => {
      if (animFrameId === null) {
        animFrameId = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureAnchor);
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
    };
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
          fetchPriority="high"
          decoding="async"
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

      {/* Main Center Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          maxWidth: '1240px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
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
              {/* Embedded Hero Video Pill Anchor */}
              <div
                ref={pillAnchorRef}
                id="hero-video-anchor"
                style={{
                  width: '142px',
                  height: '80px',
                  borderRadius: '16px',
                  position: 'relative',
                  flexShrink: 0
                }}
                className="hero-preview-pill"
              >
                <div
                  ref={videoContainerRef}
                  id="hero-video"
                  data-framer-name="onDesktop"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#0a0a0d',
                    border: '1.5px solid rgba(255, 255, 255, 0.28)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                    transform: 'none'
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster="/assets/hero-electronics-bg.jpg"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  >
                    <source src="/assets/videos/hero-showcase.webm" type="video/webm" />
                    <source src="/assets/videos/hero-showcase.mp4" type="video/mp4" />
                  </video>
                  <div
                    ref={overlayRef}
                    id="hero-video-overlay"
                    data-framer-name="Video Scale Overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 100%)',
                      opacity: 0,
                      pointerEvents: 'none'
                    }}
                  />
                </div>
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

            {/* ROW 3: smart appliances */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
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

        @media (max-width: 809.98px) {
          #hero {
            padding: 0 20px !important;
            height: 100vh !important;
            min-height: 640px !important;
          }
          .hero-headline-stack {
            width: 100% !important;
          }
          .hero-row-1, .hero-row-2 {
            width: 100% !important;
            justify-content: space-between !important;
            gap: unset !important;
            height: 58px !important;
          }
          .hero-row-3 {
            width: 100% !important;
            justify-content: center !important;
            gap: 12px !important;
            height: 58px !important;
          }
          .hero-row-1 span, .hero-row-2 span, .hero-row-3 span {
            font-size: clamp(34px, 10vw, 44px) !important;
            line-height: 58px !important;
            letter-spacing: -1.3px !important;
          }
          #hero-video-anchor, .hero-preview-pill {
            width: 64px !important;
            height: 40px !important;
            border-radius: 10px !important;
          }
        }

        @media (max-width: 480px) {
          #hero {
            padding: 0 16px !important;
            min-height: 580px !important;
          }
          .hero-row-1, .hero-row-2, .hero-row-3 {
            height: auto !important;
            margin: 4px 0 !important;
            gap: 8px !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .hero-row-1 span, .hero-row-2 span, .hero-row-3 span {
            font-size: clamp(24px, 7.5vw, 36px) !important;
            line-height: 1.15 !important;
            letter-spacing: -1px !important;
          }
          #hero-video-anchor, .hero-preview-pill {
            width: 56px !important;
            height: 34px !important;
            border-radius: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
