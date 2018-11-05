import { Subscription } from 'rxjs'
export const cancel = (subscriptions: Set<Subscription>) =>
	subscriptions.forEach(s => s.unsubscribe())
