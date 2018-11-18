// tslint:disable:no-expression-statement
import { render, html } from 'lit-html'
import { xApp } from './element/x-app'
import { content } from './store/content'
import { route } from './store/route'
import { base } from './manager/base'
import { root } from './component/root'
const { customElements } = window
const APP = 'x-app'

customElements.define(APP, xApp)
customElements
	.whenDefined(APP)
	.then(() => (document.querySelector(APP) as Element).classList.add('show'))

base(route, content)

render(
	html`
		${root()}
	`,
	document.getElementById('root') || document.body
)
