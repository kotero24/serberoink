'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Palette,
  Phone,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    id: 'nav-dashboard',
    href: '/admin-dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'nav-tattoos',
    href: '/tattoo-management',
    label: 'Tatuajes',
    icon: Palette,
  },
  {
    id: 'nav-contact',
    href: '/admin-dashboard#contacto',
    label: 'Contacto',
    icon: Phone,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('serbero_admin_token');
    }
    router.push('/sign-up-login-screen');
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-zinc-800">
          <AppLogo size={32} />
          <div>
            <div className="font-display text-sm font-semibold tracking-widest text-white">
              SERBERO INK
            </div>
            <div className="text-xs text-zinc-600 tracking-wider">ADMIN</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-1 text-zinc-600 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          <div className="px-3 pb-2">
            <span className="text-[10px] font-semibold text-zinc-600 tracking-[0.15em] uppercase">
              Panel
            </span>
          </div>
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin-dashboard'
                ? pathname === '/admin-dashboard' : pathname.startsWith(item.href.split('#')[0]);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={
                  isActive
                    ? 'sidebar-link-active' :'sidebar-link'
                }
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight size={14} className="ml-auto text-[#d4af37]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800">
          <Link
            href="/landing-page"
            className="sidebar-link text-xs mb-1"
          >
            Ver sitio público
          </Link>
          <button
            onClick={handleLogout}
            className="sidebar-link w-full text-left text-red-500/70 hover:text-red-400 hover:bg-red-500/5"
          >
            <LogOut size={16} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-zinc-950 border-b border-zinc-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
          <span className="font-display text-sm font-semibold tracking-widest">
            SERBERO INK
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}