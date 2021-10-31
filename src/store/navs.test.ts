import { expect } from '@esm-bundle/chai'
import { navs } from './navs'
import { skip } from 'rxjs/operators'
import { cancel } from '../lib/cancel'
import { Subscription } from 'rxjs'

const subs = new Set<Subscription>()

describe('navs store', () => {
	it('initial value', (done) => {
		subs.add(
			navs.subscribe((x) => {
				expect(x).to.be.ok
				done()
			})
		)
	})

	it('subscribe', (done) => {
		const next: ReadonlyArray<any> = [
			{
				label: 'test',
				link: '/test',
				active: true,
			},
			{
				label: 'spec',
				link: '/spec',
				active: false,
			},
		]
		subs.add(
			navs.pipe(skip(1)).subscribe((x) => {
				expect(x).to.be.eql(next)
				done()
			})
		)
		navs.next(next)
	})

	after(() => {
		cancel(subs)
	})
})
