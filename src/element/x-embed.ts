// tslint:disable:no-class
// tslint:disable:no-this
// tslint:disable:no-if-statement
// tslint:disable:no-expression-statement
// tslint:disable:no-object-mutation
// tslint:disable:typedef

export class XEmbed extends HTMLElement {
	connectedCallback() {
		const template = this.querySelector('template')
		if (!template) {
			return
		}

		const { content } = template
		const node = document.importNode(content, true)
		const nativeScripts = Array.from(node.querySelectorAll('script'))
		const scripts = nativeScripts.map(s => {
			const script = document.createElement('script')
			s.getAttributeNames().map(attr => {
				script.setAttribute(attr, s.getAttribute(attr) as string)
			})
			return script
		})
		this.appendChild(node)
		nativeScripts.forEach(s => {
			if (s.parentNode) {
				s.parentNode.removeChild(s)
			}
		})
		scripts.forEach(s => {
			this.appendChild(s)
		})
	}
}
