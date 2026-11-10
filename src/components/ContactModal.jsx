import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Zap } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, selectedProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Product Availability & Price Quote',
    category: 'Home Appliances',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        category: selectedProduct.category || prev.category,
        notes: `Interested in: ${selectedProduct.name} (Ref: ${selectedProduct.id})`
      }));
    }
  }, [selectedProduct, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 1
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="contact-modal-card"
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: '540px',
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
              padding: '36px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <style>{`
              @media (max-width: 480px) {
                .contact-modal-card {
                  padding: 24px 18px !important;
                  border-radius: 20px !important;
                }
                .contact-modal-title {
                  font-size: 24px !important;
                }
              }
            `}</style>
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: '#000'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: '#10b981'
                  }}
                >
                  <CheckCircle size={36} />
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: '500', marginBottom: '12px', color: '#000' }}>
                  Enquiry Received!
                </h3>
                <p style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '15px', lineHeight: '1.6', maxWidth: '380px', margin: '0 auto' }}>
                  Thank you! An Umang Electronics specialist will contact you within 24 hours with product availability, doorstep installation schedule, and official warranty details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(0,0,0,0.5)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                    <Zap size={14} color="#000" />
                    <span>Umang Electronics Service Desk</span>
                  </div>
                  <h2
                    style={{
                      fontSize: '32px',
                      lineHeight: '1.2',
                      fontWeight: '400',
                      color: 'rgba(0, 0, 0, 0.96)',
                      letterSpacing: '-1px',
                      margin: 0
                    }}
                  >
                    Product & Installation Enquiry
                  </h2>
                </div>

                {/* Selected Product Pill if active */}
                {selectedProduct && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      border: '1px solid rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <img
                      src={selectedProduct.image}
                      alt=""
                      style={{ width: '44px', height: '36px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', display: 'block' }}>
                        Inquiring about
                      </span>
                      <strong style={{ fontSize: '14px', color: '#000' }}>
                        {selectedProduct.name}
                      </strong>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      fontSize: '14px',
                      color: 'rgba(0, 0, 0, 0.96)',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Contact Row: Phone & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 0.96)',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 0.96)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Enquiry Type */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>Enquiry Type</label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      fontSize: '14px',
                      color: 'rgba(0, 0, 0, 0.96)',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Product Availability & Price Quote">Product Availability & Price Quote</option>
                    <option value="Home Installation & Tonnage Consultation">Home Installation & Sizing Consultation</option>
                    <option value="Complete Home Appliance Package">Complete Home Appliance Package</option>
                    <option value="Manufacturer Warranty Support">Manufacturer Warranty & Technical Support</option>
                    <option value="Bulk Corporate Order">Bulk / Commercial Order</option>
                  </select>
                </div>

                {/* Department */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>Appliance Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      fontSize: '14px',
                      color: 'rgba(0, 0, 0, 0.96)',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Home Appliances">Home Appliances (Refrigerators, ACs, Washers, etc.)</option>
                    <option value="TV & Entertainment">TV & Entertainment (OLED, Smart TVs, Audio, etc.)</option>
                    <option value="Small Kitchen Appliances">Small Kitchen Appliances (Mixers, Fryers, Cooktops, etc.)</option>
                  </select>
                </div>

                {/* Additional notes / City */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)' }}>Specific Model Requirements / Delivery City</label>
                  <textarea
                    rows={2}
                    placeholder="Enter preferred capacity, installation location, or any questions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      fontSize: '14px',
                      color: 'rgba(0, 0, 0, 0.96)',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '1000px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '4px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
                >
                  Submit Product Enquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
