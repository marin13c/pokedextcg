// pages/api/updatePokemon.ts
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const pokemons = req.body.pokemons;
  const filePath = path.join(process.cwd(), "public", "pokemons.json");

  try {
    fs.writeFileSync(filePath, JSON.stringify(pokemons, null, 2), "utf8");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al escribir el archivo:", error);
    res.status(500).json({ error: "Error al actualizar el archivo" });
  }
}
