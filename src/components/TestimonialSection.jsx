import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    quote: "Upgrading our entire home with inverter air conditioning and a smart OLED TV from Umang Electronics was the best decision. Their technical team helped us calculate the exact AC tonnage for our living room, completed wall mounting with zero visible cables, and explained every smart feature with great patience.",
    author: 'Rajesh & Meera Sharma, Homeowners'
  },
  {
    quote: "We purchased a complete kitchen appliance set including the mixer grinder, convection microwave, and air fryer. The build quality and prompt delivery exceeded expectations. Umang Electronics guided us to the right energy-efficient models with full manufacturer warranties.",
    author: 'Pooja Verma, Culinary Enthusiast'
  },
  {
    quote: "Exceptional service and authentic brand warranties. The 5.1 home theatre setup was balanced to perfection in our living room. It's rare to find an electronics destination that cares so deeply about acoustic tuning, proper wire management, and post-installation customer care.",
    author: 'Anand Kulkarni, Audiophile & Architect'
  }
];

function RevealWord({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.42, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ['rgba(0, 0, 0, 0.42)', 'rgba(0, 0, 0, 0.96)']
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

function QuoteCard({ item }) {
  const cardRef = useRef(null);
  const words = item.quote.split(' ');

  // Each quote card tracks its own scroll viewport progress
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 85%', 'center center']
  });

  return (
    <div
      ref={cardRef}
      style={{
        minHeight: '620px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: '40px'
      }}
    >
      <blockquote
        style={{
          fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
          fontSize: 'clamp(28px, 3.2vw, 38px)',
          lineHeight: '1.3',
          letterSpacing: '-0.72px',
          fontWeight: '300',
          color: 'rgba(0, 0, 0, 0.96)',
          margin: '0 0 28px 0'
        }}
      >
        <span style={{ color: 'rgba(0, 0, 0, 0.96)', marginRight: '4px' }}>"</span>
        {words.map((w, wIdx) => {
          const wStart = (wIdx / words.length) * 0.8;
          const wEnd = Math.min(1, wStart + 0.12);
          return (
            <RevealWord
              key={wIdx}
              word={w}
              progress={scrollYProgress}
              start={wStart}
              end={wEnd}
            />
          );
        })}
        <span style={{ color: 'rgba(0, 0, 0, 0.96)', marginLeft: '2px' }}>"</span>
      </blockquote>

      <p
        style={{
          fontFamily: '"TWK Lausanne 400", sans-serif',
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.65)',
          letterSpacing: '-0.07px',
          margin: 0
        }}
      >
        — {item.author}
      </p>
    </div>
  );
}

export default function TestimonialSection() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      id="testimonial"
      data-framer-name="Section - Testimonial"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '2200px',
        backgroundColor: '#efefef',
        color: '#000000',
        padding: '0 40px'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '40px',
          alignItems: 'start',
          position: 'relative'
        }}
      >
        {/* Sticky Left Column: "Testimonial" */}
        <div
          style={{
            position: 'sticky',
            top: '120px',
            paddingTop: '60px'
          }}
        >
          <p
            style={{
              fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
              fontSize: '14px',
              letterSpacing: '-0.07px',
              color: 'rgba(0, 0, 0, 0.96)',
              margin: 0
            }}
          >
            Testimonial
          </p>
        </div>

        {/* Right Column: 3 Quotes revealing clearly and progressively */}
        <div style={{ paddingTop: '60px' }}>
          {testimonials.map((item, index) => (
            <QuoteCard
              key={index}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
