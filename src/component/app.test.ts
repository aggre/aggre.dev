import { app } from './app'
import { render } from 'lit-html'

// tslint:disable:no-expression-statement
describe('app', () => {
	it('Returns template for the App', () => {
		render(app(), document.body)
		const el = document.body.querySelector('.app') as Element
		expect(el.querySelector('.header > *')).to.be.ok()
		expect(el.querySelector('slot')).to.be.ok()
	})
})
