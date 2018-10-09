import { customElements } from 'ullr'
import { html } from 'lit-html'

const template = () => html`<slot></slot>`

export const xApp = customElements(template)
