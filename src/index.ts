import { render, html } from 'lit-html'
import { xApp } from './element/x-app'

customElements.define('x-app', xApp)

const root = document.getElementById('root')

if (root) {
	render(html`<x-app><h1>🍣</h1><p>すし</p></x-app>`, root)
}
