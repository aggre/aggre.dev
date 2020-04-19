import { html, TemplateResult } from 'lit-html'
import { header } from './header'
import { style } from '../lib/style'

export const app = (): TemplateResult => html`
	${style`
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
			max-width: 680px;
			width: 100%;
			margin: auto;
		}
		::slotted {
			&(p),
			&(ul) {
				line-height: 180%;
				font-family: Lato, 'Noto Sans JP', sans-serif;
			}
			&(h2) {
				margin-top: 3em;
			}
			&(h3) {
				margin-top: 2.4em;
			}
		}
	`}
	<div class="app">
		<div class="header">${header()}</div>
		<main><slot></slot></main>
	</div>
`
