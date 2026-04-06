'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Contacto } from '@/lib/content';
import { Phone, MessageCircle, MapPin, Save, Loader2 } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface Props {
  initialContacto: Contacto;
}

export default function ContactoEditor({ initialContacto }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Contacto>({
    defaultValues: initialContacto,
  });

  const onSubmit = async (data: Contacto) => {
    setIsSaving(true);
    setSavedOk(false);
    try {
      // Backend integration point: read full content then update contacto field
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('serbero_admin_token') || ''
          : '';

      // First get current full content
      const contentRes = await fetch('/api/content');
      let fullContent = { tatuajes: [], contacto: data };
      if (contentRes.ok) {
        fullContent = await contentRes.json();
      }
      fullContent.contacto = data;

      const res = await fetch('/api/update-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: fullContent }),
      });

      if (!res.ok) {
        throw new Error('Error al guardar');
      }

      setSavedOk(true);
      toast.success('Información de contacto actualizada');
      setTimeout(() => setSavedOk(false), 3000);
    } catch {
      toast.error('No se pudo guardar. Intentá nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const fields = [
    {
      id: 'telefono' as const,
      label: 'Teléfono',
      icon: Phone,
      placeholder: '+54 11 4567-8901',
    },
    {
      id: 'whatsapp' as const,
      label: 'WhatsApp',
      icon: MessageCircle,
      placeholder: '+5491145678901',
    },
    {
      id: 'instagram' as const,
      label: 'Instagram',
      icon: MapPin,
      placeholder: '@serberoink',
    },
    {
      id: 'direccion' as const,
      label: 'Dirección',
      icon: MapPin,
      placeholder: 'Av. Corrientes 1234, CABA',
    },
  ];

  return (
    <div id="contacto" className="bg-zinc-950 border border-zinc-800">
      <div className="px-5 py-4 border-b border-zinc-800">
        <h2 className="font-display text-sm font-semibold text-white tracking-wide">
          Información de Contacto
        </h2>
        <p className="text-xs text-zinc-600 mt-0.5">
          Visible en el footer del sitio
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={`field-${field.id}`}>
              <label htmlFor={field.id} className="label-dark flex items-center gap-1.5">
                <Icon size={11} />
                {field.label}
              </label>
              <input
                id={field.id}
                type="text"
                placeholder={field.placeholder}
                className="input-dark"
                {...register(field.id, {
                  required: `${field.label} es requerido`,
                })}
              />
              {errors[field.id] && (
                <p className="mt-1 text-xs text-red-400" role="alert">
                  {errors[field.id]?.message}
                </p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={isSaving || !isDirty}
          className="w-full flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold py-2.5 tracking-wider uppercase transition-all duration-200 hover:bg-zinc-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
          style={{ minHeight: '40px' }}
        >
          {isSaving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : savedOk ? (
            <>
              <span className="text-emerald-600">✓</span> Guardado
            </>
          ) : (
            <>
              <Save size={13} />
              Guardar Cambios
            </>
          )}
        </button>

        {!isDirty && (
          <p className="text-center text-xs text-zinc-700">
            Sin cambios pendientes
          </p>
        )}
      </form>
    </div>
  );
}