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
	}
	.header {
		grid-area: header
	}
	main {
		grid-area: main;
	}
</style>
<div class=app>
	<div class=header>
		${header()}
	</div>
	<main>
		<slot></slot>
	</main>
</div>
`
