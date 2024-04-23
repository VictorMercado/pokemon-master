import type { ReactElement } from 'react'
import { Opponent } from 'components/Opponent';
import { Player } from 'components/Player';
import { useEffect, useRef, useState } from "react";

export default function App(): ReactElement {
	const imageRef = useRef<HTMLImageElement>(null);

	const [opponent, setOpponent] = useState({
		name: 'Charizard',
		hp: 150,
		attack: 10,
		defense: 10,
		speed: 10,
		moves: [
			{ name: 'Flamethrower', dmg: 50 },
			{ name: 'Fire Blast', dmg: 40 },
			{ name: 'Ember', dmg: 30 },
			{ name: 'Tackle', dmg: 20 }
		]
	});

	const [player, setPlayer] = useState({
		name: 'Blastoise',
		hp: 100,
		attack: 10,
		defense: 10,
		speed: 10,
		moves: [
			{ name: 'Water Cannon', dmg: 50 },
			{ name: 'Water Pulse', dmg: 40 },
			{ name: 'Surf', dmg: 30 },
			{ name: 'Tackle', dmg: 20 }
		]
	});
	const attackMove = (playerMove : {name: string; dmg: number;}) => {
		let dmg = playerMove.dmg;
		if (playerMove.dmg > opponent.hp) {
			dmg = opponent.hp;
		}
		setOpponent((prev) => {
			return {
				...prev,
				hp: prev.hp - dmg
			};
		});
	}
	useEffect(()=> {
		if (opponent.hp <= 0) {
			alert('You win!');
		}
		if (player.hp <= 0) {
			alert('You lose!');
		}
	});
	return (
		<div className='m-auto flex h-[700px] w-[700px] flex-col items-center justify-center'>
			<div className='relative flex h-[30vw] w-full flex-col rounded-lg border border-black'>
				<img
					src='http://bit.ly/pokemonbg'
					className='absolute -z-10 h-full w-full'
					ref={imageRef}
					alt=''
				/>
				<Opponent
					_name={opponent.name}
					_maxHP={opponent.hp}
					_hp={opponent.hp}
					_attack={opponent.attack}
					_defense={opponent.defense}
					_speed={opponent.speed}
				/>
				<Player
					_name={player.name}
					_maxHP={player.hp}
					_hp={player.hp}
					_attack={player.attack}
					_defense={player.defense}
					_speed={player.speed}
				/>
			</div>
			<div className='grid w-full grid-cols-2 bg-neutral-800 pt-4'>
				<div id='message' className='text-2xl'>
					What should Blastoise do?
				</div>
				<div className='grid grid-cols-2 gap-2'>
					{ player.moves.map((move) => (
						<button
							className='size-full bg-neutral-700 py-2 hover:bg-neutral-500'
							onClick={() => {
								attackMove(move);
							}}
						>
							{move.name}
						</button>
					))}
				</div>
				{/* <div className='continue'>
					<button onclick='compPokemon()'>Continue</button>
				</div> */}
			</div>
		</div>
	)
}
