import { html, TemplateResult } from 'lit-html'
import { route } from '../store/route'

interface Props {
	readonly href: string
	readonly content: TemplateResult | string
}

const handler = (url: string) => (e: Event) => {
	// tslint:disable-next-line:no-expression-statement
	e.preventDefault()
	// tslint:disable-next-line:no-expression-statement
	route.next(url)
}

export const a = (props: Props) =>
	props.href.startsWith('//')
		? html`
				<a href="${props.href}">${props.content}</a>
		  `
		: html`
				<a href="${props.href}" @click="${handler(props.href)}"
					>${props.content}</a
				>
		  `
