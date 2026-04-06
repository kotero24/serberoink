import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { Tattoo } from '@/lib/content';
import { Tag, Zap } from 'lucide-react';

interface Props {
  tatuajes: Tattoo[];
}

export default function OfertasSection({ tatuajes }: Props) {
  if (tatuajes.length === 0) return null;

  return (
    <section
      id="ofertas"
      className="py-24 px-6 lg:px-10 xl:px-16 bg-zinc-950 border-y border-zinc-800"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 px-4 py-2 mb-6">
            <Zap size={14} className="text-[#d4af37]" />
            <span className="text-xs font-semibold tracking-[0.3em] text-[#d4af37] uppercase">
              Tiempo Limitado
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Diseños en Oferta
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Aprovechá estos precios especiales. Las ofertas cambian
            regularmente — consultá disponibilidad.
          </p>
        </div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {tatuajes.map((tattoo, i) => (
            <div
              key={tattoo.id}
              className="relative bg-[#0a0a0a] border border-[#d4af37]/20 group overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <AppImage
                  src={tattoo.imagen}
                  alt={`Tatuaje en oferta: ${tattoo.nombre} — ${tattoo.descripcion.substring(0, 60)}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="badge-offer">
                    <Tag size={10} />
                    En Oferta
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-white mb-2 tracking-wide">
                  {tattoo.nombre}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                  {tattoo.descripcion}
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <a
                    href="#contacto"
                    className="text-[#d4af37] text-xs font-semibold tracking-wider uppercase hover:text-[#e8c94e] transition-colors"
                  >
                    Consultar precio →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}