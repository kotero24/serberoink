import React from 'react';
import Link from 'next/link';
import { Palette, Tag, Phone, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface Props {
  totalTatuajes: number;
  enOferta: number;
  contactoCompleto: boolean;
}

export default function DashboardStats({
  totalTatuajes,
  enOferta,
  contactoCompleto,
}: Props) {
  const stats = [
    {
      id: 'stat-total',
      label: 'Total Tatuajes',
      value: totalTatuajes.toString(),
      subtext: 'en el catálogo',
      icon: Palette,
      color: 'text-white',
      bg: 'bg-zinc-900',
      border: 'border-zinc-800',
      href: '/tattoo-management',
    },
    {
      id: 'stat-oferta',
      label: 'En Oferta',
      value: enOferta.toString(),
      subtext: `de ${totalTatuajes} diseños`,
      icon: Tag,
      color: 'text-[#d4af37]',
      bg: 'bg-[#d4af37]/5',
      border: 'border-[#d4af37]/20',
      href: '/tattoo-management',
    },
    {
      id: 'stat-contacto',
      label: 'Info de Contacto',
      value: contactoCompleto ? 'Completo' : 'Incompleto',
      subtext: contactoCompleto ? 'todos los campos' : 'faltan campos',
      icon: Phone,
      color: contactoCompleto ? 'text-emerald-400' : 'text-amber-400',
      bg: contactoCompleto ? 'bg-emerald-500/5' : 'bg-amber-500/5',
      border: contactoCompleto ? 'border-emerald-500/20' : 'border-amber-500/20',
      href: '/admin-dashboard#contacto',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Link
            key={stat.id}
            href={stat.href}
            className={`${stat.bg} border ${stat.border} p-6 group hover:brightness-110 transition-all duration-200 block`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 ${stat.bg} border ${stat.border}`}>
                <Icon size={16} className={stat.color} />
              </div>
              <ArrowRight
                size={14}
                className="text-zinc-700 group-hover:text-zinc-500 transition-colors"
              />
            </div>
            <div
              className={`font-display text-3xl font-bold tabular-nums mb-1 ${stat.color}`}
            >
              {stat.value}
            </div>
            <div className="text-xs font-medium text-zinc-400 tracking-wide">
              {stat.label}
            </div>
            <div className="text-xs text-zinc-600 mt-0.5">{stat.subtext}</div>
          </Link>
        );
      })}
    </div>
  );
}