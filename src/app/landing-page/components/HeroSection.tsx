import React from 'react';

import AppLogo from '@/components/ui/AppLogo';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.5) 2px,
            rgba(255,255,255,0.5) 3px
          )`,
        }}
      />

      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <AppLogo size={72} />
            <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-xl" />
          </div>
        </div>

        {/* Studio name */}
        <div className="mb-4">
          <span className="text-xs font-semibold tracking-[0.4em] text-[#d4af37] uppercase">
            Estudio de Tatuajes
          </span>
        </div>

        <h1 className="font-display text-6xl md:text-8xl xl:text-9xl font-black tracking-tight text-white mb-6 leading-none">
          SERBERO
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">
            INK
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed font-light">
          Arte permanente. Diseños únicos. Cada tatuaje es una historia
          que llevás en la piel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#catalogo" className="btn-primary w-full sm:w-auto">
            Ver Catálogo
          </a>
          <a href="#contacto" className="btn-secondary w-full sm:w-auto">
            Reservar Turno
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/60" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">
            Scroll
          </span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#d4af37]/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#d4af37]/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#d4af37]/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#d4af37]/20" />
    </section>
  );
}