import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/products') {
        setIsLightMode(true);
        return;
      }
      if (location.pathname.startsWith('/products/')) {
        setIsLightMode(false);
        return;
      }
      if (location.pathname === '/docs') {
        setIsLightMode(false);
        return;
      }

      // On home page:
      const y = window.scrollY;
      // Between Introduction (around 1700px) and Templates (around 8000px):
      // And then in FAQ (around 9500px to 11000px):
      const intro = document.getElementById('introductions');
      const templates = document.getElementById('templates');
      const faq = document.getElementById('faq');
      const cta = document.querySelector('[data-framer-name="Section - CTA"]');

      if (intro && templates) {
        const introTop = intro.offsetTop - 60;
        const templatesTop = templates.offsetTop - 60;
        const faqTop = faq ? faq.offsetTop - 60 : 99999;
        const ctaTop = cta ? cta.offsetTop - 60 : 99999;

        if ((y >= introTop && y < templatesTop) || (y >= faqTop && y < ctaTop)) {
          setIsLightMode(true);
        } else {
          setIsLightMode(false);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const textColor = isLightMode ? '#000000' : '#ffffff';
  const pillBg = isLightMode ? 'rgba(0, 0, 0, 0.06)' : 'rgba(153, 153, 153, 0.16)';
  const pillBorder = isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)';
  const hamburgerBg = isLightMode ? '#000000' : '#ffffff';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '84px',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          pointerEvents: 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Left: Umang Electronics Brand in Glass Pill Button */}
        <div style={{ pointerEvents: 'auto' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 20px',
              borderRadius: '100px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              backgroundColor: pillBg,
              boxShadow: isLightMode
                ? 'rgba(0, 0, 0, 0.08) 0px 1px 2px 0px'
                : 'rgba(0, 0, 0, 0.25) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 8px 16px 0px',
              border: `1px solid ${pillBorder}`,
              color: textColor,
              fontFamily: '"TWK Lausanne 500", "TWK Lausanne", sans-serif',
              fontSize: '18px',
              fontWeight: '500',
              letterSpacing: '-0.28px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isLightMode
                ? 'rgba(0, 0, 0, 0.12)'
                : 'rgba(153, 153, 153, 0.24)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = pillBg;
            }}
          >
            Umang Electronics
          </Link>
        </div>

        {/* Center: Interactive Glass Menu Toggle & Floating Dropdown */}
        <div style={{ pointerEvents: 'auto', position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '1000px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: menuOpen ? '0px' : '5px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              backgroundColor: pillBg,
              boxShadow: isLightMode
                ? 'rgba(0, 0, 0, 0.08) 0px 1px 2px 0px'
                : 'rgba(0, 0, 0, 0.25) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 8px 16px 0px',
              border: `1px solid ${pillBorder}`,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 1 : 0 }}
              style={{
                width: '16px',
                height: '1.5px',
                backgroundColor: hamburgerBg,
                borderRadius: '1px',
                transition: 'background-color 0.25s ease'
              }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -0.5 : 0 }}
              style={{
                width: '16px',
                height: '1.5px',
                backgroundColor: hamburgerBg,
                borderRadius: '1px',
                transition: 'background-color 0.25s ease'
              }}
            />
          </button>

          {/* Floating Glass Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '56px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '200px',
                  borderRadius: '24px',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  backgroundColor: 'rgba(20, 20, 20, 0.92)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 1001
                }}
              >
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Products Catalog', path: '/products' },
                  { name: 'Guides & Support', path: '/docs' }
                ].map(item => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '14px',
                      fontSize: '14px',
                      fontWeight: location.pathname === item.path ? '500' : '400',
                      color: location.pathname === item.path ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                      backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== item.path) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== item.path) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenContact();
                  }}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '14px',
                    fontSize: '14px',
                    textAlign: 'left',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  Enquire Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Enquire Now Button */}
        <div style={{ pointerEvents: 'auto' }}>
          <button
            onClick={onOpenContact}
            style={{
              padding: '10px 24px',
              borderRadius: '1000px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              backgroundColor: pillBg,
              boxShadow: isLightMode
                ? 'rgba(0, 0, 0, 0.08) 0px 1px 2px 0px'
                : 'rgba(0, 0, 0, 0.25) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 8px 16px 0px',
              border: `1px solid ${pillBorder}`,
              color: textColor,
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '-0.07px',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isLightMode
                ? 'rgba(0, 0, 0, 0.12)'
                : 'rgba(153, 153, 153, 0.24)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = pillBg;
            }}
          >
            Enquire Now
          </button>
        </div>
      </header>

      <style>{`
        @media (max-width: 810px) {
          header {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </>
  );
}
