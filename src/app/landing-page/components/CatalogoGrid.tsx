import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { Tattoo } from '@/lib/content';
import { Tag } from 'lucide-react';

interface Props {
  tatuajes: Tattoo[];
}

export default function CatalogoGrid({ tatuajes }: Props) {
  if (tatuajes.length === 0) {
    return (
      <section id="catalogo" className="py-24 px-6">
        <div className="max-w-screen-2xl mx-auto text-center">
          <p className="text-zinc-600 text-sm">
            El catálogo está siendo actualizado. Volvé pronto.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="catalogo" className="py-24 px-6 lg:px-10 xl:px-16">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.35em] text-[#d4af37] uppercase block mb-3">
              Nuestro Trabajo
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Catálogo
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
            {tatuajes.length} diseños disponibles. Cada pieza es única y
            adaptada a tu visión.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-px bg-zinc-800">
          {tatuajes.map((tattoo) => (
            <div
              key={tattoo.id}
              className="relative bg-[#0a0a0a] group overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <AppImage
                  src={tattoo.imagen}
                  alt={`Tatuaje ${tattoo.nombre} — diseño de ${tattoo.descripcion.substring(0, 50)}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

                {/* Offer badge */}
                {tattoo.enOferta && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="badge-offer">
                      <Tag size={10} />
                      Oferta
                    </span>
                  </div>
                )}

                {/* Hover info */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-white/80 text-xs leading-relaxed line-clamp-3">
                    {tattoo.descripcion}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 border-t border-zinc-800">
                <h3 className="font-display text-sm font-semibold text-white tracking-wide">
                  {tattoo.nombre}
                </h3>
                <p className="text-zinc-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                  {tattoo.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}