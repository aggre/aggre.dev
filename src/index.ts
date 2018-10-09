import { render, html } from 'lit-html'
import { xApp } from './component/x-app'

customElements.define('x-app', xApp)

const root = document.getElementById('root')

if (root) {
	render(html`<x-app>🍣</x-app>`, root)
}
