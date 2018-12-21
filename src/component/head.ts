import { ContentMeta } from '../store/content'
import { html } from 'lit-html'
import { style } from '../lib/style'

const highlight = (document.head as HTMLHeadElement).querySelector('#highlight')

export const head = (
	route: string,
	meta?: ContentMeta,
	domain = 'aggre.io',
	protocol = 'https'
) => html`
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id=UA-5710337-14"
	></script>
	<script>
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		gtag('js', new Date())
		gtag('config', 'UA-5710337-14')
	</script>
	<meta charset="UTF-8" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, shrink-to-fit=no"
	/>
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<meta property="og:site_name" content="${domain}" />
	<meta property="og:type" content="${route === '/' ? 'website' : 'article'}" />
	<meta property="og:url" content="${protocol}://${domain}${route}" />
	<link rel="canonical" href="${protocol}://${domain}${route}" /> ${
		meta
			? html`
					<meta property="og:title" content="${meta.title}" />
					<meta name="description" content="${meta.description}" />
					<meta property="og:description" content="${meta.description}" />
					<meta
						property="og:image"
						content="${protocol}://${domain}${meta.image}"
					/>
					<meta
						name="twitter:image"
						content="${protocol}://${domain}${meta.image}"
					/>
			  `
			: ''
	} <meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="//twitter.com/aggre_" />
	<title>${meta ? meta.title : ''}</title> ${highlight}
	<link
		href="https://fonts.googleapis.com/css?family=Lato|Montserrat:400,700|Noto+Sans+JP:400,700"
		rel="stylesheet"
	/>
	${
		style`
		body {
			margin: 0;
			font-size: 1.1rem;
			font-family: Montserrat, 'Noto Sans JP', sans-serif;
			padding: 1rem;
			box-sizing: border-box;
			word-break: break-all;
			@media (min-width: 768px) {
				padding: 2rem;
			}
		}
		a {
			color: blue;
		}
		x-app {
			display: none;
			&.show {
				display: block;
			}
		}

		.hljs {
			background: black;
			border-radius: 1rem;
			padding: 1rem;
			box-sizing: border-box;
		}
		p > code {
			padding: 0.2rem 0.4rem;
			border-radius: 99px;
			color: white;
			background: #4CAF50;
		}
		blockquote {
			position: relative;
			background: whitesmoke;
			padding: .2rem 1.4rem;
			margin: 1rem;
			&::before {
				content: '';
				position: absolute;
				display: block;
				width: 2px;
				left: 0;
				top: 0;
				height: 100%;
				background: #ccc;
			}
			& p > code {
				color: inherit;
				background: #e3e3e3;
			}
		}
		img {
			max-width: 100%;
			height: auto;
		}
	`
	}
`
