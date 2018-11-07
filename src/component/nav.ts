import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { component } from 'ullr'
import { a } from './a'
import { Navs } from '../store/navs'

export const nav = (items: Navs) =>
	component(html`
<style>
	ul {
		display: flex;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	a {
		padding: 0.2rem 1rem;
    	display: inline-block;
		color: inherit;
		text-decoration: none;
	}
	.active {
		background: blue;
		color: white;
		border-radius: 99px;
	}
</style>
<nav>
	<ul>
	${repeat(
		items,
		item =>
			html`<li class='${item.active ? 'active' : ''}'>${a({
				href: item.link,
				content: item.label
			})}</li>`
	)}
	</ul>
</nav>
`)
