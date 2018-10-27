import { html } from 'lit-html'
import { component } from 'ullr'
import { a } from './a'

export const nav = (
	items: ReadonlyArray<{ readonly label: string; readonly link: string }>
) =>
	html`${component(html`
<style>
	nav {
		display: flex;
	}
</style>
<nav>
	<ul>
	${items.map(
		item => html`<li>${a({ href: item.link, content: item.label })}</li>`
	)}
	</ul>
</nav>
`)}`
