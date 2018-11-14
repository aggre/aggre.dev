import { html } from 'lit-html'
import { header } from './header'

export const app = () => html`
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
		}
		::slotted(*) {
			width: 100%;
		}
	</style>
	<div class="app">
		<div class="header">${header()}</div>
		<main><slot></slot></main>
	</div>
`
