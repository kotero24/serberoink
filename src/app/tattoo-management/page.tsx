import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getContent } from '@/lib/content';
import TattooTable from './components/TattooTable';

export const revalidate = 0;

export default async function TattooManagementPage() {
  const content = await getContent();

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 xl:p-10 max-w-screen-2xl">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="text-xs text-zinc-600 tracking-widest uppercase">
              Catálogo
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            Gestión de Tatuajes
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Creá, editá y eliminá los diseños del catálogo
          </p>
        </div>

        <TattooTable initialTatuajes={content?.tatuajes} />
      </div>
    </AdminLayout>
  );
}