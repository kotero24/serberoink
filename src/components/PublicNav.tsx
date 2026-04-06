'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X } from 'lucide-react';

export default function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-zinc-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/landing-page" className="flex items-center gap-3 group">
              <AppLogo size={36} />
              <span className="font-display text-lg font-700 tracking-wider text-white group-hover:text-zinc-300 transition-colors">
                SERBERO INK
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#catalogo"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase"
              >
                Catálogo
              </a>
              <a
                href="#ofertas"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase"
              >
                Ofertas
              </a>
              <a
                href="#contacto"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase"
              >
                Contacto
              </a>
              <Link
                href="/sign-up-login-screen"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-400 transition-colors tracking-wide uppercase"
              >
                Admin
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-zinc-950 border-l border-zinc-800 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <span className="font-display font-semibold tracking-wider">SERBERO INK</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-6">
            {[
              { href: '#catalogo', label: 'Catálogo' },
              { href: '#ofertas', label: 'Ofertas' },
              { href: '#contacto', label: 'Contacto' },
            ]?.map((item) => (
              <a
                key={`mobile-nav-${item?.href}`}
                href={item?.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-zinc-300 hover:text-white transition-colors tracking-wide uppercase"
              >
                {item?.label}
              </a>
            ))}
            <div className="border-t border-zinc-800 pt-6">
              <Link
                href="/sign-up-login-screen"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors tracking-wide uppercase"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}