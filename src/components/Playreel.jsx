import React, { useState } from 'react';

export default function Playreel() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      data-framer-name="Section - Playreel"
      id="playreel"
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
        overflow: 'hidden'
      }}
    >
      {/* Background container that aligns with expanding video */}
      <div
        data-framer-name="BG"
        id="playreel-video"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <div
          data-framer-name="Faded Overlay"
          id="playreel-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.6) 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Centered Typography: [ 00:44 ] PLAY [BUTTON] REEL ©2026 */}
      <div
        data-framer-name="Container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          userSelect: 'none',
          padding: '0 20px'
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
          <div
            id="playreel-text-time"
            style={{
              willChange: 'transform',
              opacity: 1,
              transform: 'translateX(-300px)'
            }}
          >
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: '13px',
                fontWeight: '400',
                letterSpacing: '-0.07px',
                color: 'rgba(255, 255, 255, 0.96)'
              }}
            >
              [ 00:30 ]
            </span>
          </div>
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
          <div
            id="playreel-text-play"
            style={{
              willChange: 'transform',
              opacity: 1,
              transform: 'translateX(-300px)'
            }}
          >
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(56px, 8.5vw, 120px)',
                lineHeight: '1',
                letterSpacing: '-3.6px',
                fontWeight: '400',
                color: '#ffffff',
                textTransform: 'uppercase',
                display: 'block'
              }}
            >
              PLAY
            </span>
          </div>

          {/* Glass Play Button (scales from 0.5 to 1.0) */}
          <div
            id="5czkxl"
            style={{
              willChange: 'transform',
              opacity: 1,
              transform: 'scale(0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <button
              onClick={() => setModalOpen(true)}
              aria-label="Play Reel"
              style={{
                width: '180px',
                height: '80px',
                borderRadius: '1000px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(153, 153, 153, 0.16)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.25s, transform 0.25s',
                outline: 'none',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.28)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(153, 153, 153, 0.16)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  width: '0',
                  height: '0',
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: '18px solid #ffffff',
                  marginLeft: '4px'
                }}
              />
            </button>
          </div>

          <div
            id="playreel-text-reel"
            style={{
              willChange: 'transform',
              opacity: 1,
              transform: 'translateX(300px)'
            }}
          >
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(56px, 8.5vw, 120px)',
                lineHeight: '1',
                letterSpacing: '-3.6px',
                fontWeight: '400',
                color: '#ffffff',
                textTransform: 'uppercase',
                display: 'block'
              }}
            >
              REEL
            </span>
          </div>
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
          <div
            id="playreel-text-copy"
            style={{
              willChange: 'transform',
              opacity: 1,
              transform: 'translateX(300px)'
            }}
          >
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: '13px',
                fontWeight: '400',
                letterSpacing: '-0.07px',
                color: 'rgba(255, 255, 255, 0.85)'
              }}
            >
              ©2026
            </span>
          </div>
        </div>
      </div>

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
              controls
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            >
              <source src="/assets/videos/playreel-showcase.mp4" type="video/mp4" />
              <source src="/assets/videos/playreel-showcase.webm" type="video/webm" />
            </video>
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

      <style>{`
        @media (max-width: 809.98px) {
          #playreel {
            height: 100vh !important;
            min-height: 520px !important;
            overflow: hidden !important;
            max-width: 100vw !important;
          }
          #playreel-text-play, #playreel-text-reel, #playreel-text-copy {
            transform: translateX(0) !important;
          }
          #5czkxl button {
            width: 90px !important;
            height: 44px !important;
          }
          #playreel span[style*="clamp"] {
            font-size: clamp(36px, 10vw, 64px) !important;
            letter-spacing: -1.2px !important;
          }
        }
        @media (max-width: 480px) {
          #playreel [data-framer-name="Container"] {
            padding: 0 8px !important;
          }
          #5czkxl button {
            width: 70px !important;
            height: 36px !important;
          }
          #playreel span[style*="clamp"] {
            font-size: clamp(26px, 8vw, 40px) !important;
            letter-spacing: -0.8px !important;
          }
        }
      `}</style>
    </section>
  );
}
