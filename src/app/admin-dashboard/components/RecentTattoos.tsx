import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Tattoo } from '@/lib/content';
import { Tag, ArrowRight } from 'lucide-react';

interface Props {
  tatuajes: Tattoo[];
}

export default function RecentTattoos({ tatuajes }: Props) {
  return (
    <div className="bg-zinc-950 border border-zinc-800">
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
        <h2 className="font-display text-sm font-semibold text-white tracking-wide">
          Tatuajes Recientes
        </h2>
        <Link
          href="/tattoo-management"
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
        >
          Ver todos
          <ArrowRight size={12} />
        </Link>
      </div>

      {tatuajes.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-zinc-600 text-sm">No hay tatuajes en el catálogo.</p>
          <Link
            href="/tattoo-management"
            className="mt-3 inline-block text-xs text-[#d4af37] hover:underline"
          >
            Agregar primer tatuaje →
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-zinc-800/60">
          {tatuajes.map((tattoo) => (
            <div
              key={tattoo.id}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors group"
            >
              {/* Thumbnail */}
              <div className="relative w-10 h-10 shrink-0 overflow-hidden bg-zinc-900">
                <AppImage
                  src={tattoo.imagen}
                  alt={`Miniatura de tatuaje ${tattoo.nombre}`}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-medium text-white truncate">
                    {tattoo.nombre}
                  </span>
                  {tattoo.enOferta && (
                    <span className="badge-offer shrink-0">
                      <Tag size={9} />
                      Oferta
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-600 truncate mt-0.5">
                  {tattoo.descripcion}
                </p>
              </div>

              {/* Action */}
              <Link
                href="/tattoo-management"
                className="shrink-0 text-zinc-700 group-hover:text-zinc-400 transition-colors"
                aria-label={`Editar ${tattoo.nombre}`}
              >
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}