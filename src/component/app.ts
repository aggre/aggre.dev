import { html } from 'lit-html'
import { nav } from './nav'
import { navs } from '../store/navs'
import { subscribe } from 'ullr/directive'

export const app = () => html`
${subscribe(navs, x => nav(x))}
<slot></slot>
`
