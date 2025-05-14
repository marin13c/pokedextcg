//update

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
    fetch("http://192.168.100.12:3000/pokemon")
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

  // Función para actualizar el campo "Obtenido" en el JSON local
const updatePokemonInLocalFile = async (updatedPokemons: any[]) => {
  try {
    const response = await fetch("/api/updatePokemon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pokemons: updatedPokemons }),
    });


  } catch (error) {
    console.error("Error al actualizar localmente:", error);
    toast.error("Error al actualizar el archivo.");
  }
};

  // Marcar como obtenido
const markAsObtained = async () => {
  const numero = selected.Numero;
  const estado = 1;

  try {
    // Llamar al backend externo
    await fetch(`http://192.168.100.12:3000/pokemon/${numero}/estado/${estado}`, {
      method: "PUT",
    });

    // Actualizar localmente
    const updatedPokemons = pokemons.map((p) =>
      p.Nombre === selected.Nombre ? { ...p, Obtenido: 1 } : p
    );
    setPokemons(updatedPokemons);
    setSelected({ ...selected, Obtenido: 1 });
    toast.success(`¡${selected.Nombre} marcado como obtenido!`);
    await updatePokemonInLocalFile(updatedPokemons);
  } catch (error) {
    console.error("Error al actualizar en el backend:", error);
    toast.error("Error al marcar como obtenido.");
  }
};


  // Desmarcar como obtenido
const unmarkAsObtained = async () => {
  const numero = selected.Numero;
  const estado = 0;

  try {
    // Llamar al backend externo
    await fetch(`http://192.168.100.12:3000/pokemon/${numero}/estado/${estado}`, {
      method: "PUT",
    });

    // Actualizar localmente
    const updatedPokemons = pokemons.map((p) =>
      p.Nombre === selected.Nombre ? { ...p, Obtenido: 0 } : p
    );
    setPokemons(updatedPokemons);
    setSelected({ ...selected, Obtenido: 0 });
    toast.success(`¡${selected.Nombre} desmarcado como obtenido!`);
    await updatePokemonInLocalFile(updatedPokemons);
  } catch (error) {
    console.error("Error al actualizar en el backend:", error);
    toast.error("Error al desmarcar como obtenido.");
  }
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
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.Numero}.png`}
            alt={selected.Nombre}
            className="w-24 h-24"
          />
          <div>
            <p><strong>N°:</strong> {selected.Numero}</p>
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
