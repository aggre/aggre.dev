// tslint:disable:no-expression-statement
import { render, html, directive } from 'lit-html'
import { xApp } from './element/x-app'
import { content } from './store/content'
import { route } from './store/route'
import { fetchContent } from './lib/fetch-content'
import { navs } from './store/navs'
import { changeActive } from './reducer/navs'
import { markedHTML } from './lib/marked-html'
import { parseContent } from './lib/parse-content'
import { head } from './component/head'
const { customElements } = window

customElements.define('x-app', xApp)

content.subscribe(x =>
	render(
		head(route.value, x ? x.meta : undefined),
		document.head as HTMLHeadElement
	)
)
route.subscribe(x => history.pushState(null, '', x))
route.subscribe(x => navs.next(changeActive(navs.value, x)))
route.subscribe(async x =>
	fetchContent(x).then(text => content.next(parseContent(text)))
)

export const app = html`${directive(part => {
	content.subscribe(x => {
		part.setValue(html`<x-app>${markedHTML(x ? x.body : '')}</x-app>`)
		part.commit()
	})
})}`
