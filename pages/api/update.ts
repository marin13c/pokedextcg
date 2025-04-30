import { readFile, writeFile } from "fs/promises";
import * as xlsx from "xlsx";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { Nombre } = req.body;
  const file = await readFile("public/pokemons.xlsx");
  const workbook = xlsx.read(file, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  const index = data.findIndex((p) => p.Nombre === Nombre);
  if (index === -1) return res.status(404).json({ success: false });

  data[index].Obtenido = 1;
  const updatedSheet = xlsx.utils.json_to_sheet(data);
  workbook.Sheets[workbook.SheetNames[0]] = updatedSheet;
  const updatedBuffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  await writeFile("public/pokemons.xlsx", updatedBuffer);
  res.status(200).json({ success: true });
}