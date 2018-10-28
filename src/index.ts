// tslint:disable:no-expression-statement
import { render, html } from 'lit-html'
import { xApp } from './element/x-app'
import { content } from './store/content'
import { route } from './store/route'
import { fetchContent } from './action/content'
import { navs } from './store/navs'
import { changeActive } from './reducer/navs'
import { markedHTML } from './lib/marked-html'
const { customElements } = window

customElements.define('x-app', xApp)
const root = document.getElementById('root')

content.subscribe(x =>
	render(html`<x-app>${markedHTML(x)}</x-app>`, root || document.body)
)
route.subscribe(x => navs.next(changeActive(navs.value, x)))

fetchContent()
	.then(() => route.subscribe(async x => fetchContent(x)))
	.catch(err => console.error(err))
