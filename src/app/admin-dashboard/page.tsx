import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getContent } from '@/lib/content';
import DashboardStats from './components/DashboardStats';
import RecentTattoos from './components/RecentTattoos';
import ContactoEditor from './components/ContactoEditor';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const content = await getContent();

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 xl:p-10 max-w-screen-2xl">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="text-xs text-zinc-600 tracking-widest uppercase">
              Panel de Control
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Resumen del estado actual del estudio
          </p>
        </div>

        <DashboardStats
          totalTatuajes={content?.tatuajes?.length}
          enOferta={content?.tatuajes?.filter((t) => t?.enOferta)?.length}
          contactoCompleto={
            !!(
              content?.contacto?.telefono &&
              content?.contacto?.whatsapp &&
              content?.contacto?.instagram &&
              content?.contacto?.direccion
            )
          }
        />

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentTattoos tatuajes={content?.tatuajes?.slice(0, 6)} />
          </div>
          <div>
            <ContactoEditor initialContacto={content?.contacto} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}