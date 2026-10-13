import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Docs from './pages/Docs';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
  return null;
}

export default function App() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenContact = (product = null) => {
    setSelectedProduct(product);
    setContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar onOpenContact={() => handleOpenContact()} />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home onOpenContact={handleOpenContact} />} />
            <Route path="/products" element={<Products onOpenContact={handleOpenContact} />} />
            <Route path="/products/:id" element={<ProductDetail onOpenContact={handleOpenContact} />} />
            <Route path="/docs" element={<Docs onOpenContact={handleOpenContact} />} />
            <Route path="*" element={<Home onOpenContact={handleOpenContact} />} />
          </Routes>
        </div>

        <Footer onOpenContact={() => handleOpenContact()} />

        <ContactModal
          isOpen={contactModalOpen}
          onClose={handleCloseContact}
          selectedProduct={selectedProduct}
        />
      </div>
    </BrowserRouter>
  );
}
