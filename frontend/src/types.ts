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


export type TPlayerActivePokemon = {
	name: string
	hp: number
	maxHp: number
	image: string
	attack: number
	defense: number
	speed: number
	moves: { name: string; dmg: number }[]
}

export type TOpponentActivePokemon = {
	name: string
	hp: number
	maxHp: number
	image: string
	attack: number
	defense: number
	speed: number
	moves: { name: string; dmg: number }[]
}