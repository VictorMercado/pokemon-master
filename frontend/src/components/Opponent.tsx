import { useState, useEffect } from 'react';

type OpponentProps = {
  _name: string;
  _hp: number;
  _current_hp: number;
  _attack?: number;
  _defense?: number;
  _speed: number;
  _image: string;
};

const Opponent = ({ _name, _hp, _current_hp, _attack, _defense, _speed,_image} : OpponentProps) => {

	return (
		<div className='z-10 flex h-2/3 w-full p-4'>
			<div className='flex w-full justify-between'>
				{/* stats */}
				<div className='w-90 flex max-h-32 flex-col rounded-xl border bg-black p-1'>
					<div className=''>
						<span className='font-bold'> {_name} </span>
					</div>
					<div className='flex items-center p-2'>
						<span className='mr-2 text-sm'> HP: {_current_hp}</span>
						<progress
							className='rounded-md'
							max={_hp}
							value={_current_hp}
						></progress>
					</div>
					<span className='p-2'> Speed: {_speed} </span>
				</div>
				{/* stats */}

				{/* sprite */}
				<div className='flex h-72 w-72 items-end justify-center pr-6 pb-8'>
					{_image && <img className='h-32 w-32' src={_image} />}
				</div>
				{/* sprite */}
			</div>
		</div>
	)
}

export { Opponent };