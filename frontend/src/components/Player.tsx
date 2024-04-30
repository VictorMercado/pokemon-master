import { useState, useEffect } from 'react'

type PlayerProps = {
  _name: string
	_hp: number
	_current_hp: number
	_attack: number
	_defense: number
	_speed: number
  _image: string
}

const Player = ({ _name, _hp, _current_hp, _attack, _defense, _speed, _image }: PlayerProps) => {

	return (
		<div className='z-10 flex h-1/3 w-full px-4'>
			<div className='flex w-full justify-between'>
				<div className='h-42 w-42 flex items-start justify-center'>
					{_image && <img className='h-44 w-44' src={_image} />}
				</div>
				<div className='w-90 flex max-h-32 flex-col rounded-xl border bg-black p-1'>
					<div className=''>
						<span className='font-bold'> {_name} </span>
					</div>
					<div className='p-2 flex items-center'>
						<span className='text-sm mr-2'> HP: {_current_hp} </span>
						<progress
							className='rounded-md'
							max={_hp}
							value={_current_hp}
						></progress>
					</div>
					<span className='p-2'> Speed: {_speed} </span>
				</div>
			</div>
		</div>
	)
}

export { Player }
