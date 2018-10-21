import { parse } from 'marked'
import { content } from '../store/content'
import { html } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

const convertUrl = (path: string) => `${path === '/' ? 'index' : path}.md`

export const fetchContent = (path: string) =>
	fetch(convertUrl(path))
		.then(res => res.text())
		.then(text => {
			content.next(html`${unsafeHTML(parse(text))}`)
		})
