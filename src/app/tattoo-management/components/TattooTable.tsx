'use client';

import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';
import AppImage from '@/components/ui/AppImage';
import { Tattoo } from '@/lib/content';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  EyeOff,
} from 'lucide-react';
import TattooFormModal from './TattooFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Props {
  initialTatuajes: Tattoo[];
}

function generateId() {
  return `tattoo-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

const ITEMS_PER_PAGE = 8;

export default function TattooTable({ initialTatuajes }: Props) {
  const [tatuajes, setTatuajes] = useState<Tattoo[]>(initialTatuajes);
  const [search, setSearch] = useState('');
  const [filterOferta, setFilterOferta] = useState<'all' | 'oferta' | 'normal'>('all');
  const [page, setPage] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Modals
  const [formModal, setFormModal] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    tattoo: Tattoo | null;
  }>({ open: false, mode: 'create', tattoo: null });
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    tattoo: Tattoo | null;
  }>({ open: false, tattoo: null });

  // Filtered + paginated
  const filtered = tatuajes.filter((t) => {
    const matchSearch =
      t.nombre.toLowerCase().includes(search.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filterOferta === 'all' ||
      (filterOferta === 'oferta' && t.enOferta) ||
      (filterOferta === 'normal' && !t.enOferta);
    return matchSearch && matchFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const persistContent = useCallback(
    async (updatedTatuajes: Tattoo[]) => {
      setIsSaving(true);
      try {
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('serbero_admin_token') || ''
            : '';

        // Backend integration point: get full content then update tatuajes
        const contentRes = await fetch('/api/content');
        let fullContent = { tatuajes: updatedTatuajes, contacto: {} };
        if (contentRes.ok) {
          fullContent = await contentRes.json();
        }
        fullContent.tatuajes = updatedTatuajes;

        const res = await fetch('/api/update-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: fullContent }),
        });

        if (!res.ok) throw new Error('Error al guardar');
      } catch {
        toast.error('Error al sincronizar con GitHub. Los cambios son locales.');
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  const handleCreate = () => {
    setFormModal({ open: true, mode: 'create', tattoo: null });
  };

  const handleEdit = (tattoo: Tattoo) => {
    setFormModal({ open: true, mode: 'edit', tattoo });
  };

  const handleDeleteClick = (tattoo: Tattoo) => {
    setDeleteModal({ open: true, tattoo });
  };

  const handleFormSubmit = async (data: Omit<Tattoo, 'id'>) => {
    let updated: Tattoo[];
    if (formModal.mode === 'create') {
      const newTattoo: Tattoo = { ...data, id: generateId() };
      updated = [newTattoo, ...tatuajes];
      toast.success(`"${data.nombre}" agregado al catálogo`);
    } else {
      updated = tatuajes.map((t) =>
        t.id === formModal.tattoo?.id ? { ...t, ...data } : t
      );
      toast.success(`"${data.nombre}" actualizado`);
    }
    setTatuajes(updated);
    setFormModal({ open: false, mode: 'create', tattoo: null });
    await persistContent(updated);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.tattoo) return;
    const nombre = deleteModal.tattoo.nombre;
    let updated = tatuajes.filter((t) => t.id !== deleteModal.tattoo!.id);
    setTatuajes(updated);
    setDeleteModal({ open: false, tattoo: null });
    toast.success(`"${nombre}" eliminado del catálogo`);
    await persistContent(updated);
  };

  const handleToggleOferta = async (tattoo: Tattoo) => {
    let updated = tatuajes.map((t) =>
      t.id === tattoo.id ? { ...t, enOferta: !t.enOferta } : t
    );
    setTatuajes(updated);
    toast.success(
      tattoo.enOferta
        ? `"${tattoo.nombre}" quitado de ofertas`
        : `"${tattoo.nombre}" marcado en oferta`
    );
    await persistContent(updated);
  };

  return (
    <>
      <div className="bg-zinc-950 border border-zinc-800">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-zinc-800">
          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar tatuajes..."
              className="input-dark pl-8 py-2 text-xs"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
                aria-label="Limpiar búsqueda"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-2">
            <Filter size={12} className="text-zinc-600" />
            {(['all', 'oferta', 'normal'] as const).map((f) => (
              <button
                key={`filter-${f}`}
                onClick={() => {
                  setFilterOferta(f);
                  setPage(1);
                }}
                className={`text-xs px-3 py-1.5 border transition-all duration-150 ${
                  filterOferta === f
                    ? 'bg-white text-black border-white' :'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'oferta' ? 'En Oferta' : 'Sin Oferta'}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden sm:block" />

          {/* Save indicator */}
          {isSaving && (
            <span className="text-xs text-zinc-500 flex items-center gap-1.5">
              <svg
                className="animate-spin h-3 w-3"
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
              Guardando...
            </span>
          )}

          {/* Create button */}
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2 hover:bg-zinc-200 active:scale-95 transition-all duration-150 whitespace-nowrap"
          >
            <Plus size={13} />
            Nuevo Tatuaje
          </button>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
          <span className="text-xs text-zinc-600">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </span>
          <span className="text-zinc-800">|</span>
          <span className="text-xs text-zinc-600">
            {tatuajes.filter((t) => t.enOferta).length} en oferta
          </span>
          <span className="text-zinc-800">|</span>
          <span className="text-xs text-zinc-600">
            {tatuajes.length} total en catálogo
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 tracking-wider uppercase w-14">
                  Img
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 tracking-wider uppercase">
                  Nombre
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 tracking-wider uppercase hidden md:table-cell">
                  Descripción
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-500 tracking-wider uppercase w-28">
                  Estado
                </th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-zinc-500 tracking-wider uppercase w-28">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center">
                        <Search size={16} className="text-zinc-700" />
                      </div>
                      <p className="text-zinc-600 text-sm">
                        No se encontraron tatuajes
                        {search ? ` para "${search}"` : ''}
                      </p>
                      {search && (
                        <button
                          onClick={() => setSearch('')}
                          className="text-xs text-[#d4af37] hover:underline"
                        >
                          Limpiar búsqueda
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((tattoo) => (
                  <TableRow
                    key={tattoo.id}
                    tattoo={tattoo}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    onToggleOferta={handleToggleOferta}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
            <span className="text-xs text-zinc-600">
              Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} de{' '}
              {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 text-zinc-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-zinc-800 hover:border-zinc-600"
                aria-label="Página anterior"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={`page-${p}`}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 text-xs transition-all duration-150 border ${
                    p === currentPage
                      ? 'bg-white text-black border-white' :'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 text-zinc-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-zinc-800 hover:border-zinc-600"
                aria-label="Página siguiente"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <TattooFormModal
        open={formModal.open}
        mode={formModal.mode}
        tattoo={formModal.tattoo}
        onClose={() => setFormModal({ open: false, mode: 'create', tattoo: null })}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmModal
        open={deleteModal.open}
        tattoo={deleteModal.tattoo}
        onClose={() => setDeleteModal({ open: false, tattoo: null })}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

interface RowProps {
  tattoo: Tattoo;
  onEdit: (t: Tattoo) => void;
  onDelete: (t: Tattoo) => void;
  onToggleOferta: (t: Tattoo) => void;
}

function TableRow({ tattoo, onEdit, onDelete, onToggleOferta }: RowProps) {
  return (
    <tr className="group hover:bg-white/[0.02] transition-colors">
      {/* Image */}
      <td className="px-4 py-3">
        <div className="relative w-9 h-9 overflow-hidden bg-zinc-900 shrink-0">
          <AppImage
            src={tattoo.imagen}
            alt={`Vista previa del tatuaje ${tattoo.nombre}`}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
      </td>

      {/* Name */}
      <td className="px-4 py-3">
        <span className="font-display text-sm font-medium text-white">
          {tattoo.nombre}
        </span>
        <div className="text-xs text-zinc-600 font-mono mt-0.5">
          {tattoo.id}
        </div>
      </td>

      {/* Description */}
      <td className="px-4 py-3 hidden md:table-cell max-w-xs">
        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
          {tattoo.descripcion}
        </p>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <button
          onClick={() => onToggleOferta(tattoo)}
          className="transition-all duration-150 hover:scale-105 active:scale-95"
          title={
            tattoo.enOferta
              ? `Quitar "${tattoo.nombre}" de ofertas`
              : `Marcar "${tattoo.nombre}" en oferta`
          }
        >
          {tattoo.enOferta ? (
            <span className="badge-offer">
              <Tag size={9} />
              Oferta
            </span>
          ) : (
            <span className="badge-inactive">Normal</span>
          )}
        </button>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Toggle offer quick action */}
          <button
            onClick={() => onToggleOferta(tattoo)}
            className="p-1.5 text-zinc-600 hover:text-[#d4af37] transition-colors border border-transparent hover:border-zinc-700"
            title={tattoo.enOferta ? 'Quitar de ofertas' : 'Marcar en oferta'}
          >
            {tattoo.enOferta ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>

          <button
            onClick={() => onEdit(tattoo)}
            className="p-1.5 text-zinc-600 hover:text-white transition-colors border border-transparent hover:border-zinc-700"
            title={`Editar ${tattoo.nombre}`}
          >
            <Edit2 size={13} />
          </button>

          <button
            onClick={() => onDelete(tattoo)}
            className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors border border-transparent hover:border-red-900/40"
            title={`Eliminar ${tattoo.nombre} — esta acción no se puede deshacer`}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}