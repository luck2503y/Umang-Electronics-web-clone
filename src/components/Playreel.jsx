import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Playreel() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Scroll animations linked to entering and centering the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [0.72, 1]);
  const playX = useTransform(scrollYProgress, [0, 1], [-260, 0]);
  const reelX = useTransform(scrollYProgress, [0, 1], [260, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  return (
    <section
      ref={containerRef}
      data-framer-name="Section - Playreel"
      id="playreel"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        overflow: 'hidden'
      }}
    >
      {/* Centered Rounded Video Card Frame matching original */}
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1080px',
          aspectRatio: '16 / 10',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          scale: cardScale,
          transformOrigin: 'center center',
          willChange: 'transform'
        }}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          src="https://stream.mux.com/kvyETSxTWR4yWLgS7zJjL7W1my00PprfrISoZPY1rurM/1080p.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Dark Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.5) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Centered Typography: PLAY [BUTTON] REEL */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            userSelect: 'none'
          }}
        >
          {/* Top: [ 00:44 ] aligned to start of PLAY */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              paddingLeft: '12px',
              marginBottom: '-8px'
            }}
          >
            <motion.span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: '13px',
                fontWeight: '400',
                letterSpacing: '-0.07px',
                color: 'rgba(255, 255, 255, 0.9)',
                x: playX,
                opacity: textOpacity,
                willChange: 'transform, opacity'
              }}
            >
              [ 00:44 ]
            </motion.span>
          </div>

          {/* Middle: PLAY [Glass Play Button] REEL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            <motion.span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(56px, 7vw, 92px)',
                lineHeight: '1',
                letterSpacing: '-2.8px',
                fontWeight: '400',
                color: '#ffffff',
                textTransform: 'uppercase',
                x: playX,
                opacity: textOpacity,
                willChange: 'transform, opacity'
              }}
            >
              PLAY
            </motion.span>

            {/* Glass Play Button 160x76 Oval */}
            <button
              onClick={() => setModalOpen(true)}
              style={{
                width: '160px',
                height: '76px',
                borderRadius: '1000px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(255, 255, 255, 0.16)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 12
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.28)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderTop: '9px solid transparent',
                  borderBottom: '9px solid transparent',
                  borderLeft: '16px solid #ffffff',
                  marginLeft: '4px'
                }}
              />
            </button>

            <motion.span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(56px, 7vw, 92px)',
                lineHeight: '1',
                letterSpacing: '-2.8px',
                fontWeight: '400',
                color: '#ffffff',
                textTransform: 'uppercase',
                x: reelX,
                opacity: textOpacity,
                willChange: 'transform, opacity'
              }}
            >
              REEL
            </motion.span>
          </div>

          {/* Bottom: ©2026 aligned to end of REEL */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '12px',
              marginTop: '-4px'
            }}
          >
            <motion.span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: '13px',
                fontWeight: '400',
                letterSpacing: '-0.07px',
                color: 'rgba(255, 255, 255, 0.85)',
                x: reelX,
                opacity: textOpacity,
                willChange: 'transform, opacity'
              }}
            >
              ©2026
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Video Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1200px',
              aspectRatio: '16/9',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
              position: 'relative',
              backgroundColor: '#000'
            }}
          >
            <video
              src="https://stream.mux.com/kvyETSxTWR4yWLgS7zJjL7W1my00PprfrISoZPY1rurM/1080p.mp4"
              controls
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '8px 16px',
                borderRadius: '1000px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: '"TWK Lausanne 400", sans-serif'
              }}
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
