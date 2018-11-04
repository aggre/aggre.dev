import { route } from './route'
import { skip } from 'rxjs/operators'

// tslint:disable:no-expression-statement
describe('route store', () => {
	it('initial value', done => {
		route.subscribe(x => {
			expect(x).to.be(location.pathname)
			done()
		})
	})

	it('subscribe', done => {
		const next = '/next'
		route.pipe(skip(1)).subscribe(x => {
			expect(x).to.be(next)
			done()
		})
		route.next(next)
	})
})
