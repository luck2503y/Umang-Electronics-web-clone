import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenContact }) {
  const [timeStr, setTimeStr] = useState('');

  // Live store clock (GMT+7)
  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Bangkok', // GMT+7
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        setTimeStr(formatter.format(now));
      } catch (err) {
        setTimeStr('3:00 PM');
      }
    }

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      data-framer-name="Large - Black"
      style={{
        width: '100%',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '72px 40px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box'
      }}
    >
      <div
        data-framer-name="Container"
        style={{
          maxWidth: '1360px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Info & Links Grid */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '48px',
            width: '100%',
            paddingBottom: '20px'
          }}
        >
          {/* Left: Brand Details */}
          <div style={{ maxWidth: '340px' }}>
            <p
              style={{
                fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
                fontSize: '14px',
                lineHeight: '22px',
                letterSpacing: '-0.07px',
                color: 'rgba(255, 255, 255, 0.65)',
                margin: 0
              }}
            >
              <strong style={{ color: '#ffffff', fontWeight: '500', fontSize: '15px' }}>Umang Electronics</strong>
              <br />
              <span>Premium Home Appliances, TV & Entertainment Systems, and Small Kitchen Appliances.</span>
              <br />
              <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>Authorized Brand Warranty · Doorstep Setup</span>
            </p>
          </div>

          {/* Right: Index & Categories Columns */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(48px, 6vw, 120px)',
              flexWrap: 'wrap'
            }}
          >
            {/* Column 1: Index */}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: '140px' }}>
              <div
                style={{
                  fontFamily: '"TWK Lausanne 400", sans-serif',
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '-0.06px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px'
                }}
              >
                Navigation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link
                  to="/"
                  style={{
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '22px',
                    lineHeight: '30px',
                    letterSpacing: '-0.24px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  style={{
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '22px',
                    lineHeight: '30px',
                    letterSpacing: '-0.24px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  All 36 Products
                </Link>
                <Link
                  to="/docs"
                  style={{
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '22px',
                    lineHeight: '30px',
                    letterSpacing: '-0.24px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  Guides & Support
                </Link>
                <button
                  onClick={onOpenContact}
                  style={{
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '22px',
                    lineHeight: '30px',
                    letterSpacing: '-0.24px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  Enquire Now
                </button>
              </div>
            </div>

            {/* Column 2: Categories */}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: '180px' }}>
              <div
                style={{
                  fontFamily: '"TWK Lausanne 400", sans-serif',
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '-0.06px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '16px'
                }}
              >
                Departments
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link
                  to="/products?category=Home%20Appliances"
                  style={{
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '-0.2px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  Home Appliances (8)
                </Link>
                <Link
                  to="/products?category=TV%20%26%20Entertainment"
                  style={{
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '-0.2px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  TV & Entertainment (12)
                </Link>
                <Link
                  to="/products?category=Small%20Kitchen%20Appliances"
                  style={{
                    fontFamily: '"TWK Lausanne 400", sans-serif',
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '-0.2px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  Kitchen Appliances (16)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div
          data-framer-name="Bottom"
          style={{
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            marginTop: '48px',
            marginBottom: '32px'
          }}
        />

        {/* GIANT "Umang Electronics" Vector Graphic */}
        <div
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '1360 / 215',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <img
            src="/assets/umang_electronics_logo.svg"
            alt="Umang Electronics"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* Bottom Bar: Timezone + Scroll to Top Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '28px',
            width: '100%'
          }}
        >
          {/* Timezone (GMT +7) */}
          <div
            data-framer-name="Timezone"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span
              style={{
                fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.07px',
                color: '#ffffff',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {timeStr || '3:00 PM'}
            </span>
            <span
              style={{
                fontFamily: '"TWK Lausanne 300", "TWK Lausanne", sans-serif',
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '-0.07px',
                color: 'rgba(255, 255, 255, 0.6)'
              }}
            >
              (GMT +7)
            </span>
          </div>

          {/* Scroll to Top Round Glass Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '1000px',
              backgroundColor: 'rgba(153, 153, 153, 0.16)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.24)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(153, 153, 153, 0.16)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
