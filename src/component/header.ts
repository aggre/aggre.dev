import { html } from 'lit-html'
import { nav } from './nav'
import { navs } from '../store/navs'
import { subscribe, shadow } from '@aggre/ullr'
import { a } from './a'
import { always } from 'ramda'

export const header = always(
	shadow(html`
		<style>
			header {
				display: grid;
				grid-template-areas: 'brand nav';
				grid-template-columns: 1fr auto;
				align-items: center;
			}
			.brand {
				grid-area: brand;
			}
			.brand a {
				color: blue;
				text-decoration: none;
				font-weight: 700;
			}
			.nav {
				grid-area: nav;
			}
		</style>
		<header>
			<div class="brand">${a({ href: '/', content: 'aggre.dev' })}</div>
			<div class="nav">${subscribe(navs, (x) => html` ${nav(x)} `)}</div>
		</header>
	`)
)
