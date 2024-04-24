import type { ReactElement } from 'react'
import { Opponent } from 'components/Opponent'
import { Player } from 'components/Player'
import { useEffect, useRef, useState } from 'react'
import { PokemonBattle } from 'components/PokemonBattle'
import { useQuery } from '@tanstack/react-query'
import { getAllPokemon } from 'api/getAllPokemon'
import { getAllTestPokemon } from 'api/getAllTestPokemon'
import { getRandomPokemonMoves } from 'api/getRandomPokemonMoves'
import { type TPlayerActivePokemon, type TOpponentActivePokemon } from 'types'
import { getPokemon } from 'api/getPokemon'

const getRandomPokemon = (data: any) => {
	const randomIndex = Math.floor(Math.random() * data.length)
	return data[randomIndex]
}

export default function App(): ReactElement {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [input, setInput] = useState('')
	const [pokemonTeam, setPokemonTeam] = useState<any>([]) // TODO: add type
	const [opponentPokemonTeam, setOpponentPokemonTeam] = useState<any>([]) // TODO: add type
	const { data, isLoading, error } = useQuery({
		queryKey: ['pokemon'],
		queryFn: getAllPokemon
	})
	
	// @ts-ignore
	const filteredData = data && data?.results.filter((pokemon: any) => {
		if (input !== '') {
			return pokemon.name.includes(input)
		}
	})
	const [opponentActive, setOpponentActive] = useState<TOpponentActivePokemon>({
		name: opponentPokemonTeam[0]?.name,
		maxHp: opponentPokemonTeam[0]?.maxHp,
		hp: opponentPokemonTeam[0]?.hp,
		image: opponentPokemonTeam[0]?.image,
		attack: opponentPokemonTeam[0]?.attack,
		defense: opponentPokemonTeam[0]?.defense,
		speed: opponentPokemonTeam[0]?.speed,
		moves: []
	})
	const [playerActive, setPlayerActive] = useState<TPlayerActivePokemon>({
		name: pokemonTeam[0]?.name,
		maxHp: pokemonTeam[0]?.maxHp,
		hp: pokemonTeam[0]?.hp,
		image: pokemonTeam[0]?.image,
		attack: pokemonTeam[0]?.attack,
		defense: pokemonTeam[0]?.defense,
		speed: pokemonTeam[0]?.speed,
		moves: []
	})

	const handlePlayerMove = (playerMove: { name: string; dmg: number }) => {
		let dmg = playerMove.dmg
		if (playerMove.dmg > opponentActive.hp) {
			dmg = opponentActive.hp
		}
		if (opponentActive.hp <= 0) {
			return
		}
		setOpponentActive(prev => {
			return {
				...prev,
				hp: prev.hp - dmg
			}
		})
	}

	const handleOpponentMove = (playerMove: { name: string; dmg: number }) => {
		let dmg = playerMove.dmg
		if (playerMove.dmg > playerActive.hp) {
			dmg = playerActive.hp
		}
		if (playerActive.hp <= 0) {
			return
		}
		setPlayerActive(prev => {
			return {
				...prev,
				hp: prev.hp - dmg
			}
		})
	}

	const handleOpponentRemove = () => {
		setOpponentActive({
			name: opponentPokemonTeam[1]?.name,
			maxHp: opponentPokemonTeam[1]?.maxHp,
			hp: opponentPokemonTeam[1]?.hp,
			image: opponentPokemonTeam[1]?.image,
			attack: opponentPokemonTeam[1]?.attack,
			defense: opponentPokemonTeam[1]?.defense,
			speed: opponentPokemonTeam[1]?.speed,
			moves: opponentPokemonTeam[1]?.moves
		})
		setOpponentPokemonTeam([...opponentPokemonTeam.slice(1)])
	}
	const handlePlayerRemove = () => {
		setPokemonTeam([...pokemonTeam.slice(1)]);
	}
	useEffect(() => {
		if (isLoading) return
		if (error) return
		(async () => {
			let pokemon1 = getRandomPokemon(data.results)
			const pokemon1Moves = await getRandomPokemonMoves(pokemon1.name)
			pokemon1 = await getPokemon(pokemon1.name)
			let pokemon2 = getRandomPokemon(data.results)
			const pokemon2Moves = await getRandomPokemonMoves(pokemon2.name)
			pokemon2 = await getPokemon(pokemon2.name)
			let pokemon3 = getRandomPokemon(data.results)
			const pokemon3Moves = await getRandomPokemonMoves(pokemon3.name)
			pokemon3 = await getPokemon(pokemon3.name)
			let pokemon4 = getRandomPokemon(data.results)
			const pokemon4Moves = await getRandomPokemonMoves(pokemon4.name)
			pokemon4 = await getPokemon(pokemon4.name)
			setOpponentPokemonTeam([
				{
					name: pokemon1.name,
					maxHp: pokemon1.stats[0].base_stat,
					hp: pokemon1.stats[0].base_stat,
					image: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon1.name}.gif`,
					attack: pokemon1.stats[1].base_stat,
					defense: pokemon1.stats[2].base_stat,
					speed: pokemon1.stats[5].base_stat,
					moves: pokemon1Moves
				},
				{
					name: pokemon2.name,
					maxHp: pokemon2.stats[0].base_stat,
					hp: pokemon2.stats[0].base_stat,
					image: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon2.name}.gif`,
					attack: pokemon2.stats[1].base_stat,
					defense: pokemon2.stats[2].base_stat,
					speed: pokemon2.stats[5].base_stat,
					moves: pokemon2Moves
				},
				{
					name: pokemon3.name,
					maxHp: pokemon3.stats[0].base_stat,
					hp: pokemon3.stats[0].base_stat,
					image: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon3.name}.gif`,
					attack: pokemon3.stats[1].base_stat,
					defense: pokemon3.stats[2].base_stat,
					speed: pokemon3.stats[5].base_stat,
					moves: pokemon3Moves
				},
				{
					name: pokemon4.name,
					maxHp: pokemon4.stats[0].base_stat,
					hp: pokemon4.stats[0].base_stat,
					image: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon4.name}.gif`,
					attack: pokemon4.stats[1].base_stat,
					defense: pokemon4.stats[2].base_stat,
					speed: pokemon4.stats[5].base_stat,
					moves: pokemon4Moves
				}
			])
			setOpponentActive({
				name: pokemon1.name,
				maxHp: pokemon1.stats[0].base_stat,
				hp: pokemon1.stats[0].base_stat,
				image: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon1.name}.gif`,
				attack: pokemon1.stats[1].base_stat,
				defense: pokemon1.stats[2].base_stat,
				speed: pokemon1.stats[5].base_stat,
				moves: pokemon1Moves
			})
		})()
	}, [data, ])

	return (
		<div className='flex flex-col'>
			<div className='container m-auto flex flex-col items-center justify-center'>
				<h1>Pokémon Search</h1>
				<p>
					Search for Pokémon to see their sprites, moves, and their base stats
				</p>
				<div className='flex'>
					<div className='relative inline-block'>
						<input
							type='text'
							placeholder='Enter a Pokémon name'
							onChange={e => setInput(e.target.value)}
							value={input}
							autoComplete='off'
							className='h-10 w-96 rounded-md border-2 border-black p-2 text-black'
						/>
						<div className='absolute left-[-75px] z-50 w-[500px] rounded-sm border border-b-0 border-t-0 bg-black'>
							{filteredData?.map((pokemon: any) => (
								<button
									key={pokemon.name}
									className='flex w-full justify-between border-b border-black p-2'
									onClick={async () => {
										let moves = (await getRandomPokemonMoves(
											pokemon.name
										)) as any
										console.log(moves)
										pokemon = await getPokemon(pokemon.name)
										if (pokemonTeam?.length == 4) {
											alert('You can only have 4 pokemon in your team')
											return
										}
										// @ts-ignore
										if (pokemonTeam?.some(curr => curr.name === pokemon.name)) {
											alert('You already have this pokemon in your team')
											return
										}
										if (pokemonTeam.length == 0) {
											setPlayerActive({
												name: pokemon.name,
												maxHp: pokemon.stats[0].base_stat,
												hp: pokemon.stats[0].base_stat,
												image: `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pokemon.name}.gif`,
												attack: pokemon.stats[1].base_stat,
												defense: pokemon.stats[2].base_stat,
												speed: pokemon.stats[5].base_stat,
												moves: moves
											})
										}
										setPokemonTeam([
											...pokemonTeam,
											{
												name: pokemon.name,
												maxHp: pokemon.stats[0].base_stat,
												hp: pokemon.stats[0].base_stat,
												image: `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pokemon.name}.gif`,
												attack: pokemon.stats[1].base_stat,
												defense: pokemon.stats[2].base_stat,
												speed: pokemon.stats[5].base_stat,
												moves: moves
											}
										])
									}}
								>
									<div className='flex space-x-4'>
										<p>{pokemon.name}</p>
										{/* <p>hp: {pokemon.stats[0].base_stat}</p> */}
										{/* <p>speed: {pokemon.stats[5].base_stat}</p> */}
									</div>
									<div>
										<img
											src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`}
											alt={pokemon.name}
											className='h-10 w-10'
										/>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='flex'>
				<div className='flex w-[500px] flex-col'>
					<h1 className='text-center text-2xl font-bold'>Opponent</h1>
					<div className='flex p-2'>
						{isLoading ? (
							<div>Loading...</div>
						) : error ? (
							<div>Error: {error.message}</div>
						) : (
							<div className='flex w-full flex-col space-y-8'>
								{opponentPokemonTeam?.map((pokemon: any, _index: number) => (
									<div
										className='flex flex-col space-y-2 border text-sm'
										key={_index}
									>
										<div className='flex items-center justify-center '>
											<img className='h-24 w-24' src={pokemon?.image} />
											<div className='p-4' key={pokemon.name}>
												<p>name: {pokemon.name}</p>
												<p>hp: {pokemon.hp}</p>
												<p>speed: {pokemon.speed}</p>
											</div>
										</div>
										<div className='grid grid-cols-2 gap-2'>
											{pokemon.moves.map((move: any, _index: number) => (
												<div key={_index} className='border p-2'>
													<p>{move.name}</p>
													<p>dmg: {move.dmg}</p>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div>
					<PokemonBattle
						opponent={opponentActive}
						player={playerActive}
						handlePlayerMove={handlePlayerMove}
						handleOpponentMove={handleOpponentMove}
						handleOpponentPokemonRemove={handleOpponentRemove}
						handlePlayerPokemonRemove={handlePlayerRemove}
					/>
					<div className='relative'>
						<canvas
							id='canvas'
							width='700'
							height='700'
							className='absolute z-[-10] bg-neutral-600'
						></canvas>
						<h1 className='z-10 text-center text-white'>game tree here</h1>
					</div>
				</div>
				<div className='flex w-[500px] flex-col'>
					<h1 className='text-center text-2xl font-bold'>Player</h1>
					<div className='flex p-2'>
						{isLoading ? (
							<div>Loading...</div>
						) : error ? (
							<div>Error: {error.message}</div>
						) : (
							<div className='flex w-full flex-col space-y-8'>
								{pokemonTeam?.map((pokemon: any) => (
									<div
										key={pokemon.name}
										className='flex flex-col space-y-2 border text-sm '
									>
										<div className='flex items-center justify-center'>
											<img
												className='h-24 w-24'
												// adding image url here cause this is the normal view
												src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`}
											/>
											<div className='p-4' key={pokemon.name}>
												<p>name: {pokemon.name}</p>
												<p>hp: {pokemon.hp}</p>
												<p>speed: {pokemon.speed}</p>
											</div>
										</div>
										<div className='grid grid-cols-2 gap-2'>
											{pokemon.moves.map((move: any) => (
												<div key={move.name} className='border p-2'>
													<p>{move.name}</p>
													<p>dmg: {move.dmg}</p>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
