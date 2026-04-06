'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';
import { Eye, EyeOff, Lock, ArrowRight, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface LoginForm {
  token: string;
}

interface DemoCredential {
  label: string;
  value: string;
}

const DEMO_TOKEN = 'serbero-admin-2026';

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('No se pudo copiar');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1 text-zinc-600 hover:text-zinc-300 transition-colors"
      aria-label="Copiar al portapapeles"
    >
      {copied ? (
        <Check size={13} className="text-emerald-400" />
      ) : (
        <Copy size={13} />
      )}
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showToken, setShowToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Backend integration point: POST /api/auth with token
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: data.token }),
      });

      if (!res.ok) {
        toast.error('Credenciales inválidas — usá el token de demo que aparece abajo para ingresar');
        setIsLoading(false);
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('serbero_admin_token', data.token);
      }

      toast.success('Acceso concedido');
      router.push('/admin-dashboard');
    } catch {
      toast.error('Error de conexión. Intentá nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials: DemoCredential[] = [
    { label: 'Token de acceso', value: DEMO_TOKEN },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/4 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.3) 0px,
              rgba(255,255,255,0.3) 1px,
              transparent 1px,
              transparent 40px
            )`,
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Back link */}
        <div className="absolute top-6 left-6">
          <Link
            href="/landing-page"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors tracking-wider uppercase flex items-center gap-2"
          >
            ← Volver al sitio
          </Link>
        </div>

        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4">
              <AppLogo size={56} />
              <div className="absolute inset-0 bg-[#d4af37]/10 rounded-full blur-xl" />
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold tracking-[0.3em] text-white">
                SERBERO INK
              </div>
              <div className="text-xs text-zinc-600 tracking-[0.2em] uppercase mt-1">
                Panel de Administración
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="bg-zinc-950 border border-zinc-800 p-8">
            {/* Accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mb-8" />

            <h1 className="font-display text-lg font-semibold text-white mb-1 text-center">
              Iniciar Sesión
            </h1>
            <p className="text-xs text-zinc-600 text-center mb-8 tracking-wide">
              Ingresá tu token de acceso para continuar
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-6">
                <label htmlFor="token" className="label-dark">
                  Token de Acceso
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={14} className="text-zinc-600" />
                  </div>
                  <input
                    id="token"
                    type={showToken ? 'text' : 'password'}
                    placeholder="Ingresá tu token"
                    className="input-dark pl-9 pr-10"
                    autoComplete="current-password"
                    {...register('token', {
                      required: 'El token es requerido',
                      minLength: {
                        value: 6,
                        message: 'El token debe tener al menos 6 caracteres',
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-600 hover:text-zinc-400 transition-colors"
                    aria-label={showToken ? 'Ocultar token' : 'Mostrar token'}
                  >
                    {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.token && (
                  <p className="mt-1.5 text-xs text-red-400" role="alert">
                    {errors.token.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold py-3 tracking-wider uppercase transition-all duration-200 hover:bg-zinc-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                style={{ minHeight: '46px' }}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-4 w-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
                ) : (
                  <>
                    Ingresar
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            <div className="h-px w-full bg-zinc-800 mt-8" />
          </div>

          {/* Demo credentials */}
          <div className="mt-4 bg-zinc-950 border border-zinc-800 border-dashed p-5">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-600 uppercase mb-3">
              Credenciales de Demo
            </p>
            {demoCredentials.map((cred) => (
              <div
                key={`cred-${cred.label}`}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-xs text-zinc-600">{cred.label}</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-[#d4af37] font-mono bg-zinc-900 px-2 py-1">
                    {cred.value}
                  </code>
                  <CopyButton value={cred.value} />
                  <button
                    type="button"
                    onClick={() => setValue('token', cred.value)}
                    className="text-[10px] text-zinc-600 hover:text-zinc-300 transition-colors tracking-wider uppercase border border-zinc-800 hover:border-zinc-600 px-2 py-1"
                  >
                    Usar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}