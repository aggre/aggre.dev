// tslint:disable:no-class
// tslint:disable:no-this
// tslint:disable:no-if-statement
// tslint:disable:no-expression-statement
// tslint:disable:no-object-mutation
// tslint:disable:typedef

const cls = 'activated'

export class XEmbed extends HTMLElement {
	connectedCallback() {
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
		const scripts = scriptsInTemplate.map(s => {
			const script = document.createElement('script')
			s.getAttributeNames().map(attr => {
				script.setAttribute(attr, s.getAttribute(attr) as string)
			})
			return script
		})
		container.appendChild(node)
		scriptsInTemplate.forEach(s => {
			if (s.parentNode) {
				s.parentNode.removeChild(s)
			}
		})
		scripts.forEach(s => {
			container.appendChild(s)
		})
		this.appendChild(container)
	}
}
