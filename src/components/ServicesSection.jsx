import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const services = [
  {
    id: 'installation-setup',
    title: 'Installation & Setup',
    timeline: '24-48 Hours',
    deliverables: 'Delivery, Unboxing, Wall Mounting & Safety Check',
    description: 'Certified doorstep installation for split air conditioners, front-load washing machines, and wall-mounted televisions. Includes pressure checks, copper pipe insulation, and electrical surge validation.',
    price: 'Included Support',
    video: 'https://stream.mux.com/BP0200Otu1K9wAS3EYw00ewY7oNNy4gBzZiQqh758BrbsQ/1080p.mp4'
  },
  {
    id: 'home-theatre-calibration',
    title: 'Audio-Visual Tuning',
    timeline: '1-2 Days',
    deliverables: 'Acoustic Positioning, 4K HDR Calibration, Wire Concealment',
    description: 'Elevate your living room into a cinema. We tune 5.1 channel surround acoustics, calibrate OLED & QLED picture profiles for dynamic range, and set up eARC audio pass-through.',
    price: 'Specialist Service',
    video: 'https://stream.mux.com/SJ2mU2IfrQe3jkt22bmriMiit7Xl00El9gNpFXisIZ2w/1080p.mp4'
  },
  {
    id: 'warranty-maintenance',
    title: 'Warranty & Care',
    timeline: 'Lifetime Care',
    deliverables: 'Brand Warranty Registration, Filter Kits, Scheduled Descaling',
    description: 'Complete peace of mind. We handle manufacturer serial registration, supply authentic replacement cartridges for water purifiers, and provide expert diagnostic guidance.',
    price: 'Official Care',
    video: 'https://stream.mux.com/jeHaeZGXsR4q11ul6jRFPgLtAPhO53B5epZj39cw7jw/1080p.mp4'
  }
];

export default function ServicesSection({ onOpenContact }) {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Scroll progression inside the 2700px pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.33) {
      setActiveIdx(0);
    } else if (latest < 0.67) {
      setActiveIdx(1);
    } else {
      setActiveIdx(2);
    }
  });

  const scrollToService = (idx) => {
    setActiveIdx(idx);
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const h = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = top + (idx / 2) * h;
    if (window.lenis) {
      window.lenis.scrollTo(targetY, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const current = services[activeIdx];

  return (
    <section
      ref={containerRef}
      id="service"
      data-framer-name="Section - Services"
      style={{
        position: 'relative',
        width: '100%',
        height: '2700px', // Exact 2700px height matching original
        backgroundColor: '#efefef',
        color: '#000000'
      }}
    >
      {/* Pinned Sticky Viewport (100vh) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '90px 40px 40px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
            gap: '48px',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Service Details */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 0'
            }}
          >
            {/* Top block */}
            <div>
              <p
                style={{
                  fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                  fontSize: '14px',
                  color: 'rgba(0, 0, 0, 0.96)',
                  marginBottom: '36px',
                  letterSpacing: '-0.07px'
                }}
              >
                Our Services
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2
                    style={{
                      fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                      fontSize: 'clamp(48px, 5.5vw, 76px)',
                      lineHeight: '1.05',
                      letterSpacing: '-2.5px',
                      fontWeight: '400',
                      color: '#000000',
                      marginBottom: '40px'
                    }}
                  >
                    {current.title}
                  </h2>

                  {/* Divider Line */}
                  <div
                    style={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      marginBottom: '28px'
                    }}
                  />

                  {/* Specs */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '24px',
                      marginBottom: '32px'
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: '"TWK Lausanne 400", sans-serif',
                          fontSize: '14px',
                          color: 'rgba(0, 0, 0, 0.6)',
                          marginBottom: '6px',
                          letterSpacing: '-0.07px'
                        }}
                      >
                        Timeline
                      </span>
                      <span
                        style={{
                          fontFamily: '"TWK Lausanne 400", sans-serif',
                          fontSize: '14px',
                          color: 'rgba(0, 0, 0, 0.96)',
                          letterSpacing: '-0.07px'
                        }}
                      >
                        {current.timeline}
                      </span>
                    </div>

                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: '"TWK Lausanne 400", sans-serif',
                          fontSize: '14px',
                          color: 'rgba(0, 0, 0, 0.6)',
                          marginBottom: '6px',
                          letterSpacing: '-0.07px'
                        }}
                      >
                        Deliverables
                      </span>
                      <span
                        style={{
                          fontFamily: '"TWK Lausanne 400", sans-serif',
                          fontSize: '14px',
                          color: 'rgba(0, 0, 0, 0.96)',
                          letterSpacing: '-0.07px'
                        }}
                      >
                        {current.deliverables}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: '"TWK Lausanne 300", sans-serif',
                      fontSize: '16px',
                      lineHeight: '26px',
                      color: 'rgba(0, 0, 0, 0.85)',
                      maxWidth: '520px',
                      letterSpacing: '-0.1px'
                    }}
                  >
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom block: Price and Start a project Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: '48px',
                paddingTop: '20px'
              }}
            >
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '14px',
                    color: 'rgba(0, 0, 0, 0.6)',
                    marginBottom: '6px',
                    letterSpacing: '-0.07px'
                  }}
                >
                  Starting from
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.price}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      display: 'block',
                      fontFamily: '"TWK Lausanne 400", sans-serif',
                      fontSize: 'clamp(42px, 4vw, 56px)',
                      lineHeight: '1',
                      letterSpacing: '-2px',
                      color: '#000000',
                      fontWeight: '400'
                    }}
                  >
                    {current.price}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Glass Pill Button */}
              <button
                onClick={onOpenContact}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 28px',
                  borderRadius: '1000px',
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  color: '#000000',
                  fontFamily: '"TWK Lausanne 400", sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  letterSpacing: '-0.07px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.14)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Start a project
              </button>
            </div>
          </div>

          {/* Right Column: Black Container with Video Stack & Menu */}
          <div
            style={{
              backgroundColor: '#000000',
              borderRadius: '28px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '36px',
              height: '580px'
            }}
          >
            {/* Centered Video Mockup Card */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {services.map((s, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <motion.div
                    key={s.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.15,
                      scale: isActive ? 1 : 0.93,
                      y: (idx - activeIdx) * 28,
                      zIndex: isActive ? 10 : 5 - Math.abs(idx - activeIdx)
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => scrollToService(idx)}
                    style={{
                      position: isActive ? 'relative' : 'absolute',
                      width: '100%',
                      maxWidth: '540px',
                      aspectRatio: '16 / 10',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                      cursor: isActive ? 'default' : 'pointer'
                    }}
                  >
                    <video
                      src={s.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Right: Interactive Menu */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '6px',
                zIndex: 20
              }}
            >
              {services.map((s, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToService(idx)}
                    style={{
                      fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                      fontSize: '14px',
                      letterSpacing: '-0.07px',
                      color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      padding: '2px 0'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                    }}
                  >
                    {s.title} {isActive && '—'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
