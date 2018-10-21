import { html, render } from 'lit-html'
import { content } from '../store/content'

const template = () => html`<slot></slot>`

export const xApp = class extends HTMLElement {
	connectedCallback() {
		render(template(), this.attachShadow({ mode: 'open' }))
		const sd = this.shadowRoot as ShadowRoot
		const slot = sd.querySelector('slot')
		if (!slot) {
			return
		}
		content.subscribe(x => console.log(x)) // Test
		content.next(slot.assignedElements())
	}
}
