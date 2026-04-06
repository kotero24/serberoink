import { NextResponse } from 'next/server';
import { getContent } from '@/lib/content';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Error al leer contenido' }, { status: 500 });
  }
}