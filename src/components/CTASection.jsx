import React from 'react';

export default function CTASection({ onOpenContact }) {
  return (
    <section
      data-framer-name="Section - CTA"
      className="cta-section"
      style={{
        width: '100%',
        minHeight: '80vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '160px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @media (max-width: 810px) {
          .cta-section {
            padding: 80px 20px !important;
            min-height: 50vh !important;
          }
          .cta-heading {
            font-size: clamp(34px, 8.5vw, 52px) !important;
            letter-spacing: -1.2px !important;
          }
        }
      `}</style>
      {/* Background Video with subtle dark overlay */}
      <video
        src="/assets/videos/cta-ambient-electronics.mp4"
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
          opacity: 0.35,
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.85) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Smooth bottom fade to solid black connecting to Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '36px'
        }}
      >
        <h2
          className="cta-heading"
          style={{
            fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
            fontSize: 'clamp(52px, 8vw, 96px)',
            lineHeight: '1.05',
            letterSpacing: '-2.8px',
            fontWeight: '400',
            color: '#ffffff',
            margin: 0
          }}
        >
          Upgrade Your Home Today
        </h2>

        <button
          onClick={onOpenContact}
          className="glass-pill-btn"
          style={{
            padding: '14px 36px',
            fontSize: '15px',
            fontWeight: '400',
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            cursor: 'pointer'
          }}
        >
          Enquire with Umang Electronics
        </button>
      </div>
    </section>
  );
}
