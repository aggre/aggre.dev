import { Subscription } from 'rxjs'
import forEach from 'ramda/es/forEach'

export const cancel = (
	subscriptions: ReadonlySet<Subscription>
): readonly Subscription[] =>
	forEach((x) => x.unsubscribe(), Array.from(subscriptions))
