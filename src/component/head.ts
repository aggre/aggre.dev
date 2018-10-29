import { ContentMeta } from '../store/content'
import { html } from 'lit-html'

export const head = (
	route: string,
	meta?: ContentMeta,
	domain = 'aggre.io'
) => html`
	<meta charset=UTF-8>
	<meta name=viewport content='width=device-width, initial-scale=1.0'>
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
`
