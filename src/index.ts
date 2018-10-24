import { render, html } from 'lit-html'
import { xApp } from './element/x-app'
import { content } from './store/content'
import { route } from './store/route'
import { fetchContent } from './action/content'
const { customElements } = window

const app = customElements.define('x-app', xApp)
const root = document.getElementById('root')
const contentRender = content.subscribe(x =>
	render(html`<x-app>${x}</x-app>`, root || document.body)
)
;(async () => {
	const contentUpdater = await fetchContent().then(() =>
		route.subscribe(async x => fetchContent(x))
	)
	// tslint:disable-next-line:no-expression-statement
	console.log(app, contentRender, contentUpdater)
})().catch(err => console.error(err))
