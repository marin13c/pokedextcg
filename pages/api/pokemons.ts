// pages/api/pokemons.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Pokemon {
  Nº: number;
  Nombre: string;
  Obtenido: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'public', 'pokemons.json');

  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    const data: Pokemon[] = JSON.parse(file);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    res.status(500).json({ success: false });
  }
}
