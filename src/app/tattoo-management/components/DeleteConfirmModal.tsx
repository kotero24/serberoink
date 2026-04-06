'use client';

import React from 'react';
import { Tattoo } from '@/lib/content';
import AppImage from '@/components/ui/AppImage';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface Props {
  open: boolean;
  tattoo: Tattoo | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  open,
  tattoo,
  onClose,
  onConfirm,
}: Props) {
  if (!open || !tattoo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-zinc-950 border border-red-900/40 animate-fade-in-up">
        {/* Red accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 border border-red-500/20">
              <AlertTriangle size={16} className="text-red-400" />
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold text-white">
                Eliminar Tatuaje
              </h2>
              <p className="text-xs text-zinc-600 mt-0.5">
                Esta acción no se puede deshacer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-600 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-center gap-4 mb-4 p-3 bg-zinc-900 border border-zinc-800">
            <div className="relative w-12 h-12 shrink-0 overflow-hidden">
              <AppImage
                src={tattoo.imagen}
                alt={`Miniatura de ${tattoo.nombre} a eliminar`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{tattoo.nombre}</p>
              <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                {tattoo.descripcion}
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            ¿Estás seguro de que querés eliminar{' '}
            <span className="text-white font-medium">"{tattoo.nombre}"</span>{' '}
            del catálogo? Se eliminará permanentemente del sitio público.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors px-4 py-2 border border-zinc-800 hover:border-zinc-600"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 bg-red-500 text-white text-xs font-semibold px-5 py-2 hover:bg-red-600 active:scale-95 transition-all duration-150"
          >
            <Trash2 size={12} />
            Eliminar Definitivamente
          </button>
        </div>
      </div>
    </div>
  );
}