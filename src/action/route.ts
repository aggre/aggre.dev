import { route } from '../store/route'

const { history } = window

export const routeChange = (next: string) => [
	history.pushState(null, '', next),
	route.next(next)
]
