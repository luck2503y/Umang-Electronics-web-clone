import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Tv, ChefHat } from 'lucide-react';

const categories = [
  {
    id: 'Home Appliances',
    title: 'Home Appliances',
    count: '8 Products',
    icon: Zap,
    tagline: 'Smart Living & Climate Comfort',
    description: 'Inverter refrigerators, front-load washers, dual-inverter split ACs, microwave ovens, water purifiers, and dishwashers designed for maximum energy efficiency.',
    image: '/assets/products/refrigerator.jpg',
    items: ['Refrigerator', 'Washing Machine', 'Air Conditioner', 'Water Purifier', '+ 4 more']
  },
  {
    id: 'TV & Entertainment',
    title: 'TV & Entertainment',
    count: '12 Products',
    icon: Tv,
    tagline: 'Cinematic Visuals & Studio Acoustics',
    description: 'Self-lit OLED displays, Quantum Dot QLEDs, immersive 5.1 surround home theatres, soundbars, portable speakers, and 4K projectors.',
    image: '/assets/products/oled-tv.jpg',
    items: ['OLED TV', 'QLED TV', '5.1 Home Theatre', 'Soundbar', '+ 8 more']
  },
  {
    id: 'Small Kitchen Appliances',
    title: 'Small Kitchen Appliances',
    count: '16 Products',
    icon: ChefHat,
    tagline: 'Precision Culinary Craftsmanship',
    description: 'Heavy-duty 750W mixer grinders, rapid 360° air fryers, multi-mode OTGs, Italian 15-bar coffee makers, and digital induction cooktops.',
    image: '/assets/products/coffee-maker.jpg',
    items: ['Mixer Grinder', 'Air Fryer', 'Coffee Maker', 'Induction Cooktop', '+ 12 more']
  }
];

export default function CategoriesOverview() {
  return (
    <section
      data-framer-name="Section - Categories"
      style={{
        width: '100%',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '56px'
        }}
      >
        {/* Header Block */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: '36px'
          }}
        >
          <div>
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", sans-serif',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'rgba(255, 255, 255, 0.5)',
                display: 'block',
                marginBottom: '12px'
              }}
            >
              Curated Departments
            </span>
            <h2
              style={{
                fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
                fontSize: 'clamp(32px, 4vw, 54px)',
                lineHeight: '1.1',
                letterSpacing: '-1.8px',
                fontWeight: '400',
                color: '#ffffff',
                margin: 0
              }}
            >
              Three core pillars of modern electronics.
            </h2>
          </div>

          <Link
            to="/products"
            className="glass-pill-btn"
            style={{
              padding: '12px 28px',
              fontSize: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>View All 36 Products</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* 3 Prominent Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px'
          }}
        >
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderRadius: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)'
                }}
              >
                {/* Image Stage */}
                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#111'
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)'
                    }}
                  />
                  {/* Category Count Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '6px 12px',
                      borderRadius: '100px',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#ffffff'
                    }}
                  >
                    {cat.count}
                  </div>
                </div>

                {/* Content Block */}
                <div
                  style={{
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                    gap: '20px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}
                      >
                        <IconComponent size={16} />
                      </div>
                      <h3
                        style={{
                          fontFamily: '"TWK Lausanne 400", sans-serif',
                          fontSize: '22px',
                          fontWeight: '400',
                          letterSpacing: '-0.5px',
                          margin: 0,
                          color: '#ffffff'
                        }}
                      >
                        {cat.title}
                      </h3>
                    </div>

                    <p
                      style={{
                        fontFamily: '"TWK Lausanne 300", sans-serif',
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: '1.4',
                        margin: '0 0 16px 0'
                      }}
                    >
                      {cat.tagline}
                    </p>

                    <p
                      style={{
                        fontFamily: '"TWK Lausanne 300", sans-serif',
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: '1.6',
                        margin: '0 0 20px 0'
                      }}
                    >
                      {cat.description}
                    </p>

                    {/* Quick Item Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cat.items.map((item, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '11px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: 'rgba(255, 255, 255, 0.7)'
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/products?category=${encodeURIComponent(cat.id)}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      marginTop: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    <span>Browse {cat.title}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
