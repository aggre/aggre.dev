import { root } from './root'
import { render, html } from 'lit-html'
import { content } from '../store/content'

// tslint:disable:no-expression-statement
describe('root', () => {
	it('Subscribe to content and rerender', () => {
		content.next({
			body: 'Test'
		})
		render(
			html`
				${root()}
			`,
			document.body
		)
		expect(
			(document.body.querySelector('p') as HTMLParagraphElement).innerText
		).to.be('Test')

		content.next({
			body: 'Test 2'
		})
		expect(
			(document.body.querySelector('p') as HTMLParagraphElement).innerText
		).to.be('Test 2')
	})
})
