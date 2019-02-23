import { Subscription } from 'rxjs'
import forEach from 'ramda/es/forEach'

export const cancel = (subscriptions: Set<Subscription>) =>
	// tslint:disable-next-line:no-void-expression
	forEach(x => x.unsubscribe(), Array.from(subscriptions))
