import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PokemonSearch({
  pokemons,
  setPokemons,
}: {
  pokemons: any[];
  setPokemons: (data: any[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    // Cargar el JSON desde la carpeta public
   fetch("https://marin13c.github.io/pokedextcg/pokemons.json") 
      .then((response) => response.json())
      .then((data) => setPokemons(data))
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, []);

  const filtered = pokemons.filter((p) =>
    p.Nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (name: string) => {
    const p = pokemons.find((p) => p.Nombre.toLowerCase() === name.toLowerCase());
    setSelected(p);
  };

  const markAsObtained = async () => {
    const updatedPokemons = pokemons.map((p) =>
      p.Nombre === selected.Nombre ? { ...p, Obtenido: 1 } : p
    );
    setPokemons(updatedPokemons);
    setSelected({ ...selected, Obtenido: 1 });
    toast.success(`¡${selected.Nombre} marcado como obtenido!`);
  };

  const unmarkAsObtained = async () => {
    const updatedPokemons = pokemons.map((p) =>
      p.Nombre === selected.Nombre ? { ...p, Obtenido: 0 } : p
    );
    setPokemons(updatedPokemons);
    setSelected({ ...selected, Obtenido: 0 });
    toast.success(`¡${selected.Nombre} desmarcado como obtenido!`);
  };

  return (
    <div>
      <input
        type="text"
        className="border px-2 py-1 w-full mb-2"
        placeholder="Busca un Pokémon"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSelect(e.target.value);
        }}
        list="pokemon-list"
      />
      <datalist id="pokemon-list">
        {filtered.map((p, i) => (
          <option key={i} value={p.Nombre} />
        ))}
      </datalist>

      {selected && (
        <div className="mt-4 p-4 border rounded bg-gray-50 flex items-center gap-4">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.Nº}.png`}
            alt={selected.Nombre}
            className="w-24 h-24"
          />
          <div>
            <p><strong>N°:</strong> {selected.Nº}</p>
            <p><strong>Nombre:</strong> {selected.Nombre}</p>
            <p><strong>Obtenido:</strong> {selected.Obtenido ? "Sí" : "No"}</p>
            {!selected.Obtenido ? (
              <button
                onClick={markAsObtained}
                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
              >
                Marcar como obtenido
              </button>
            ) : (
              <button
                onClick={unmarkAsObtained}
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
              >
                Desmarcar como obtenido
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
