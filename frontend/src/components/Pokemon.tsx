const Pokemon = () => {
	return (
		<div className='view'>
			<div className='game'>
				<div className='opponent'>
					<div className='stats'>
						<div className='top'>
							<div className='pokeballs'>
								<div className='pokeball'></div>
								<div className='pokeball'></div>
								<div className='pokeball'></div>
								<div className='pokeball'></div>
								<div className='pokeball'></div>
							</div>
							<div id='apHP' className='hp-count'>
								100
							</div>
						</div>
						<span className='name'> Charizard </span>
						<span className='level'> 86 </span>
					</div>
					<img
						className='pokemon'
						src='http://img.pokemondb.net/sprites/black-white/anim/normal/lugia.gif'
						alt='A sprite of charizard'
					/>
				</div>
				<div className='player'>
					<div className='stats'>
						<div className='top'>
							<div className='pokeballs'>
								<div className='pokeball'></div>
								<div className='pokeball'></div>
								<div className='pokeball'></div>
								<div className='pokeball'></div>
								<div className='pokeball'></div>
							</div>
							<div id='myHP' className='hp-count'>
								100
							</div>
						</div>
						<span className='name'> Blastoise </span>
						<span className='level'> 86 </span>
					</div>
					<img
						className='pokemon'
						src='http://bit.ly/blastoisegif'
						alt='A gif from blastoises back sprite'
					/>
				</div>
			</div>
			<div className='box'>
				<div id='message' className='message'>
					What should Blastoise do?
				</div>
				<div className='actions'>
					<button>Water Cannon</button>
					<button >Water Pulse</button>
					<button >Surf</button>
					<button>Tackle</button>
				</div>
				<div className='continue'>
					<button >Continue</button>
				</div>
			</div>
		</div>
	)
}

export { Pokemon }
