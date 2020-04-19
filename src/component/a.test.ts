import { a } from './a'
import { render } from 'lit-html'

// tslint:disable:no-expression-statement
describe('<a>', () => {
	it('Returns template for <a> element', () => {
		render(a({ href: '/test', content: 'Test' }), document.body)
		const el = document.body.querySelector('a') as HTMLAnchorElement
		expect(el.getAttribute('href')).to.be('/test')
		expect(el.innerHTML.replace(/<!---->/g, '')).to.be('Test')
	})

	it('Handling routing when click event')

	it('No handling click event when the href URL starts with //')
})
