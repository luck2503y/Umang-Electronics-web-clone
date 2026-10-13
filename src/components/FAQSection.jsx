import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqItems = [
  {
    q: "What categories of products are available at Umang Electronics?",
    a: "We offer 36 specialized products across three distinct categories: Home Appliances (refrigerators, washing machines, inverter air conditioners, microwave ovens, geysers, purifiers, coolers, dishwashers), TV & Entertainment (OLED, QLED, Smart TVs, soundbars, 5.1 home theatres, projectors, and media boxes), and Small Kitchen Appliances (mixer grinders, air fryers, induction cooktops, OTGs, coffee makers, and food prep essentials)."
  },
  {
    q: "Are all appliances backed by manufacturer warranties?",
    a: "Yes. Every appliance is 100% genuine and comes with official manufacturer warranty documents. Compressor and motor warranties on major appliances range from 5 to 10 years depending on brand guidelines."
  },
  {
    q: "How does doorstep delivery and professional installation work?",
    a: "For major appliances including air conditioners, washing machines, and wall-mounted televisions, delivery is scheduled directly with verified technicians who handle unboxing, standard installation, copper piping connections, and safety checks."
  },
  {
    q: "How do I choose the right capacity or tonnage for an AC or Refrigerator?",
    a: "Room size, direct sunlight, and household member count determine the ideal capacity. Check our Documentation Center for dedicated sizing calculators, or speak with an Umang Electronics specialist for tailored advice."
  },
  {
    q: "What is the difference between OLED and QLED televisions?",
    a: "OLED televisions use self-illuminating pixels for infinite contrast and absolute deep blacks, ideal for dark cinema rooms. QLED televisions employ Quantum Dot enhancement for intense peak brightness, ideal for brightly lit living rooms."
  },
  {
    q: "Do you offer maintenance guidelines and spare filter cartridges?",
    a: "Yes, our Documentation Center includes complete maintenance schedules for water purifiers, air conditioner filters, and washing machine drum descaling. Genuine replacement consumables can be requested directly."
  },
  {
    q: "How do I request a product price quote or availability check?",
    a: "Click 'Enquire Now' on any product card or detail page. Our customer support team responds within 24 hours with exact model availability, doorstep delivery windows, and active seasonal discounts."
  },
  {
    q: "Can I enquire about corporate or complete new home appliance packages?",
    a: "Yes. We cater to new homeowners, architects, and corporate orders with bundled package consultations and synchronized delivery scheduling."
  }
];

export default function FAQSection({ onOpenContact }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      data-framer-name="Section - FAQ"
      id="faq"
      style={{
        width: '100%',
        backgroundColor: '#efefef',
        color: '#000000',
        padding: '160px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          columnGap: '32px',
          rowGap: '60px'
        }}
      >
        {/* Left Column: Heading and Ask a Question CTA */}
        <div style={{ gridColumn: 'span 4' }} className="faq-left-col">
          <h2
            style={{
              fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
              fontSize: 'clamp(32px, 3.6vw, 48px)',
              lineHeight: '1.15',
              letterSpacing: '-1.2px',
              fontWeight: '300',
              color: 'rgba(0, 0, 0, 0.96)',
              margin: '0 0 28px'
            }}
          >
            Questions before you decide.
          </h2>

          <button
            onClick={onOpenContact}
            className="glass-pill-btn-dark glass-pill-btn"
            style={{ display: 'inline-flex', padding: '10px 22px', cursor: 'pointer', border: 'none' }}
          >
            Ask a specialist
          </button>
        </div>

        {/* Right Column: 8 Accordion Items in 2 groups or clean stack */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column' }} className="faq-right-col">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                  padding: '24px 0'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    gap: '16px',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      fontWeight: '400',
                      letterSpacing: '-0.3px',
                      color: 'rgba(0, 0, 0, 0.96)'
                    }}
                  >
                    {item.q}
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      flexShrink: 0,
                      color: 'rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: '1.6',
                          fontWeight: '300',
                          letterSpacing: '-0.07px',
                          color: 'rgba(0, 0, 0, 0.75)',
                          marginTop: '16px',
                          marginBottom: '8px',
                          maxWidth: '680px'
                        }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 810px) {
          .faq-left-col {
            grid-column: span 12 !important;
          }
          .faq-right-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
