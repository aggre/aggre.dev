import { html } from 'lit-html'
import { header } from './header'
import { style } from '../lib/style'

export const app = () => html`
	${
		style`
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
		grid-area: header
	}
	main {
		grid-area: main;
	}
	::slotted(*) {
		width: 100%;
	}
`
	}
	<div class="app">
		<div class="header">
			${header()}
			<main><slot></slot></main>
		</div>
	</div>
`
