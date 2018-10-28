import { fetchContent } from './content'
import { content } from '../store/content'

// tslint:disable:no-expression-statement
describe('content actions', () => {
	it('Fetch new content', async () => {
		await fetchContent('/sushi')
		const text = `# 🍣

すし
`
		expect(content.value).to.be(text)
	})
})
