import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    const adminSecret = process.env.ADMIN_SECRET || 'serbero-admin-2026';

    if (!token) {
      return NextResponse.json({ error: 'Token requerido' }, { status: 400 });
    }

    if (token !== adminSecret) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    return NextResponse.json({ success: true, token });
  } catch {
    return NextResponse.json({ error: 'Error de autenticación' }, { status: 500 });
  }
}