/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */

const cls = 'activated'

export class XEmbed extends HTMLElement {
	connectedCallback(): void {
		const template = this.querySelector('template')
		const activated = this.querySelector(`.${cls}`)
		if (!template || activated) {
			return
		}
		const container = document.createElement('div')
		container.classList.add(cls)

		const { content } = template
		const node = document.importNode(content, true)
		const scriptsInTemplate = Array.from(node.querySelectorAll('script'))
		const scripts = scriptsInTemplate.map((s) => {
			const script = document.createElement('script')
			s.getAttributeNames().map((attr) => {
				script.setAttribute(attr, s.getAttribute(attr) as string)
			})
			return script
		})
		container.appendChild(node)
		scriptsInTemplate.forEach((s) => {
			if (s.parentNode) {
				s.parentNode.removeChild(s)
			}
		})
		scripts.forEach((s) => {
			container.appendChild(s)
		})
		this.appendChild(container)
	}
}
