import { useState, useEffect } from 'react'

type PlayerProps = {
  _name: string
	_maxHP: number
	_hp: number
	_attack: number
	_defense: number
	_speed: number
}

const Player = ({ _name, _maxHP, _hp, _attack, _defense, _speed }: PlayerProps) => {

	return (
		<div className='z-10 flex h-1/3 w-full px-4'>
			<div className='flex w-full justify-between'>
				<div className='h-42 w-42 flex items-start justify-center'>
					<img
						className='h-44 w-44'
						src='http://bit.ly/blastoisegif'
						alt='A sprite of charizard'
					/>
				</div>
				<div className='w-90 flex max-h-32 flex-col rounded-xl border bg-black p-1'>
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
			</div>
		</div>
	)
}

export { Player }
