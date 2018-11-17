// tslint:disable:no-expression-statement
import { html, directive, Part } from 'lit-html'
import { content } from '../store/content'
import { markedHTML } from '../lib/marked-html'

export const root = directive(() => (part: Part) => {
	content.subscribe(x => {
		part.setValue(
			html`
				<x-app>${markedHTML(x ? x.body : '')}</x-app>
			`
		)
		part.commit()
	})
})
