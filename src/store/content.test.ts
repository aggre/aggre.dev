import { content } from './content'
import { skip } from 'rxjs/operators'

// tslint:disable:no-expression-statement
describe('content store', () => {
	it('initial value', done => {
		content.subscribe(x => {
			expect(x).to.be(null)
			done()
		})
	})

	it('subscribe', done => {
		const next = {
			body: 'Test',
			meta: {
				title: 'Title',
				image: '/test.jpg',
				description: 'this is a test'
			}
		}
		content.pipe(skip(1)).subscribe(x => {
			expect(x).to.eql(next)
			done()
		})
		content.next(next)
	})
})
