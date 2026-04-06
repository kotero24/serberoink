import React from 'react';
import { getContent } from '@/lib/content';
import PublicNav from '@/components/PublicNav';
import HeroSection from './components/HeroSection';
import CatalogoGrid from './components/CatalogoGrid';
import OfertasSection from './components/OfertasSection';
import ContactoFooter from './components/ContactoFooter';

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function LandingPage() {
  const content = await getContent();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PublicNav />
      <HeroSection />
      <CatalogoGrid tatuajes={content?.tatuajes} />
      <OfertasSection tatuajes={content?.tatuajes?.filter((t) => t?.enOferta)} />
      <ContactoFooter contacto={content?.contacto} />
    </div>
  );
}