import type { ReactElement } from 'react'
import { Opponent } from 'components/Opponent'
import { Player } from 'components/Player'
import { useEffect, useRef, useState } from 'react'
import { type TPokemon } from 'types'

type PokemonBattleProps = {
	gameState: any
	player?: TPokemon
	opponent?: TPokemon
	handlePlayerMove: (playerMove: {
		name: string
		type: string
		power: number
	}) => void
	handlePlayerPokemonRemove: () => void
	handleOpponentMove: (oppMove: {
		name: string
		type: string
		power: number
	}) => void
	handleOpponentPokemonRemove: () => void
	switchPokemonMove: (isSwitch: boolean) => void
	handleOpponentSwitch: (switchPokemonIndex : number) => void
}

const PokemonBattle = ({
  gameState,
	player,
	opponent,
	handlePlayerMove,
	handlePlayerPokemonRemove,
	handleOpponentMove,
	handleOpponentPokemonRemove,
	switchPokemonMove,
	handleOpponentSwitch
}: PokemonBattleProps) => {
	const imageRef = useRef<HTMLImageElement>(null)
	const [usedPlayerPokemonMove, setUsedPlayerPokemonMove] = useState('')
  const [usedAiPokemonMove, setUsedAiPokemonMove] = useState('')
	const isPlayerTurn = gameState.turn_order === 'player'
	// const attackMove = (playerMove: { name: string; dmg: number }) => {
	// 	let dmg = playerMove.dmg
	// 	if (playerMove.dmg > opponent.hp) {
	// 		dmg = opponent.hp
	// 	}
	// 	setOpponent(prev => {
	// 		return {
	// 			...prev,
	// 			hp: prev.hp - dmg
	// 		}
	// 	})
	// }
	useEffect(() => {
		if (gameState.ai.fainted_pokemons.length !== 3) {
			if (opponent && opponent.current_hp <= 0) {
				handleOpponentPokemonRemove()
			}
		} else {
			gameState.winner = 'player'
		}
		if (gameState.player.fainted_pokemons.length !== 3) {
			if (player && player.current_hp <= 0) {
				handlePlayerPokemonRemove()
			}
		} else {
			gameState.winner = 'ai'
		}
	})
  useEffect(() => {
    ;(async () => {
      if (gameState.turn_order === 'ai') {
        let response = await fetch('http://127.0.0.1:5000/ai', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(gameState)
				})
        let data = await response.json()
				console.log(data);
				if (Object.keys(data)[0] === 'move') {
					let pokemonMove = gameState.ai.pokemon_team[gameState.ai.active_pokemon_index].base_stats.moves[data.move]
					// { "move": 3}
					handleOpponentMove(pokemonMove)
					setUsedAiPokemonMove(pokemonMove.name)
					setTimeout(() => {
						setUsedAiPokemonMove('')
					}, 3000)
				}
				if (Object.keys(data)[0] === 'switch') {
					handleOpponentSwitch(data.switch)
					setUsedAiPokemonMove('Switched Pokemon')
					setTimeout(() => {
						setUsedAiPokemonMove('')
					}, 3000)
				}
      }
    })()
  }, [gameState])
	return (
		<div className='flex h-[700px] w-[700px] flex-col items-center justify-center'>
			<div className='relative flex h-[30vw] w-full flex-col rounded-lg border border-black'>
				<img
					src='http://bit.ly/pokemonbg'
					className='absolute -z-10 h-full w-full'
					ref={imageRef}
					alt=''
				/>
				<Opponent
					_name={opponent ? opponent.species : ''}
					_hp={opponent ? opponent.base_stats.hp : 100}
					_current_hp={opponent ? opponent.current_hp : 0}
					_attack={0}
					_defense={0}
					_speed={opponent ? opponent.base_stats.speed : 0}
					_image={opponent ? opponent.image : ''}
				/>
				<Player
					_name={player ? player.species : 'Choose your pokemon'}
					_hp={player ? player.base_stats.hp : 100}
					_current_hp={player ? player.current_hp : 0}
					_attack={0}
					_defense={0}
					_speed={player ? player.base_stats.speed : 0}
					_image={player ? player.image : ''}
				/>
				{
					gameState.winner ? (
						<div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center'>
							<div className='text-4xl text-white'>
								{gameState.winner === 'player' ? 'You win!' : 'You lose!'}
							</div>
						</div>
					) : ''
				}
			</div>
			<div
				className={`grid w-full grid-cols-2 bg-neutral-800 pt-4 ${isPlayerTurn ? 'border-4 border-green-500' : ''}`}
			>
				<div className={`w-full `}>
					{usedAiPokemonMove != '' ? (
						<div id='message' className='text-2xl'>
							{opponent?.species} used {usedAiPokemonMove}!
						</div>
					) : usedPlayerPokemonMove != '' ? (
						<div id='message' className='text-2xl'>
							{player?.species} used {usedPlayerPokemonMove}!
						</div>
					) : player?.species ? (
						<div id='message' className='text-2xl'>
							What should {player.species} do?
						</div>
					) : (
						<div id='message' className='pl-2 text-2xl'>
							Choose your pokemon
						</div>
					)}
					<div className='flex w-full'>
						<button
							onClick={() => {
								if (isPlayerTurn) {
									switchPokemonMove(true)
								}
							}}
							className='m-auto bg-neutral-700 py-2 hover:bg-neutral-500'
						>
							Switch Pokemon
						</button>
					</div>
				</div>
				<div className='grid grid-cols-2 gap-2'>
					{player && player.base_stats.moves.length > 0 ? (
						player.base_stats.moves.map(move => (
							<button
								key={move.name}
								className={`size-full py-2 ${isPlayerTurn ? 'bg-neutral-700 hover:bg-neutral-500' : 'bg-neutral-800'}`}
								onClick={() => {
									setUsedPlayerPokemonMove(move.name)
									handlePlayerMove(move)
									setTimeout(() => {
										setUsedPlayerPokemonMove('')
									}, 3000)
								}}
								disabled={!isPlayerTurn}
							>
								{move.name}
							</button>
						))
					) : (
						<>
							{new Array(4).fill(0).map((_, i) => (
								<button
									key={i}
									className='size-full bg-neutral-700 py-2'
									disabled
								>
									N/A
								</button>
							))}
						</>
					)}
				</div>
				{/* <div className='continue'>
					<button onclick='compPokemon()'>Continue</button>
				</div> */}
			</div>
		</div>
	)
}

export { PokemonBattle }
