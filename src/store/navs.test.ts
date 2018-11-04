import { navs } from './navs'
import { skip } from 'rxjs/operators'

// tslint:disable:no-expression-statement
describe('navs store', () => {
	it('initial value', done => {
		navs.subscribe(x => {
			expect(x).to.eql([
				{
					label: 'home',
					link: '/',
					active: true
				},
				{
					label: 'blog',
					link: '/post',
					active: false
				}
			])
			done()
		})
	})

	it('subscribe', done => {
		const next: ReadonlyArray<any> = [
			{
				label: 'test',
				link: '/test',
				active: true
			},
			{
				label: 'spec',
				link: '/spec',
				active: false
			}
		]
		navs.pipe(skip(1)).subscribe(x => {
			expect(x).to.eql(next)
			done()
		})
		navs.next(next)
	})
})
