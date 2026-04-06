'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tattoo } from '@/lib/content';
import AppImage from '@/components/ui/AppImage';
import { X, ImageIcon, Tag } from 'lucide-react';

interface FormData {
  nombre: string;
  descripcion: string;
  imagen: string;
  enOferta: boolean;
}

interface Props {
  open: boolean;
  mode: 'create' | 'edit';
  tattoo: Tattoo | null;
  onClose: () => void;
  onSubmit: (data: Omit<Tattoo, 'id'>) => void;
}

export default function TattooFormModal({
  open,
  mode,
  tattoo,
  onClose,
  onSubmit,
}: Props) {
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nombre: '',
      descripcion: '',
      imagen: '',
      enOferta: false,
    },
  });

  const watchedImagen = watch('imagen');
  const watchedOferta = watch('enOferta');

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && tattoo) {
        reset({
          nombre: tattoo.nombre,
          descripcion: tattoo.descripcion,
          imagen: tattoo.imagen,
          enOferta: tattoo.enOferta,
        });
        setImagePreview(tattoo.imagen);
      } else {
        reset({ nombre: '', descripcion: '', imagen: '', enOferta: false });
        setImagePreview('');
      }
    }
  }, [open, mode, tattoo, reset]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (watchedImagen && watchedImagen.startsWith('http')) {
        setImagePreview(watchedImagen);
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [watchedImagen]);

  const handleFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        {/* Gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <h2 className="font-display text-base font-semibold text-white">
              {mode === 'create' ? 'Nuevo Tatuaje' : 'Editar Tatuaje'}
            </h2>
            <p className="text-xs text-zinc-600 mt-0.5">
              {mode === 'create' ?'Completá los campos para agregar al catálogo'
                : `Editando: ${tattoo?.nombre}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-600 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-600"
            aria-label="Cerrar modal"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="p-6 space-y-5">
            {/* Image preview */}
            <div className="relative w-full aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden">
              {imagePreview ? (
                <AppImage
                  src={imagePreview}
                  alt="Vista previa del tatuaje ingresado"
                  fill
                  className="object-cover"
                  sizes="512px"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <ImageIcon size={24} className="text-zinc-700" />
                  <span className="text-xs text-zinc-700">
                    Vista previa de imagen
                  </span>
                </div>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imagen" className="label-dark">
                URL de Imagen
              </label>
              <p className="text-xs text-zinc-600 mb-1.5">
                Ingresá la URL directa de la imagen (https://...)
              </p>
              <input
                id="imagen"
                type="url"
                placeholder="https://images.unsplash.com/..."
                className="input-dark"
                {...register('imagen', {
                  required: 'La URL de imagen es requerida',
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Debe ser una URL válida (https://...)',
                  },
                })}
              />
              {errors.imagen && (
                <p className="mt-1.5 text-xs text-red-400" role="alert">
                  {errors.imagen.message}
                </p>
              )}
            </div>

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="label-dark">
                Nombre del Diseño
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Ej: Serpiente Geométrica"
                className="input-dark"
                {...register('nombre', {
                  required: 'El nombre es requerido',
                  minLength: {
                    value: 3,
                    message: 'Mínimo 3 caracteres',
                  },
                  maxLength: {
                    value: 60,
                    message: 'Máximo 60 caracteres',
                  },
                })}
              />
              {errors.nombre && (
                <p className="mt-1.5 text-xs text-red-400" role="alert">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="label-dark">
                Descripción
              </label>
              <p className="text-xs text-zinc-600 mb-1.5">
                Descripción del estilo, técnica y ubicación recomendada
              </p>
              <textarea
                id="descripcion"
                rows={3}
                placeholder="Ej: Diseño geométrico de serpiente con líneas finas..."
                className="input-dark resize-none"
                {...register('descripcion', {
                  required: 'La descripción es requerida',
                  minLength: {
                    value: 10,
                    message: 'Mínimo 10 caracteres',
                  },
                  maxLength: {
                    value: 300,
                    message: 'Máximo 300 caracteres',
                  },
                })}
              />
              {errors.descripcion && (
                <p className="mt-1.5 text-xs text-red-400" role="alert">
                  {errors.descripcion.message}
                </p>
              )}
            </div>

            {/* En oferta toggle */}
            <div>
              <label className="label-dark">Estado de Oferta</label>
              <button
                type="button"
                onClick={() => {
                  const current = watchedOferta;
                  // Use react-hook-form setValue via register
                }}
                className="flex items-center gap-3 group"
                aria-label="Toggle oferta"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="enOferta"
                    className="sr-only"
                    {...register('enOferta')}
                  />
                  <div
                    className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                      watchedOferta ? 'bg-[#d4af37]' : 'bg-zinc-800'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                        watchedOferta ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {watchedOferta ? (
                      <span className="badge-offer">
                        <Tag size={9} />
                        En Oferta
                      </span>
                    ) : (
                      <span className="badge-inactive text-xs">Sin oferta</span>
                    )}
                    <span className="text-xs text-zinc-500">
                      {watchedOferta
                        ? 'Visible en la sección de ofertas' :'No aparece en sección de ofertas'}
                    </span>
                  </div>
                </label>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-950/50">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-xs py-2 px-5"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold px-6 py-2 hover:bg-zinc-200 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minWidth: '120px', minHeight: '36px' }}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : mode === 'create' ? (
                'Agregar Tatuaje'
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}