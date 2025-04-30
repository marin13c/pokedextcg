import { readFile } from "fs/promises";
import * as xlsx from "xlsx";

export default async function handler(req, res) {
  const file = await readFile("public/pokemons.xlsx");
  const workbook = xlsx.read(file, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  res.status(200).json(data);
}