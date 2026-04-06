import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Contacto } from '@/lib/content';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

interface Props {
  contacto: Contacto;
}

export default function ContactoFooter({ contacto }: Props) {
  const whatsappUrl = contacto.whatsapp
    ? `https://wa.me/${contacto.whatsapp.replace(/\D/g, '')}`
    : '#';
  const instagramUrl = contacto.instagram
    ? `https://instagram.com/${contacto.instagram.replace('@', '')}`
    : '#';
  const mapsUrl = contacto.direccion
    ? `https://maps.google.com/?q=${encodeURIComponent(contacto.direccion)}`
    : '#';

  return (
    <footer id="contacto" className="bg-zinc-950 border-t border-zinc-800">
      {/* Contact section */}
      <div className="py-20 px-6 lg:px-10 xl:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <AppLogo size={40} />
                <span className="font-display text-xl font-bold tracking-widest text-white">
                  SERBERO INK
                </span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-6">
                Estudio de tatuajes profesional en Buenos Aires. Arte
                permanente creado con pasión, precisión y respeto por tu
                visión.
              </p>
              <div className="flex items-center gap-3">
                {contacto.whatsapp && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all duration-150"
                    aria-label="WhatsApp de Serbero Ink"
                  >
                    <MessageCircle size={16} />
                  </a>
                )}
                {contacto.instagram && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all duration-150"
                    aria-label="Instagram de Serbero Ink"
                  >
                    <MapPin size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="font-display text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-6">
                Contacto
              </h3>
              <div className="space-y-4">
                {contacto.telefono && (
                  <a
                    href={`tel:${contacto.telefono.replace(/\s/g, '')}`}
                    className="flex items-start gap-3 group"
                  >
                    <Phone
                      size={15}
                      className="text-zinc-600 group-hover:text-[#d4af37] transition-colors mt-0.5 shrink-0"
                    />
                    <span className="text-zinc-400 text-sm group-hover:text-white transition-colors">
                      {contacto.telefono}
                    </span>
                  </a>
                )}
                {contacto.whatsapp && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <MessageCircle
                      size={15}
                      className="text-zinc-600 group-hover:text-[#d4af37] transition-colors mt-0.5 shrink-0"
                    />
                    <span className="text-zinc-400 text-sm group-hover:text-white transition-colors">
                      WhatsApp
                    </span>
                  </a>
                )}
                {contacto.instagram && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <MapPin
                      size={15}
                      className="text-zinc-600 group-hover:text-[#d4af37] transition-colors mt-0.5 shrink-0"
                    />
                    <span className="text-zinc-400 text-sm group-hover:text-white transition-colors">
                      {contacto.instagram}
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-display text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-6">
                Ubicación
              </h3>
              {contacto.direccion && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin
                    size={15}
                    className="text-zinc-600 group-hover:text-[#d4af37] transition-colors mt-0.5 shrink-0"
                  />
                  <span className="text-zinc-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                    {contacto.direccion}
                  </span>
                </a>
              )}
              <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Turnos con cita previa.{' '}
                  <a href={whatsappUrl} className="text-[#d4af37] hover:underline">
                    Consultanos por WhatsApp
                  </a>{' '}
                  para coordinar tu sesión.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 py-5 px-6 lg:px-10 xl:px-16">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-700 text-xs tracking-wide">
            © 2026 Serbero Ink. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
            <span className="text-zinc-700 text-xs tracking-wider">
              Buenos Aires, Argentina
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}