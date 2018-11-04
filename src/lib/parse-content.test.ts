import { parseContent } from './parse-content'
import { ContentMeta } from '../store/content'

// tslint:disable:no-expression-statement
describe('parsing content', () => {
	it('parsing content', async () => {
		const content = `+++
title: すし
image: /asset/image/sushi.png
description: お寿司
+++

# 🍣

すし
`
		const parsed = parseContent(content)
		expect(parsed.body).to.be(
			`# 🍣

すし
`
		)

		expect((parsed.meta as ContentMeta).title).to.be('すし')
		expect((parsed.meta as ContentMeta).image).to.be('/asset/image/sushi.png')
		expect((parsed.meta as ContentMeta).description).to.be('お寿司')
	})
})
