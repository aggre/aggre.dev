import { BehaviorSubject, merge, fromEvent } from 'rxjs'

const { location } = window
const { pathname } = location

export const route = new BehaviorSubject(pathname)

merge(fromEvent(window, 'popstate'), fromEvent(window, 'hashchange')).subscribe(
	() => route.next(location.pathname)
)
