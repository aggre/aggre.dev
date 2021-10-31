import { expect } from '@esm-bundle/chai'
import { header } from './header'
import { render, html } from 'lit'

// tslint:disable:no-expression-statement
describe('header', () => {
	it('Returns template for header element', () => {
		render(html` ${header()} `, document.body)
		const el = (document.body.querySelector('ullr-shdw') as HTMLElement)
			.shadowRoot as ShadowRoot
		expect(el.querySelector('header')).to.be.ok
		expect(
			(el.querySelector('.brand > a') as Element).getAttribute('href')
		).to.be.equal('/')
		expect(el.querySelector('.nav > *')).to.be.ok
	})

	it('Subscribe to navs store')
})
