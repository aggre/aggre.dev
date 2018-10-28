import { route } from '../store/route'
import { BehaviorSubject } from 'rxjs'

const { history } = window

export const routeChange = (
	next: string,
	store: BehaviorSubject<string> = route
) => {
	// tslint:disable-next-line:no-expression-statement
	history.pushState(null, '', next)
	return store.next(next)
}
