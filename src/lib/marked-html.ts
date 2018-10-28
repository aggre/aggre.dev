import { parse } from 'marked'
import { html } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

export const markedHTML = (md: string) => html`${unsafeHTML(parse(md))}`
