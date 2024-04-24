const getAllPokemon = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=700');
  return response.json();
};

export { getAllPokemon };