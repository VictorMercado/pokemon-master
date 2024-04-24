import type { ReactElement } from 'react'
import { Opponent } from 'components/Opponent'
import { Player } from 'components/Player'
import { useEffect, useRef, useState } from 'react'
import { type TPlayerActivePokemon, type TOpponentActivePokemon } from 'types'

type PokemonBattleProps = {
	player: TPlayerActivePokemon
	opponent: TOpponentActivePokemon
	handlePlayerMove: (playerMove: { name: string; dmg: number }) => void
  handlePlayerPokemonRemove: () => void
	handleOpponentMove: (oppMove: { name: string; dmg: number }) => void
  handleOpponentPokemonRemove: () => void
}

const PokemonBattle = ({
	player,
	opponent,
	handlePlayerMove,
  handlePlayerPokemonRemove,
	handleOpponentMove,
  handleOpponentPokemonRemove
}: PokemonBattleProps) => {
	const imageRef = useRef<HTMLImageElement>(null)

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
		if (opponent.hp <= 0) {
			handleOpponentPokemonRemove()
		}
		if (player.hp <= 0) {
			handlePlayerPokemonRemove()
		}
	})
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
					_name={opponent.name}
					_maxHP={opponent.maxHp}
					_hp={opponent.hp}
					_attack={opponent.attack}
					_defense={opponent.defense}
					_speed={opponent.speed}
					_image={opponent.image}
				/>
				<Player
					_name={player.name}
					_maxHP={player.maxHp}
					_hp={player.hp}
					_attack={player.attack}
					_defense={player.defense}
					_speed={player.speed}
					_image={player.image}
				/>
			</div>
			<div className='grid w-full grid-cols-2 bg-neutral-800 pt-4'>
				{player?.name ? (
					<div id='message' className='text-2xl'>
						What should {player.name} do?
					</div>
				) : (
					<div id='message' className='pl-2 text-2xl'>
						Choose your pokemon
					</div>
				)}
				<div className='grid grid-cols-2 gap-2'>
					{player && player.moves.length > 0 ? (
						player.moves.map(move => (
							<button
								key={move.name}
								className='size-full bg-neutral-700 py-2 hover:bg-neutral-500'
								onClick={() => {
									handlePlayerMove(move)
								}}
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
