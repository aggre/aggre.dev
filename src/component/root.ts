// tslint:disable:no-expression-statement
import { html, directive } from 'lit-html'
import { content } from '../store/content'
import { markedHTML } from '../lib/marked-html'

export const root = directive(() => part => {
	content.subscribe(x => {
		part.setValue(
			html`
				${markedHTML(x ? x.body : '')}
			`
		)
		part.commit()
	})
})
