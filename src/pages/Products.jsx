import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, SlidersHorizontal, Check, PhoneCall } from 'lucide-react';
import productsData from '../data/products.json';

const categories = [
  { id: 'all', label: 'All', count: 36 },
  { id: 'Home Appliances', label: 'Home Appliances', count: 8 },
  { id: 'TV & Entertainment', label: 'TV & Entertainment', count: 12 },
  { id: 'Small Kitchen Appliances', label: 'Small Kitchen Appliances', count: 16 }
];

export default function Products({ onOpenContact }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    document.title = "Complete Product Catalog (36 Products) — Umang Electronics";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && (cat === 'Home Appliances' || cat === 'TV & Entertainment' || cat === 'Small Kitchen Appliances')) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredProducts = useMemo(() => {
    return productsData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // default featured order from json
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <main
      className="products-main-page"
      style={{
        backgroundColor: '#efefef',
        color: '#000000',
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '120px',
        paddingLeft: '40px',
        paddingRight: '40px'
      }}
    >
      <style>{`
        @media (max-width: 810px) {
          .products-main-page {
            padding: 90px 16px 60px !important;
          }
          .products-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .products-toolbar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .products-search-box {
            max-width: 100% !important;
          }
          .products-summary-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
        }
      `}</style>
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto'
        }}
      >
        {/* Page Top Heading & Category Counts */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: '"TWK Lausanne 400", sans-serif',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(0, 0, 0, 0.5)',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            Umang Electronics Catalog
          </span>
          <h1
            style={{
              fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              lineHeight: '1.15',
              letterSpacing: '-1.8px',
              margin: '0 0 24px 0',
              fontWeight: '400',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '12px'
            }}
          >
            {categories.map((cat, i) => {
              const isSelected = activeCategory === cat.id;
              return (
                <span key={cat.id} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                  <button
                    onClick={() => handleCategoryChange(cat.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      font: 'inherit',
                      color: isSelected ? '#000000' : 'rgba(0, 0, 0, 0.35)',
                      fontWeight: isSelected ? '500' : '400',
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'baseline'
                    }}
                  >
                    {cat.label} ({cat.count})
                  </button>
                  {i < categories.length - 1 && (
                    <span style={{ color: 'rgba(0, 0, 0, 0.25)', marginRight: '6px' }}>,</span>
                  )}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Filter & Search Toolbar */}
        <div
          className="products-toolbar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '48px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Real-time Search Box */}
          <div
            className="products-search-box"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#ffffff',
              borderRadius: '100px',
              padding: '10px 18px',
              width: '100%',
              maxWidth: '380px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
              border: '1px solid rgba(0, 0, 0, 0.08)'
            }}
          >
            <Search size={16} color="rgba(0, 0, 0, 0.45)" />
            <input
              type="text"
              placeholder="Search appliances, TVs, kitchen tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                width: '100%',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: '#000'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={14} color="rgba(0,0,0,0.4)" />
              </button>
            )}
          </div>

          {/* Right: Results Count & Sort Dropdown */}
          <div className="products-summary-bar" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span
              style={{
                fontFamily: '"TWK Lausanne 400", sans-serif',
                fontSize: '13px',
                color: 'rgba(0, 0, 0, 0.6)'
              }}
            >
              Showing <strong>{filteredProducts.length}</strong> of 36 products
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.05em' }}>
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '100px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                <option value="featured">Featured Order</option>
                <option value="name-asc">Name (A — Z)</option>
                <option value="name-desc">Name (Z — A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div
            style={{
              padding: '80px 20px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '8px' }}>No appliances found</h3>
            <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px', marginBottom: '20px' }}>
              No items matched your filter "{searchQuery}". Try searching for refrigerator, TV, kettle, etc.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="glass-pill-btn-dark glass-pill-btn"
              style={{ padding: '10px 24px', fontSize: '13px' }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 3-Column Responsive Grid for all 36 Products */}
        <motion.div
          layout
          className="products-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '40px 32px'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1, delay: 0 } }}
                transition={{ duration: 0.3, delay: (index % 12) * 0.02 }}
                className="product-catalog-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease'
                }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div>
                  {/* Image Container with Link to Detail Page */}
                  <Link
                    to={`/products/${item.id}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '16 / 11',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: '#f5f5f5',
                      marginBottom: '18px',
                      position: 'relative'
                    }}
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    {/* Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '4px 10px',
                        borderRadius: '100px',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '11px',
                        fontWeight: '500',
                        color: '#ffffff',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.tag}
                    </div>
                  </Link>

                  {/* Category Pill */}
                  <span
                    style={{
                      fontFamily: '"TWK Lausanne 400", sans-serif',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'rgba(0, 0, 0, 0.5)',
                      display: 'inline-block',
                      marginBottom: '6px'
                    }}
                  >
                    {item.category}
                  </span>

                  {/* Product Name */}
                  <Link
                    to={`/products/${item.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#000000'
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: '"TWK Lausanne 500", "TWK Lausanne", sans-serif',
                        fontSize: '18px',
                        fontWeight: '500',
                        letterSpacing: '-0.3px',
                        margin: '0 0 8px 0',
                        lineHeight: '1.3'
                      }}
                    >
                      {item.name}
                    </h3>
                  </Link>

                  {/* Short Original Description */}
                  <p
                    style={{
                      fontFamily: '"TWK Lausanne 300", sans-serif',
                      fontSize: '13px',
                      lineHeight: '1.5',
                      color: 'rgba(0, 0, 0, 0.65)',
                      margin: '0 0 20px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.shortDescription}
                  </p>
                </div>

                {/* Working Action Buttons: View Details & Enquire Now */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <Link
                    to={`/products/${item.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      color: '#000000',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '500',
                      transition: 'background-color 0.2s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => onOpenContact(item)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#222';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                    }}
                  >
                    Enquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Complete Home Package & Consultation Banner */}
        <div
          style={{
            marginTop: '120px',
            padding: '80px 40px',
            borderRadius: '32px',
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              fontFamily: '"TWK Lausanne 400", sans-serif',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(0, 0, 0, 0.5)',
              marginBottom: '16px'
            }}
          >
            Tailored Electronics Consultation
          </span>

          <h2
            style={{
              fontFamily: '"TWK Lausanne 400", "TWK Lausanne", sans-serif',
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              fontWeight: '400',
              lineHeight: '1.1',
              letterSpacing: '-2px',
              color: '#000000',
              margin: '0 0 16px 0',
              maxWidth: '720px'
            }}
          >
            Planning a new home setup or appliance upgrade?
          </h2>

          <p
            style={{
              fontFamily: '"TWK Lausanne 300", sans-serif',
              fontSize: '17px',
              color: 'rgba(0, 0, 0, 0.7)',
              maxWidth: '620px',
              lineHeight: '1.6',
              letterSpacing: '-0.1px',
              margin: '0 0 36px 0'
            }}
          >
            Connect directly with an Umang Electronics appliance specialist for tonnage calculations, kitchen layout recommendations, official brand warranties, and coordinated doorstep delivery.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => onOpenContact()}
              className="glass-pill-btn-dark glass-pill-btn"
              style={{
                padding: '14px 32px',
                fontSize: '14px',
                backgroundColor: '#000000',
                color: '#ffffff',
                cursor: 'pointer',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Request Custom Package Quote</span>
              <ArrowUpRight size={16} />
            </button>

            <Link
              to="/docs"
              className="glass-pill-btn"
              style={{
                padding: '14px 32px',
                fontSize: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                color: '#000000',
                textDecoration: 'none'
              }}
            >
              Browse Buying Guides & Setup
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
