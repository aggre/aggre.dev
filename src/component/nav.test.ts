import { nav } from './nav'
import { render, html } from 'lit-html'

const opts: ReadonlyArray<any> = [
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

// tslint:disable:no-expression-statement
// tslint:disable:no-unsafe-any
describe('<nav>', () => {
	describe('Returns template for nav element', () => {
		it('nav element', () => {
			render(
				html`
					${nav(opts)}
				`,
				document.body
			)
			const el = (document.body.querySelector('ullr-shdw') as HTMLElement)
				.shadowRoot as ShadowRoot
			expect(el.querySelector('nav')).to.be.ok()
		})

		it('active and inactive', () => {
			render(
				html`
					${nav(opts)}
				`,
				document.body
			)
			const el = (document.body.querySelector('ullr-shdw') as HTMLElement)
				.shadowRoot as ShadowRoot
			expect(
				(el.querySelector('nav > ul > li:first-child') as HTMLElement).className
			).to.contain('active')
			expect(
				(el.querySelector('nav > ul > li:last-child') as HTMLElement).className
			).to.not.contain('active')
		})

		it('list of link', () => {
			render(
				html`
					${nav(opts)}
				`,
				document.body
			)
			const el = (document.body.querySelector('ullr-shdw') as HTMLElement)
				.shadowRoot as ShadowRoot
			Array.from(el.querySelectorAll('nav > ul > li')).forEach((item, i) => {
				expect(item.querySelector('a')).to.be.ok()
				expect(
					(item.querySelector('a') as HTMLAnchorElement).getAttribute('href')
				).to.be(opts[i].link)
				expect(
					(item.querySelector('a') as HTMLAnchorElement).innerHTML.replace(
						/<\!---->/g,
						''
					)
				).to.be(opts[i].label)
			})
		})
	})
})
