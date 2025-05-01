// pages/api/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Pokemon {
  Nº: number;
  Nombre: string;
  Obtenido: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { Nombre } = req.body;
  const filePath = path.join(process.cwd(), 'public', 'pokemons.json');

  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    const data: Pokemon[] = JSON.parse(file);

    const index = data.findIndex((p) => p.Nombre === Nombre);
    if (index === -1) return res.status(404).json({ success: false });

    // Alterna el estado de "Obtenido"
    data[index].Obtenido = data[index].Obtenido === 1 ? 0 : 1;

    // Guarda los cambios en el archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al actualizar el archivo JSON:", error);
    res.status(500).json({ success: false });
  }
}
