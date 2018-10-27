// tslint:disable:no-expression-statement
import { render, html } from 'lit-html'
import { xApp } from './element/x-app'
import { content } from './store/content'
import { route } from './store/route'
import { fetchContent } from './action/content'
const { customElements } = window

customElements.define('x-app', xApp)
const root = document.getElementById('root')

content.subscribe(x => render(html`<x-app>${x}</x-app>`, root || document.body))

fetchContent()
	.then(() => route.subscribe(async x => fetchContent(x)))
	.catch(err => console.error(err))
