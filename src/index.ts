/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-expression-statement */
import { render, html } from 'lit'
import { xApp } from './element/x-app'
import { XEmbed } from './element/x-embed'
import { content } from './store/content'
import { route } from './store/route'
import { base } from './manager/base'
import { skip } from 'rxjs/operators'
import { markedHTML } from './lib/marked-html'
const { customElements } = window
const APP = 'x-app'
const EMBED = 'x-embed'
const RENDERED = Boolean(document.querySelector(`${APP} > *`))
const ROOT = document.querySelector<HTMLElement>(APP)
customElements.define(APP, xApp)
customElements.define(EMBED, XEmbed)
customElements
	.whenDefined(APP)
	.then(() => {
		;(document.querySelector(APP) as Element).classList.add('show')
	})
	.catch((err) => {
		console.warn(err)
	})

base(route, content)

let purged = false
content.pipe(skip(RENDERED ? 2 : 0)).subscribe((x) => {
	if (!purged && ROOT) {
		while (ROOT.firstChild) ROOT.removeChild(ROOT.firstChild)
		purged = true
	}
	render(html` ${markedHTML(x ? x.body : '')} `, ROOT || document.body)
})
