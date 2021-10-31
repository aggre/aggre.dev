import { expect } from '@esm-bundle/chai'
import { route } from './route'
import { skip } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { cancel } from '../lib/cancel'

const subs = new Set<Subscription>()

// tslint:disable:no-expression-statement
describe('route store', () => {
	it('initial value', (done) => {
		subs.add(
			route.subscribe((x) => {
				expect(x).to.be.equal(location.pathname)
				done()
			})
		)
	})

	it('subscribe', (done) => {
		const next = '/next'
		subs.add(
			route.pipe(skip(1)).subscribe((x) => {
				expect(x).to.be.equal(next)
				done()
			})
		)
		route.next(next)
	})

	after(() => {
		cancel(subs)
	})
})
