import { html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { shadow } from '@aggre/ullr'
import { a } from './a'
import { Navs } from '../store/navs'
import { DirectiveResult } from 'lit/directive.js'

export const nav = (items: Navs): DirectiveResult =>
	shadow(html`
		<style>
			ul {
				display: flex;
				list-style: none;
				padding: 0;
				margin: 0;
			}
			a {
				padding: 0.2rem 1rem;
				display: inline-block;
				color: inherit;
				text-decoration: none;
			}
			.active {
				background: blue;
				color: white;
				border-radius: 99px;
			}
		</style>
		<nav>
			<ul>
				${repeat(
					items,
					(item) =>
						html`
							<li class="${item.active ? 'active' : ''}">
								${a({
									href: item.link,
									content: item.label,
								})}
							</li>
						`
				)}
			</ul>
		</nav>
	`)
