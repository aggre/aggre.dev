import { markedHTML } from './marked-html'
import { render } from 'lit-html'

// tslint:disable:no-expression-statement
describe('Markdown to HTML', () => {
	it('Markdown to HTML Template Result', async () => {
		const content = `# 🍣

すし
`
		render(markedHTML(content), document.body)
		const h1 = document.body.querySelector('h1') as HTMLHeadingElement
		const p = document.body.querySelector('h1 + p') as HTMLParagraphElement
		expect(h1.innerText).to.be('🍣')
		expect(p.innerText).to.be('すし')
	})
})
