import React, { useEffect, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Playreel from '../components/Playreel';
import CategoriesOverview from '../components/CategoriesOverview';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';

const TestimonialSection = lazy(() => import('../components/TestimonialSection'));
const FeaturedTemplates = lazy(() => import('../components/FeaturedTemplates'));
const FAQSection = lazy(() => import('../components/FAQSection'));
const CTASection = lazy(() => import('../components/CTASection'));

export default function Home({ onOpenContact, isPreloaderActive }) {
  useEffect(() => {
    document.title = "Umang Electronics — Premium Home Appliances & Entertainment";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ width: '100%' }}>
      <Hero onOpenContact={onOpenContact} isPreloaderActive={isPreloaderActive} />
      <Playreel />
      <CategoriesOverview />
      <AboutSection />
      <ServicesSection onOpenContact={onOpenContact} />
      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <TestimonialSection />
        <FeaturedTemplates />
        <FAQSection onOpenContact={onOpenContact} />
        <CTASection onOpenContact={onOpenContact} />
      </Suspense>
    </main>
  );
}
