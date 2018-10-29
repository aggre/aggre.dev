import { BehaviorSubject } from 'rxjs'

export interface Nav {
	readonly label: string
	readonly link: string
	readonly active: boolean
}

export type Navs = ReadonlyArray<Nav>

export const navs = new BehaviorSubject<Navs>([
	{
		label: 'home',
		link: '/',
		active: true
	},
	{
		label: 'blog',
		link: '/post',
		active: false
	}
])
