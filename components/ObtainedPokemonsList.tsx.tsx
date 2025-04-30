interface ObtainedPokemonsListProps {
  nombresObtenidos: string[];
  pokemons: any[];
}

export default function ObtainedPokemonsList({
  nombresObtenidos,
  pokemons,
}: ObtainedPokemonsListProps) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {nombresObtenidos.map((nombre, index) => {
        // Encontramos el Pokémon por nombre
        const pokemon = pokemons.find((p) => p.Nombre === nombre);
        if (!pokemon) return null;

        // URL de la imagen (puedes ajustar según tu fuente de imágenes)
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.Nº}.png`;

        return (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden text-center p-4"
          >
            <img
              src={imageUrl}
              alt={pokemon.Nombre}
              className="w-24 h-24 mx-auto mb-2"
            />
            <p className="font-semibold">{pokemon.Nº}</p>
            <p>{pokemon.Nombre}</p>
          </div>
        );
      })}
    </div>
  );
}
