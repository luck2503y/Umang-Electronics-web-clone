import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Playreel from '../components/Playreel';
import CategoriesOverview from '../components/CategoriesOverview';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialSection from '../components/TestimonialSection';
import FeaturedTemplates from '../components/FeaturedTemplates';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

export default function Home({ onOpenContact }) {
  useEffect(() => {
    document.title = "Umang Electronics — Premium Home Appliances & Entertainment";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ width: '100%' }}>
      <Hero onOpenContact={onOpenContact} />
      <Playreel />
      <CategoriesOverview />
      <AboutSection />
      <ServicesSection onOpenContact={onOpenContact} />
      <TestimonialSection />
      <FeaturedTemplates />
      <FAQSection onOpenContact={onOpenContact} />
      <CTASection onOpenContact={onOpenContact} />
    </main>
  );
}
