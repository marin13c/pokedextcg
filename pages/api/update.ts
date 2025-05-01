import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

// Define el tipo de los objetos de tus Pokémon
interface Pokemon {
  Nombre: string;
  Nº: number;
  Obtenido: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obtén el nombre del Pokémon desde el cuerpo de la solicitud
  const { Nombre } = req.body;

  // Lee el archivo Excel
  const file = fs.readFileSync(path.resolve('./public', 'pokemons.xlsx'));
  const workbook = xlsx.read(file, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convierte la hoja de Excel a un array de objetos tipados como Pokemon
  const data: Pokemon[] = xlsx.utils.sheet_to_json(sheet);

  // Busca el índice del Pokémon en el array de datos
  const index = data.findIndex((p) => p.Nombre === Nombre);
  if (index === -1) return res.status(404).json({ success: false });

  // Marca el Pokémon como obtenido
  data[index].Obtenido = 1;

  // Guarda los cambios en el archivo Excel
  const newSheet = xlsx.utils.json_to_sheet(data);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  const updatedFile = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  fs.writeFileSync(path.resolve('./public', 'pokemons.xlsx'), updatedFile);

  // Responde con éxito
  res.status(200).json({ success: true });
}
