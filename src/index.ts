import { render, html } from 'lit-html'
import { xApp } from './element/x-app'
import { content } from './store/content'
import { route } from './store/route'
import { fetchContent } from './action/content'
import { routeChange } from './action/route'
const { customElements } = window

customElements.define('x-app', xApp)

route.subscribe(x => fetchContent(x))

const root = document.getElementById('root')

if (root) {
	content.subscribe(x => render(html`<x-app>${x}</x-app>`, root))
}

// Try
setTimeout(() => {
	routeChange('/post/empty')
}, 2000)
