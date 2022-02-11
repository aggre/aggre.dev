import { html, TemplateResult } from 'lit'
import { route } from '../store/route'

type Props = {
	readonly href: string
	readonly content: TemplateResult | string
}

// eslint-disable-next-line functional/no-return-void
const handler = (url: string) => (e: Event) => {
	// eslint-disable-next-line functional/no-expression-statement
	e.preventDefault()
	// eslint-disable-next-line functional/no-expression-statement
	route.next(url)
}

export const a = (props: Props): TemplateResult =>
	props.href.startsWith('//')
		? html` <a href="${props.href}">${props.content}</a> `
		: html`
				<a href="${props.href}" @click="${handler(props.href)}"
					>${props.content}</a
				>
		  `
