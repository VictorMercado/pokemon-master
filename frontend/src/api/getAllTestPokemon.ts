const getAllTestPokemon = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        results: [
          {
            name: 'bulbasaur',
            image: 'http://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif',
            stats: [
              { base_stat: 45 },
              { base_stat: 45 },
              { base_stat: 49 },
              { base_stat: 65 },
              { base_stat: 65 },
              { base_stat: 45 },

            ],
            moves: [
              { name: 'Tackle', dmg: 20 },
              { name: 'Vine Whip', dmg: 35 },
              { name: 'Razor Leaf', dmg: 55 },
              { name: 'Seed Bomb', dmg: 40 }
            ]
          },
          {
            name: 'charmander',
            image: 'http://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif',
            stats: [
              { base_stat: 45 },
              { base_stat: 45 },
              { base_stat: 49 },
              { base_stat: 65 },
              { base_stat: 65 },
              { base_stat: 45 }
            ],
            moves: [
              { name: 'Tackle', dmg: 20 },
              { name: 'Ember', dmg: 40 },
              { name: 'Flamethrower', dmg: 90 },
              { name: 'Fire Blast', dmg: 110 }
            ]
          },
          {
            name: 'squirtle',
            image: 'http://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif',
            stats: [
              { base_stat: 45 },
              { base_stat: 45 },
              { base_stat: 49 },
              { base_stat: 65 },
              { base_stat: 65 },
              { base_stat: 45 }
            ],
            moves: [
              { name: 'Tackle', dmg: 20 },
              { name: 'Water Gun', dmg: 40 },
              { name: 'Water Pulse', dmg: 60 },
              { name: 'Hydro Pump', dmg: 110 }
            ]
          },
          {
            name: 'pikachu',
            image: 'http://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif',
            stats: [
              { base_stat: 45 },
              { base_stat: 45 },
              { base_stat: 49 },
              { base_stat: 65 },
              { base_stat: 65 },
              { base_stat: 45 }
            ],
            moves: [
              { name: 'Tackle', dmg: 20 },
              { name: 'Thunder Shock', dmg: 40 },
              { name: 'Thunderbolt', dmg: 90 },
              { name: 'Thunder', dmg: 110 }
            ]
          }
        ]
      });
    }, 1000);  
  });
};

export { getAllTestPokemon };