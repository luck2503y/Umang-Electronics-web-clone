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
      {/* Full-screen Dark Blur Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 999,
              pointerEvents: 'auto'
            }}
          />
        )}
      </AnimatePresence>

      <header
        className="navbar-header"
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
            className="navbar-brand-pill"
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

        {/* Center: Interactive Glass Menu Toggle & Floating Dropdown (Absolute Screen Centered) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto',
            zIndex: 1001
          }}
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '1000px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: menuOpen ? 'rgba(30, 30, 30, 0.7)' : pillBg,
              boxShadow: isLightMode && !menuOpen
                ? 'rgba(0, 0, 0, 0.08) 0px 1px 2px 0px'
                : 'rgba(0, 0, 0, 0.25) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 8px 16px 0px',
              border: `1px solid ${menuOpen ? 'rgba(255, 255, 255, 0.25)' : pillBorder}`,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ position: 'relative', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.span
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 0 : -3
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  width: '16px',
                  height: '1.5px',
                  backgroundColor: menuOpen ? '#ffffff' : hamburgerBg,
                  borderRadius: '1px'
                }}
              />
              <motion.span
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? 0 : 3
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  width: '16px',
                  height: '1.5px',
                  backgroundColor: menuOpen ? '#ffffff' : hamburgerBg,
                  borderRadius: '1px'
                }}
              />
            </div>
          </button>

          {/* Floating Glass Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                data-menu-card="true"
                initial={{ opacity: 0, scale: 0.95, y: -10, x: '-50%' }}
                animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, y: -10, x: '-50%' }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: '58px',
                  left: '50%',
                  width: '416px',
                  maxWidth: 'calc(100vw - 32px)',
                  borderRadius: '24px',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  backgroundColor: 'rgba(18, 18, 18, 0.72)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.3)',
                  padding: '24px 32px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 1002
                }}
              >
                {/* Main Links */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Home */}
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '64px',
                      padding: '16px 0',
                      fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                      fontSize: '24px',
                      lineHeight: '32px',
                      letterSpacing: '-0.48px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease, opacity 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.75';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    Home
                  </Link>

                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />

                  {/* Store / Products */}
                  <Link
                    to="/products"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '64px',
                      padding: '16px 0',
                      fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                      fontSize: '24px',
                      lineHeight: '32px',
                      letterSpacing: '-0.48px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease, opacity 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.75';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    Store
                  </Link>

                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />

                  {/* Book a call / Enquire */}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenContact();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '64px',
                      padding: '16px 0',
                      fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                      fontSize: '24px',
                      lineHeight: '32px',
                      letterSpacing: '-0.48px',
                      color: '#ffffff',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'transform 0.2s ease, opacity 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.75';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    Book a call
                  </button>
                </div>

                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />

                {/* Bottom Social / Utility Links */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    paddingTop: '20px',
                    flexWrap: 'wrap'
                  }}
                >
                  {[
                    { name: 'X (Twitter)', href: 'https://x.com' },
                    { name: 'Instagram', href: 'https://instagram.com' },
                    { name: 'Thread', href: 'https://threads.net' },
                    { name: 'Contra', href: 'https://contra.com' },
                    { name: 'Docs', href: '/docs', isInternal: true }
                  ].map((s) => (
                    s.isInternal ? (
                      <Link
                        key={s.name}
                        to={s.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                          fontSize: '13px',
                          lineHeight: '20px',
                          letterSpacing: '-0.07px',
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                      >
                        {s.name}
                      </Link>
                    ) : (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                          fontSize: '13px',
                          lineHeight: '20px',
                          letterSpacing: '-0.07px',
                          color: 'rgba(255, 255, 255, 0.6)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                      >
                        {s.name}
                      </a>
                    )
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Enquire Now Button */}
        <div style={{ pointerEvents: 'auto' }}>
          <button
            onClick={onOpenContact}
            className="navbar-enquire-btn"
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
          .navbar-header {
            padding: 0 16px !important;
            height: 70px !important;
          }
          .navbar-brand-pill {
            padding: 6px 14px !important;
            font-size: 14px !important;
            letter-spacing: -0.15px !important;
          }
          .navbar-enquire-btn {
            padding: 6px 14px !important;
            font-size: 12px !important;
          }
        }
        @media (max-width: 480px) {
          .navbar-header {
            padding: 0 12px !important;
          }
          .navbar-brand-pill {
            padding: 5px 10px !important;
            font-size: 13px !important;
          }
          .navbar-enquire-btn {
            padding: 5px 10px !important;
            font-size: 11px !important;
          }
          [data-menu-card="true"] {
            width: calc(100vw - 24px) !important;
            max-width: 360px !important;
            padding: 16px 20px 24px !important;
          }
          [data-menu-card="true"] a, [data-menu-card="true"] button {
            font-size: 20px !important;
            height: 52px !important;
          }
        }
      `}</style>
    </>
  );
}
