import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { html, TemplateResult } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

const parse = markdownIt({
	html: true,
	linkify: true,
	highlight(str, lang) {
		return lang && hljs.getLanguage(lang)
			? `<pre class=hljs><code>${
					hljs.highlight(lang, str, true).value
			  }</code></pre>`
			: str
	},
})

export const markedHTML = (md = ''): TemplateResult =>
	html` ${unsafeHTML(parse.render(md))} `
