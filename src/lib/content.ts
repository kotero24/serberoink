import fs from 'fs';
import path from 'path';

export interface Tattoo {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  enOferta: boolean;
}

export interface Contacto {
  telefono: string;
  whatsapp: string;
  instagram: string;
  direccion: string;
}

export interface ContentData {
  tatuajes: Tattoo[];
  contacto: Contacto;
}

// Backend integration point: replace with GitHub API fetch in production
export async function getContent(): Promise<ContentData> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as ContentData;
  } catch {
    return {
      tatuajes: [],
      contacto: {
        telefono: '',
        whatsapp: '',
        instagram: '',
        direccion: '',
      },
    };
  }
}