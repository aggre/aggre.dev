import { html } from 'lit-html'
import { nav } from './nav'
import { navs } from '../store/navs'
import { subscribe } from 'ullr/directive'

export const app = () => html`
<style>
	#app {
		margin: auto;
		max-width: 980px;
	}
</style>
<div id=app>
	${subscribe(navs, x => nav(x))}
	<main>
		<slot></slot>
	</main>
</div>
`
