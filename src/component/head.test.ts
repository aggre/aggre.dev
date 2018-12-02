import { head } from './head'
import { render } from 'lit-html'

// tslint:disable:no-expression-statement
describe('<head>', () => {
	it('Returns template for head element', () => {
		render(
			head('/test', {
				title: 'Test',
				image: '/test.jpg',
				description: 'this is a test'
			}),
			document.head as HTMLHeadElement
		)
		const el = document.head as HTMLHeadElement
		expect(
			(el.querySelector('link[rel=canonical]') as Element).getAttribute('href')
		).to.be('https://aggre.io/test')
		expect(
			(el.querySelector('meta[property="og:url"]') as Element).getAttribute(
				'content'
			)
		).to.be('https://aggre.io/test')
		expect(
			(el.querySelector(
				'meta[property="og:site_name"]'
			) as Element).getAttribute('content')
		).to.be('aggre.io')
		expect(
			(el.querySelector('title') as Element).innerHTML.replace(/<\!---->/g, '')
		).to.be('Test')
		expect(
			(el.querySelector('meta[property="og:title"]') as Element).getAttribute(
				'content'
			)
		).to.be('Test')
		expect(
			(el.querySelector('meta[name=description]') as Element).getAttribute(
				'content'
			)
		).to.be('this is a test')
		expect(
			(el.querySelector(
				'meta[property="og:description"]'
			) as Element).getAttribute('content')
		).to.be('this is a test')
		expect(
			(el.querySelector('meta[property="og:image"]') as Element).getAttribute(
				'content'
			)
		).to.be('https://aggre.io/test.jpg')
		expect(
			(el.querySelector('meta[name="twitter:image"]') as Element).getAttribute(
				'content'
			)
		).to.be('https://aggre.io/test.jpg')
	})
})
