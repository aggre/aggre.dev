import { parse } from 'marked'
import { html } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export const markedHTML = (md = '') => html`${unsafeHTML(parse(md))}`
