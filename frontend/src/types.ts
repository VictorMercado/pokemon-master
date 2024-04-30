export interface IFruit {
	name: string
	image: {
		author: {
			name: string
			url: string
		}
		color: string
		url: string
	}
	metadata: {
		name: string
		value: string
	}[]
}


export type TPokemon = {
	species: string
	current_hp: number
	image: string
	altImage?: string
	base_stats: {
		hp: number
		speed: number
		moves: { name: string; type: string; power: number; }[]
	}
}
