import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const templates = [
  {
    num: 1,
    id: 'oled-tv',
    name: 'OLED TV',
    category: 'TV & Entertainment',
    price: 'Flagship 4K Cinema',
    centerImg: '/assets/products/oled-tv.jpg',
    bg: '/assets/products/oled-tv.jpg',
    angle: 36
  },
  {
    num: 2,
    id: 'refrigerator',
    name: 'Refrigerator',
    category: 'Home Appliances',
    price: 'Frost-Free Multi-Door',
    centerImg: '/assets/products/refrigerator.jpg',
    bg: '/assets/products/refrigerator.jpg',
    angle: 108
  },
  {
    num: 3,
    id: 'washing-machine',
    name: 'Washing Machine',
    category: 'Home Appliances',
    price: 'Direct Drive Steam Care',
    centerImg: '/assets/products/washing-machine.jpg',
    bg: '/assets/products/washing-machine.jpg',
    angle: 180
  },
  {
    num: 4,
    id: 'air-conditioner',
    name: 'Air Conditioner',
    category: 'Home Appliances',
    price: 'Dual Inverter Fast Cool',
    centerImg: '/assets/products/air-conditioner.jpg',
    bg: '/assets/products/air-conditioner.jpg',
    angle: 252
  },
  {
    num: 5,
    id: 'air-fryer',
    name: 'Air Fryer',
    category: 'Small Kitchen Appliances',
    price: 'Rapid 360° Crisping',
    centerImg: '/assets/products/air-fryer.jpg',
    bg: '/assets/products/air-fryer.jpg',
    angle: 324
  }
];

export default function FeaturedTemplates() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  // Track scroll inside the 4500px pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // 5 equal sections from 0.0 to 1.0
    const rawIdx = Math.floor(latest * 5);
    const clampedIdx = Math.max(0, Math.min(4, rawIdx));
    setActiveIdx(clampedIdx);
  });

  const scrollToTemplate = (idx) => {
    const clamped = Math.max(0, Math.min(4, idx));
    setActiveIdx(clamped);
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const h = containerRef.current.offsetHeight - window.innerHeight;
    // Scroll to the midpoint of the template slice
    const sliceCenter = (clamped + 0.5) / 5;
    const targetY = top + sliceCenter * h;
    if (window.lenis) {
      window.lenis.scrollTo(targetY, { duration: 0.9 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && activeIdx < 4) {
        scrollToTemplate(activeIdx + 1);
      } else if (diffX < 0 && activeIdx > 0) {
        scrollToTemplate(activeIdx - 1);
      }
    }
  };

  const current = templates[activeIdx];

  return (
    <section
      ref={containerRef}
      id="templates"
      data-framer-name="Section - Templates"
      className="templates-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '4500px', // Exact 4500px height matching original
        backgroundColor: '#000000',
        color: '#ffffff'
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .templates-section {
            height: 3800px !important;
            padding: 0 !important;
          }
          .templates-sticky-viewport {
            position: sticky !important;
            top: 0 !important;
            height: 100vh !important;
            min-height: 560px !important;
            padding: 70px 16px 20px !important;
            display: flex !important;
            flex-direction: column !important;
            justifyContent: center !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }
          .templates-content-stage {
            display: flex !important;
            flex-direction: column !important;
            min-height: auto !important;
            padding: 0 !important;
            gap: 24px !important;
            text-align: center !important;
            align-items: center !important;
          }
          .templates-dial-box {
            width: min(240px, 66vw) !important;
            height: min(240px, 66vw) !important;
          }
          .templates-dial-portal {
            width: min(200px, 54vw) !important;
            height: min(200px, 54vw) !important;
          }
          .templates-dial-rings {
            width: min(240px, 66vw) !important;
            height: min(240px, 66vw) !important;
          }
          .templates-dial-rings > div {
            width: min(240px, 66vw) !important;
            height: min(240px, 66vw) !important;
          }
          .templates-right-info {
            padding-left: 0 !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
      {/* Pinned Sticky Viewport (100vh) */}
      <div
        className="templates-sticky-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Full-bleed Darkened Background Mockup Layer (data-framer-name="BG") */}
        <div
          data-framer-name="BG-Layer"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
        >
          {templates.map((t, idx) => (
            <div
              key={t.id}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: idx === activeIdx ? 0.35 : 0,
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <img
                src={t.bg}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          ))}

          {/* Vignette overlay to smoothly blend background into pure #000000 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.5) 60%, #000000 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* 3-Column Content Stage */}
        <div
          className="templates-content-stage"
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1440px',
            width: '100%',
            padding: '0 48px',
            display: 'grid',
            gridTemplateColumns: '260px 1fr 340px',
            alignItems: 'center',
            minHeight: '560px'
          }}
        >
          {/* Left Column: Section Title */}
          <div style={{ alignSelf: 'center' }}>
            <h2
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                letterSpacing: '-0.07px',
                color: 'rgba(255, 255, 255, 0.96)',
                margin: 0
              }}
            >
              Featured Electronics
            </h2>
          </div>

          {/* Center Column: Dial & Circular Portal Lens */}
          <div
            className="templates-dial-box"
            style={{
              position: 'relative',
              width: 'min(498px, 82vw)',
              height: 'min(498px, 82vw)',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Center Circular Mockup Portal (Magnifying Glass Lens Effect) */}
            <Link
              to={`/products/${current.id}`}
              title={`View ${current.name} Appliance`}
              className="templates-dial-portal"
              style={{
                position: 'relative',
                width: 'min(440px, 72vw)',
                height: 'min(440px, 72vw)',
                borderRadius: '50%',
                overflow: 'hidden',
                zIndex: 5,
                display: 'block',
                cursor: 'pointer',
                textDecoration: 'none',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <img
                    src={current.centerImg}
                    alt={`${current.name} template preview`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </Link>

            {/* Dial: 5 Segmented Rings (Circle-1 to Circle-5) */}
            <div
              data-framer-name="Center Pagination"
              className="templates-dial-rings"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 15
              }}
            >
              {templates.map((t, idx) => {
                const isActive = idx === activeIdx;
                const rotationDeg = idx * 72; // 0, 72, 144, 216, 288 deg

                return (
                  <div
                    key={`circle-${t.num}`}
                    data-framer-name={`Circle-${t.num}`}
                    onClick={() => scrollToTemplate(idx)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      boxSizing: 'border-box',
                      transform: `rotate(${rotationDeg}deg)`,
                      mask: 'conic-gradient(rgba(0,0,0,0) 7.2deg, rgb(0,0,0) 7.2deg, rgb(0,0,0) 64.8deg, rgba(0,0,0,0) 64.8deg)',
                      WebkitMask: 'conic-gradient(rgba(0,0,0,0) 7.2deg, rgb(0,0,0) 7.2deg, rgb(0,0,0) 64.8deg, rgba(0,0,0,0) 64.8deg)',
                      opacity: isActive ? 1 : 0.2,
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                      transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                );
              })}

              {/* 5 Stationary Numbers positioned along circle perimeter */}
              {templates.map((t, idx) => {
                const isActive = idx === activeIdx;
                const deg = t.angle; // 36, 108, 180, 252, 324 deg

                return (
                  <div
                    key={`number-${t.num}`}
                    data-framer-name={`Number ${t.num}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      transform: `rotate(${deg}deg)`,
                      pointerEvents: 'none'
                    }}
                  >
                    <button
                      onClick={() => scrollToTemplate(idx)}
                      style={{
                        position: 'absolute',
                        top: '-16px',
                        left: '50%',
                        transform: `translateX(-50%) rotate(-${deg}deg)`,
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        padding: 0,
                        fontFamily: '"TWK Lausanne 400", sans-serif',
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '#ffffff',
                        opacity: isActive ? 1 : 0.2,
                        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      title={`Go to template ${t.num}`}
                    >
                      {t.num}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Template Title & Category / Price */}
          <div
            className="templates-right-info"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: '16px'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3
                  style={{
                    fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                    fontSize: 'clamp(52px, 5.2vw, 72px)',
                    fontWeight: '400',
                    lineHeight: '1.05',
                    letterSpacing: '-2.16px',
                    color: 'rgba(255, 255, 255, 0.96)',
                    margin: '0 0 12px 0'
                  }}
                >
                  {current.name}
                </h3>
                <p
                  style={{
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '15px',
                    letterSpacing: '-0.07px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    margin: 0
                  }}
                >
                  {current.category} / {current.price}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Center: Glass Pill Button "View all templates" */}
        <div style={{ marginTop: '48px', zIndex: 20 }}>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 28px',
              borderRadius: '100px',
              backgroundColor: 'rgba(153, 153, 153, 0.16)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.04)',
              color: 'rgba(255, 255, 255, 0.96)',
              fontFamily: '"TWK Lausanne 400", sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '-0.07px',
              textDecoration: 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.24)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(153, 153, 153, 0.16)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View all 36 products
          </Link>
        </div>
      </div>
    </section>
  );
}
