import { fetchContent } from './fetch-content'

// tslint:disable:no-expression-statement
describe('content actions', () => {
	it('Fetch new content', async () => {
		const text = `# 🍣

すし
`
		expect(await fetchContent('/sushi')).to.be(text)
	})
})
