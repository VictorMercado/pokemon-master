

export async function getRandomPokemonMoves(pokemon: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  let randomMoves = [
    data.moves[Math.floor(Math.random() * data.moves.length)], 
    data.moves[Math.floor(Math.random() * data.moves.length)], 
    data.moves[Math.floor(Math.random() * data.moves.length)], 
    data.moves[Math.floor(Math.random() * data.moves.length)]
  ];

  let moves = randomMoves.map(async (move: any) => {
    const response = await fetch(move.move.url);
    console.log("getting moves");
    
    const data = await response.json();
    return {
      name: move.move.name,
      type: data.type.name,
      power: data.power ? data.power : 0
    }
  });
  return await Promise.all(moves);
}