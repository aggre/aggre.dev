import { ContentMeta } from '../store/content'
import { html } from 'lit-html'

export const head = (
	route: string,
	meta?: ContentMeta,
	domain = 'aggre.io'
) => html`
	<meta charset=UTF-8>
	<meta name=viewport content='width=device-width, initial-scale=1, shrink-to-fit=no'>
	<meta http-equiv=X-UA-Compatible content='ie=edge'>
	<meta property=og:site_name content='${domain}'>
	<meta property=og:type content='${route === '/' ? 'website' : 'article'}'>
	<meta property=og:url content='//${domain}${route}'>
	<link rel=canonical href='//${domain}${route}'>
	${
		meta
			? html`
	<meta property=og:title content='${meta.title}'>
	<meta name=description content='${meta.description}'>
	<meta property=og:description content='${meta.description}'>
	<meta property=og:image content='${meta.image}'>
	<meta name=twitter:image content='${meta.image}'>
`
			: ''
	}
	<meta name=twitter:card content=summary>
	<meta name=twitter:site content=//twitter.com/aggre_>
	<title>${meta ? meta.title : ''}</title>
	<style>
		@import '../../node_modules/highlight.js/styles/atom-one-dark.css';
		body {
			margin: 0;
			font-size: 1.1rem;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
			padding: 1rem;
			box-sizing: border-box;
			word-break: break-all;
			@media (min-width: 768px) {
				padding: 2rem;
			}
		}
		.hljs {
			background: black;
			border-radius: 1rem;
			padding: 1rem;
			box-sizing: border-box;
		}
	</style>
`
