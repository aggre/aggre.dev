import { expect } from '@esm-bundle/chai'
import { content } from './content'
import { skip } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { cancel } from '../lib/cancel'

const subs = new Set<Subscription>()

// tslint:disable:no-expression-statement
describe('content store', () => {
	it('initial value', (done) => {
		subs.add(
			content.subscribe((x) => {
				expect(x).to.be.ok
				done()
			})
		)
	})

	it('subscribe', (done) => {
		const next = {
			body: 'Test',
			meta: {
				title: 'Title',
				image: '/test.jpg',
				description: 'this is a test',
			},
		}
		subs.add(
			content.pipe(skip(1)).subscribe((x) => {
				expect(x).to.be.eql(next)
				done()
			})
		)
		content.next(next)
	})

	after(() => {
		cancel(subs)
	})
})
