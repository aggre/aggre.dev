import { fetchContent } from './fetch-content'

// tslint:disable:no-expression-statement
describe('content actions', () => {
	it('Fetch new content', async () => {
		const text = `\`\`\`yml
title: すし
image: /asset/image/sushi.png
description: お寿司
\`\`\`

# 🍣

すし
`
		expect(await fetchContent('/page/sushi')).to.be(text)
	})
})
