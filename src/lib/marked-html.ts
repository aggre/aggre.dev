import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { html } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

const parse = markdownIt({
	html: true,
	linkify: true,
	// tslint:disable-next-line:typedef
	highlight(str, lang) {
		return lang && hljs.getLanguage(lang)
			? `<pre class=hljs><code>${
					hljs.highlight(lang, str, true).value
			  }</code></pre>`
			: str
	},
})

export const markedHTML = (md = '') => html` ${unsafeHTML(parse.render(md))} `
