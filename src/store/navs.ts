import { BehaviorSubject } from 'rxjs'

export const navs = new BehaviorSubject([
	{
		label: 'home',
		link: '/'
	},
	{
		label: 'blog',
		link: '/post'
	}
])
