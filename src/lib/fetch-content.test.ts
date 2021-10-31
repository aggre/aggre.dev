import { expect } from '@esm-bundle/chai'
import { fetchContent } from './fetch-content'

// tslint:disable:no-expression-statement
describe('content actions', () => {
	// TODO: test
	it.skip('Fetch new content', async () => {
		const text = `\`\`\`yml
title: すし
image: /asset/image/sushi.png
description: お寿司
\`\`\`

# 🍣

すし
`
		expect(await fetchContent('/page/sushi')).to.be.equal(text)
	})
})
