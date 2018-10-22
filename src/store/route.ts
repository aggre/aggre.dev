import { merge, fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

const { location } = window

export const route = merge(
	fromEvent(window, 'popstate'),
	fromEvent(window, 'hashchange')
).pipe(map(() => location.pathname))
