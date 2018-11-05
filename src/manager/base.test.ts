import { base } from './base'
import { route } from '../store/route'
import { content } from '../store/content'
import { cancel } from '../lib/cancel'
import { navs } from '../store/navs'
import { skip } from 'rxjs/operators'

// tslint:disable:no-expression-statement no-non-null-assertion
describe('base manager', () => {
	it('Subscribe to content and rerender head element', () => {
		const title = (document.head as HTMLHeadElement).querySelector(
			'title'
		) as HTMLElement
		const prevTitle = title.innerText
		const subscriptions = base(route, content)
		content.next({
			body: '',
			meta: {
				title: '***TEST***'
			}
		})
		expect(prevTitle).to.not.be(title.innerText)
		expect(title.innerText).to.be('***TEST***')
		cancel(subscriptions)
	})

	it('Subscribe to route and change history', () => {
		const prevLocation = location.pathname
		const subscriptions = base(route, content)
		route.next('/test')
		expect(prevLocation).to.not.be(location.pathname)
		expect(location.pathname).to.be('/test')
		cancel(subscriptions)
	})

	it('Subscribe to route and change active nav', () => {
		const subscriptions = base(route, content)
		route.next('/')
		const prevActiveNav = navs.value.findIndex(x => x.active)
		route.next('/post')
		const nextActiveNav = navs.value.findIndex(x => x.active)
		expect(prevActiveNav).to.not.be(nextActiveNav)
		expect(nextActiveNav).to.be(1)
		cancel(subscriptions)
	})

	it('Subscribe to route and change content', () => {
		const prevContent = content.value
		const subscriptions = base(route, content)
		const exSubscriptions = new Set([
			content.pipe(skip(1)).subscribe(x => {
				expect(prevContent).to.not.be(x)
				expect(x!.meta!.title).to.be('🍣')
				cancel(subscriptions)
			})
		])
		route.next('/page/sushi')

		after(() => {
			cancel(exSubscriptions)
		})
	})
})
