import { render } from 'lit-html'
import { app } from '../component/app'

export const xApp = class extends HTMLElement {
	connectedCallback() {
		render(app(), this.attachShadow({ mode: 'open' }))
	}
}
