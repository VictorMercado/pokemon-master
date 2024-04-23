import { useState, useEffect } from 'react';

type OpponentProps = {
  _name: string;
  _maxHP: number;
  _hp: number;
  _attack: number;
  _defense: number;
  _speed: number;
};

const Opponent = ({ _name, _maxHP, _hp, _attack, _defense, _speed, } : OpponentProps) => {

	return (
		<div className='z-10 flex h-2/3 w-full p-4'>
			<div className='flex w-full justify-between'>
				
        {/* stats */}
				<div className='flex max-h-32 w-90 flex-col rounded-xl border bg-black p-1'>
					<div className=''>
						<span className='font-bold'> {_name} </span>
					</div>
					<div className='p-2'>
						<span className=''> HP: {_hp} </span>
						<progress
							className='rounded-md'
							max={_maxHP}
							value={_hp}
						></progress>
					</div>
					<span className='p-2'> Speed: {_speed} </span>
				</div>
				{/* stats */}

        {/* sprite */}
				<div className='flex h-72 w-72 items-center justify-center pr-6'>
					<img
						className='h-44 w-44'
						src='http://img.pokemondb.net/sprites/black-white/anim/normal/lugia.gif'
						alt='A sprite of charizard'
					/>
				</div>
        {/* sprite */}

			</div>
		</div>
	)
}

export { Opponent };