import type { ReactElement } from 'react'
import { useEffect, useRef, useState } from 'react'
import { PokemonBattle } from 'components/PokemonBattle'
import { useQuery } from '@tanstack/react-query'
import { getAllPokemon } from 'api/getAllPokemon'
import { getAllTestPokemon } from 'api/getAllTestPokemon'
import { getRandomPokemonMoves } from 'api/getRandomPokemonMoves'
import { type TPokemon } from 'types'
import { getPokemon } from 'api/getPokemon'

const getRandomPokemon = (data: any) => {
	const randomIndex = Math.floor(Math.random() * data.length)
	return data[randomIndex]
}

const getScaledHp = (hp: number) => {
	return ((2*hp) + 100)
}

export default function App(): ReactElement {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [playerSwitch, setPlayerSwitch] = useState(false)
	const [input, setInput] = useState('')

	const { data, isLoading, error } = useQuery({
		queryKey: ['pokemon'],
		queryFn: getAllPokemon
	})

	const [gameState, setGameState] = useState({
		player: {
			active_pokemon_index: 0,
			fainted_pokemons: [] as number[],
			pokemon_team: [] as TPokemon[]
		},
		ai: {
			active_pokemon_index: 0,
			fainted_pokemons: [] as number[],
			pokemon_team: [] as TPokemon[]
		},
		turn_order: 'player',
		winner: ''
	})

	// @ts-ignore
	const filteredData =
		data &&
		data?.results.filter((pokemon: any) => {
			if (input !== '') {
				return pokemon.name.includes(input)
			}
		})
	const getLivePokemon = (whichPlayer: string) => {
		// @ts-ignore
		return gameState[whichPlayer].pokemon_team.filter(
			(pokemon: TPokemon) => pokemon.current_hp > 0
		)
	}
	const handleOpponentSwitch = (switchPokemonIndex : number) => {
		setGameState(prev => {
			return {
				...prev,
				ai: {
					...prev.ai,
					active_pokemon_index: switchPokemonIndex
				},
				turn_order: 'player'
			}
		})
	}


	const handlePlayerMove = (playerMove: { name: string; type: string; power: number }) => {
		let opponentActive = gameState.ai.pokemon_team[gameState.ai.active_pokemon_index]
		let dmg = playerMove.power
		if (playerMove.power > opponentActive.current_hp) {
			dmg = opponentActive.current_hp
		}
		if (opponentActive.current_hp <= 0) {
			return
		}
		setGameState(prev => {
			return {
				...prev,
				ai: {
					...prev.ai,
					pokemon_team: prev.ai.pokemon_team.map((pokemon, index) => {
						if (index === prev.ai.active_pokemon_index) {
							return {
								...pokemon,
								current_hp: pokemon.current_hp - dmg
							}
						}
						return pokemon
					})
				},
				turn_order: 'ai'
			}
		})
	}

	const handleOpponentMove = (playerMove: { name: string; type: string; power: number }) => {
		let playerActive = gameState.player.pokemon_team[gameState.player.active_pokemon_index]
		let dmg = playerMove.power
		if (playerMove.power > playerActive.current_hp) {
			dmg = playerActive.current_hp
		}
		if (playerActive.current_hp <= 0) {
			return
		}
		setGameState(prev => {
			return {
				...prev,
				player: {
					...prev.player,
					pokemon_team: prev.player.pokemon_team.map((pokemon, index) => {
						if (index === prev.player.active_pokemon_index) {
							return {
								...pokemon,
								current_hp: pokemon.current_hp - dmg
							}
						}
						return pokemon
					})
				},
				turn_order: 'player'
			}
		})
	}

	const handleOpponentRemove = () => {
		setGameState({
			...gameState,
			ai: {
				...gameState.ai,
				fainted_pokemons: [
					...gameState.ai.fainted_pokemons,
					gameState.ai.active_pokemon_index
				],
				active_pokemon_index: getLivePokemon('ai').length > 0 ? gameState.ai.pokemon_team.indexOf(getLivePokemon('ai')[0]) : 0
			}
		})
	}
	const handlePlayerRemove = () => {
		setGameState({
			...gameState,
			player: {
				...gameState.player,
				fainted_pokemons: [
					...gameState.player.fainted_pokemons,
					gameState.player.active_pokemon_index
				],
				active_pokemon_index: getLivePokemon('player').length > 0 ? gameState.player.pokemon_team.indexOf(getLivePokemon('player')[0]) : 0
			}
		})
	}
	useEffect(() => {
		if (isLoading) return
		if (error) return
		;(async () => {
			let pokemon1 = getRandomPokemon(data.results)
			const pokemon1Moves = await getRandomPokemonMoves(pokemon1.name)
			pokemon1 = await getPokemon(pokemon1.name)
			let pokemon2 = getRandomPokemon(data.results)
			const pokemon2Moves = await getRandomPokemonMoves(pokemon2.name)
			pokemon2 = await getPokemon(pokemon2.name)
			let pokemon3 = getRandomPokemon(data.results)
			const pokemon3Moves = await getRandomPokemonMoves(pokemon3.name)
			pokemon3 = await getPokemon(pokemon3.name)
			// let pokemon4 = getRandomPokemon(data.results)
			// const pokemon4Moves = await getRandomPokemonMoves(pokemon4.name)
			// pokemon4 = await getPokemon(pokemon4.name)

			setGameState(prev => ({
				...prev,
				ai: {
					active_pokemon_index: 0,
					fainted_pokemons: [],
					pokemon_team: [
						{
							image: `https://img.pokemondb.net/sprites/black-white/anim/${Math.random() < 0.03 ? 'shiny' : 'normal'}/${pokemon1.name}.gif`,
							species: pokemon1.name,
							current_hp: getScaledHp(pokemon1.stats[0].base_stat),
							base_stats: {
								hp: getScaledHp(pokemon1.stats[0].base_stat),
								speed: pokemon1.stats[5].base_stat,
								moves: pokemon1Moves
							}
						},
						{
							image: `https://img.pokemondb.net/sprites/black-white/anim/${Math.random() < 0.03 ? 'shiny' : 'normal'}/${pokemon2.name}.gif`,
							species: pokemon2.name,
							current_hp: getScaledHp(pokemon2.stats[0].base_stat),
							base_stats: {
								hp: getScaledHp(pokemon2.stats[0].base_stat),
								speed: pokemon2.stats[5].base_stat,
								moves: pokemon2Moves
							}
						},
						{
							image: `https://img.pokemondb.net/sprites/black-white/anim/${Math.random() < 0.03 ? 'shiny' : 'normal'}/${pokemon3.name}.gif`,
							species: pokemon3.name,
							current_hp: getScaledHp(pokemon3.stats[0].base_stat),
							base_stats: {
								hp: getScaledHp(pokemon3.stats[0].base_stat),
								speed: pokemon3.stats[5].base_stat,
								moves: pokemon3Moves
							}
						}
					]
				}
			}))
		})()
	}, [data])

	// useEffect(() => {
	// 	if (!canvasRef.current) return
	// 	let scale = 1.0
	// 	const canvas = canvasRef.current

	// 	const ctx = canvas.getContext('2d')

	// 	function renderNode(node, x, y, xOffset) {
	// 		if (!ctx) return
	// 		ctx.beginPath()
	// 		ctx.arc(x, y, 20 * scale, 0, Math.PI * 2)
	// 		ctx.fillStyle = 'lightblue'
	// 		ctx.fill()
	// 		ctx.strokeStyle = 'black'
	// 		ctx.stroke()
	// 		ctx.fillStyle = 'black'
	// 		ctx.textAlign = 'center'
	// 		ctx.font = 20 * scale + 'px Arial'
	// 		ctx.fillText(node.value, x, y + 5)

	// 		node.children.forEach((child, index) => {
	// 			const angle = Math.PI / 4 // Angle between each child
	// 			const childX = x + xOffset * Math.cos(angle * (index - 2))
	// 			const childY = y + 50 // Adjust the distance between levels

	// 			// ctx.beginPath()
	// 			// ctx.moveTo(x, y + 20)
	// 			// ctx.lineTo(childX, childY - 20)
	// 			// ctx.stroke()

	// 			renderNode(child, childX, childY, xOffset)
	// 		})
	// 	}

	// 	function renderTree(rootNode, canvasWidth) {
	// 		const rootX = canvasWidth / 2
	// 		const rootY = 50
	// 		const xOffset = 200 // Initial offset for root node

	// 		renderNode(rootNode, rootX, rootY, xOffset)
	// 	}

	// 	// Define tree structure
	// 	const rootNode = {
	// 		value: 'Root',
	// 		children: [
	// 			{ value: 'Child 1', children: [] },
	// 			{ value: 'Child 2', children: [] },
	// 			{ value: 'Child 3', children: [] },
	// 			{ value: 'Child 4', children: [] },
	// 			{
	// 				value: 'Child 5',
	// 				children: [
	// 					{ value: 'SubChild 5.1', children: [] },
	// 					{ value: 'SubChild 5.2', children: [] },
	// 					{ value: 'SubChild 5.3', children: [] },
	// 					{ value: 'SubChild 5.4', children: [] },
	// 					{ value: 'SubChild 5.5', children: [] }
	// 				]
	// 			}
	// 		]
	// 	}

	// 	// Render the tree
	// 	renderTree(rootNode, canvas.width)
	// 	canvas.addEventListener('mouseover', (event) => {
	// 		console.log('mouseover event')

	// 		document.addEventListener(
	// 			'wheel',
	// 			event => {
	// 				// event.preventDefault()
	// 				console.log('wheel event')

	// 				const delta = event.deltaY / 100
	// 				scale += delta

	// 				// Limit scale within certain bounds
	// 				// if (scale < 0.5) scale = 0.5
	// 				// if (scale > 2.0) scale = 2.0
	// 				ctx?.reset()
	// 				renderTree(rootNode, canvas.width + scale * 100)
	// 			},
	// 			{ passive: true }
	// 		)
	// 	})
	// 	canvas.addEventListener('mouseout', () => {
	// 		console.log('mouseout event')
	// 		document.removeEventListener('wheel', () => {})
	// 	})
	// 	return () => {
	// 		canvas.removeEventListener('mouseover', () => {})
	// 		document.removeEventListener('wheel', () => {})
	// 	}
	// }, [canvasRef.current])

	return (
		<div className='flex flex-col'>
			<div className='container m-auto flex flex-col items-center justify-center'>
				<h1>Pokémon Search</h1>
				<p>
					Search for Pokémon to see their sprites, moves, and their base stats
				</p>
				<div className='flex justify-center'>
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
										if (gameState.player.pokemon_team?.length == 3) {
											alert('You can only have 3 pokemon in your team')
											return
										}
										// @ts-ignore
										if (
											gameState.player.pokemon_team?.some(
												curr => curr.species === pokemon.name
											)
										) {
											alert('You already have this pokemon in your team')
											return
										}
										if (gameState.player.pokemon_team.length == 0) {
											setGameState({
												...gameState,
												player: {
													...gameState.player,
													active_pokemon_index: 0
												}
											})
										}
										setGameState({
											...gameState,
											player: {
												...gameState.player,
												pokemon_team: [
													...gameState.player.pokemon_team,
													{
														altImage: `https://img.pokemondb.net/sprites/black-white/anim/${Math.random() < 0.03 ? 'shiny' : 'normal'}/${pokemon.name}.gif`,
														image: `https://img.pokemondb.net/sprites/black-white/anim/${Math.random() < 0.03 ? 'back-shiny' : 'back-normal'}/${pokemon.name}.gif`,
														species: pokemon.name,
														current_hp: getScaledHp(pokemon.stats[0].base_stat),
														base_stats: {
															hp: getScaledHp(pokemon.stats[0].base_stat),
															speed: pokemon.stats[5].base_stat,
															moves: moves
														}
													}
												]
											}
										})
									}}
								>
									<div className='flex space-x-4'>
										<p>{pokemon.name}</p>
										{/* <p>hp: {pokemon.stats[0].base_stat}</p> */}
										{/* <p>speed: {pokemon.stats[5].base_stat}</p> */}
									</div>
									<div>
										<img
											src={`https://img.pokemondb.net/sprites/black-white/anim/${Math.random() < 0.03 ? 'shiny' : 'normal'}/${pokemon.name}.gif`}
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
			<div className='flex justify-center'>
				<div className='flex w-[500px] flex-col'>
					<h1 className='text-center text-2xl font-bold'>Opponent</h1>
					<div className='flex p-2'>
						{isLoading ? (
							<div>Loading...</div>
						) : error ? (
							<div>Error: {error.message}</div>
						) : (
							<div className='flex w-full flex-col space-y-8'>
								{getLivePokemon('ai').map((pokemon : any, _index: number) => (
									<div
										className='flex flex-col space-y-2 border text-sm'
										key={_index}
									>
										<div className='flex items-center justify-center '>
											<img className='h-24 w-24' src={pokemon?.image} />
											<div className='p-4' key={pokemon.species}>
												<p>name: {pokemon.species}</p>
												<p>hp: {pokemon.base_stats.hp}</p>
												<p>speed: {pokemon.base_stats.speed}</p>
											</div>
										</div>
										<div className='grid grid-cols-2 gap-2'>
											{pokemon.base_stats.moves.map(
												(move: any, _index: number) => (
													<div key={_index} className='border p-2'>
														<p>{move.name}</p>
														<p>dmg: {move.power}</p>
													</div>
												)
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div>
					<div className="mt-4 flex justify-center">it is {gameState.turn_order}s turn</div>
					<PokemonBattle
						gameState={gameState}
						opponent={
							gameState.winner === "" ? gameState.ai.pokemon_team[gameState.ai.active_pokemon_index] : undefined
						}
						player={
							gameState.winner === "" ? gameState.player.pokemon_team[gameState.player.active_pokemon_index] : undefined
						}
						handlePlayerMove={handlePlayerMove}
						handleOpponentMove={handleOpponentMove}
						handleOpponentPokemonRemove={handleOpponentRemove}
						handlePlayerPokemonRemove={handlePlayerRemove}
						switchPokemonMove={setPlayerSwitch}
						handleOpponentSwitch={handleOpponentSwitch}
					/>
					<div className='relative'>
						<canvas
							ref={canvasRef}
							width='700'
							height='700'
							className=' bg-neutral-600'
						></canvas>
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
								{getLivePokemon("player")?.map((pokemon : any) => (
									<div
										key={pokemon.species}
										className={`flex flex-col space-y-2 border text-sm ${playerSwitch ? 'cursor-pointer border-4 border-green-500' : ''}`}
										onClick={() => {
											if (playerSwitch) {
												setGameState({
													...gameState,
													player: {
														...gameState.player,
														active_pokemon_index:
															gameState.player.pokemon_team.indexOf(pokemon)
													},
													turn_order: 'ai'
												})
												setPlayerSwitch(false)
											}
										}}
									>
										<div className='flex items-center justify-center'>
											<img
												className='h-24 w-24'
												// adding image url here cause this is the normal view
												src={pokemon?.altImage}
											/>
											<div className='p-4' key={pokemon.species}>
												<p>name: {pokemon.species}</p>
												<p>hp: {pokemon.base_stats.hp}</p>
												<p>speed: {pokemon.base_stats.speed}</p>
											</div>
										</div>
										<div className='grid grid-cols-2 gap-2'>
											{pokemon.base_stats.moves.map((move: any) => (
												<div key={move.name} className='border p-2'>
													<p>{move.name}</p>
													<p>dmg: {move.power}</p>
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
