import { html } from 'lit-html'
import { routeChange } from '../action/route'

interface Props {
	readonly href: string
	readonly content: any
}

const handler = (url: string) => (e: Event) => {
	// tslint:disable-next-line:no-expression-statement
	e.preventDefault()
	// tslint:disable-next-line:no-expression-statement
	routeChange(url)
}

export const a = (props: Props) =>
	html`<a href=${props.href} @click=${handler(props.href)}>${props.content}</a>`
