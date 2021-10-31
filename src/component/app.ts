import { html } from 'lit'
import { header } from './header'
import { always } from 'ramda'

export const app = always(html`
	<style>
		.app {
			margin: auto;
			max-width: 980px;
			display: grid;
			grid-template-areas:
				'header'
				'main';
			grid-gap: 3rem;
			grid-template-columns: 100%;
		}
		.header {
			grid-area: header;
		}
		main {
			grid-area: main;
			max-width: 680px;
			width: 100%;
			margin: auto;
		}
		::slotted p,
		::slotted ul {
			line-height: 180%;
			font-family: Lato, 'Noto Sans JP', sans-serif;
		}
		::slotted h2 {
			margin-top: 3em;
		}
		::slotted h3 {
			margin-top: 2.4em;
		}
		::slotted table {
			width: 100%;
			font-size: 0.9rem;
		}
	</style>
	<div class="app">
		<div class="header">${header()}</div>
		<main><slot></slot></main>
	</div>
`)
