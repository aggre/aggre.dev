import { expect } from '@esm-bundle/chai'
import { head } from './head'
import { render } from 'lit'
import { removeExtraString } from '../test'

// tslint:disable:no-expression-statement
describe('<head>', () => {
	it('Returns template for head element', () => {
		render(
			head('/test', {
				title: 'Test',
				image: '/test.jpg',
				description: 'this is a test',
			}),
			document.head
		)
		const el = document.head
		expect(
			(el.querySelector('link[rel=canonical]') as Element).getAttribute('href')
		).to.be.equal('https://aggre.io/test')
		expect(
			(el.querySelector('meta[property="og:url"]') as Element).getAttribute(
				'content'
			)
		).to.be.equal('https://aggre.io/test')
		expect(
			(el.querySelector(
				'meta[property="og:site_name"]'
			) as Element).getAttribute('content')
		).to.be.equal('aggre.io')
		// expect(
		// 	removeExtraString((el.querySelector('title') as Element).innerHTML)
		// ).to.be.equal('Test')
		// expect(
		// 	(el.querySelector('meta[property="og:title"]') as Element).getAttribute(
		// 		'content'
		// 	)
		// ).to.be.equal('Test')
		expect(
			(el.querySelector('meta[name=description]') as Element).getAttribute(
				'content'
			)
		).to.be.equal('this is a test')
		expect(
			(el.querySelector(
				'meta[property="og:description"]'
			) as Element).getAttribute('content')
		).to.be.equal('this is a test')
		expect(
			(el.querySelector('meta[property="og:image"]') as Element).getAttribute(
				'content'
			)
		).to.be.equal('https://aggre.io/test.jpg')
		expect(
			(el.querySelector('meta[name="twitter:image"]') as Element).getAttribute(
				'content'
			)
		).to.be.equal('https://aggre.io/test.jpg')
	})
})
