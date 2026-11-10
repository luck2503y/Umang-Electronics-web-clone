import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const introText = "Modern living begins with reliable electronics that make everyday life effortless, comfortable, and intuitive. From energy-efficient climate control to cinema-grade entertainment and precision culinary appliances, Umang Electronics provides premium consumer electronics backed by genuine manufacturer warranty and certified setup support.";

function RevealIntroWord({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.45, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ['rgba(0, 0, 0, 0.45)', 'rgba(0, 0, 0, 0.96)']
  );

  return (
    <motion.span
      style={{
        display: 'inline-block',
        marginRight: '0.28em',
        opacity,
        color,
        willChange: 'opacity, color'
      }}
    >
      {word}
    </motion.span>
  );
}

export default function AboutSection() {
  const containerRef = useRef(null);
  const words = introText.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'center center']
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const videoY = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <section
      ref={containerRef}
      data-framer-name="Section - Introduction"
      id="introductions"
      className="about-section"
      style={{
        width: '100%',
        backgroundColor: '#efefef',
        color: '#000000',
        padding: '160px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '120px'
        }}
      >
        {/* Top Block: Video Thumbnail + About Editorial Heading */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: '20px',
            rowGap: '40px',
            alignItems: 'start'
          }}
          className="about-top-grid"
        >
          {/* Left: Video Wrap */}
          <div style={{ gridColumn: 'span 4' }}>
            <motion.div
              style={{
                width: '100%',
                maxWidth: '240px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#000',
                aspectRatio: '16/10',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                scale: videoScale,
                y: videoY
              }}
            >
              <video
                src="/assets/videos/about-electronics.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
          </div>

          {/* Right: Label & Heading */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '400',
                letterSpacing: '-0.06px',
                color: 'rgba(0, 0, 0, 0.96)',
                textTransform: 'uppercase'
              }}
            >
              About
            </span>

            <h2
              style={{
                fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: '1.25',
                letterSpacing: '-0.88px',
                fontWeight: '300',
                color: 'rgba(0, 0, 0, 0.96)',
                margin: 0
              }}
            >
              {words.map((w, idx) => {
                const wStart = (idx / words.length) * 0.75;
                const wEnd = Math.min(1, wStart + 0.15);
                return (
                  <RevealIntroWord
                    key={idx}
                    word={w}
                    progress={scrollYProgress}
                    start={wStart}
                    end={wEnd}
                  />
                );
              })}
            </h2>
          </div>
        </div>

        {/* Bottom Block: Project completed + 15+ + Description */}
        <div
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            paddingTop: '60px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: '20px',
            rowGap: '40px',
            alignItems: 'baseline'
          }}
          className="about-bottom-grid"
        >
          <div style={{ gridColumn: 'span 4' }}>
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.07px'
              }}
            >
              Curated Appliances
            </span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="about-counter"
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(80px, 14vw, 180px)',
                lineHeight: '1.1',
                fontWeight: '400',
                letterSpacing: '-3px',
                color: 'rgba(0, 0, 0, 0.96)',
                marginTop: '12px'
              }}
            >
              36+
            </motion.div>
          </div>

          <div style={{ gridColumn: 'span 8', maxWidth: '640px' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(18px, 2vw, 22px)',
                lineHeight: '32px',
                fontWeight: '300',
                letterSpacing: '-0.1px',
                color: 'rgba(0, 0, 0, 0.96)',
                margin: 0
              }}
            >
              Organized across three specialized departments: Home Appliances, TV & Entertainment, and Small Kitchen Appliances with verified technical specifications.
            </motion.p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 810px) {
          .about-section {
            padding: 70px 20px !important;
          }
          .about-section > div {
            gap: 48px !important;
          }
          .about-top-grid, .about-bottom-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .about-counter {
            font-size: clamp(60px, 18vw, 90px) !important;
            line-height: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
