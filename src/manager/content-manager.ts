import { render } from 'lit-html'
import { fetchContent } from '../lib/fetch-content'
import { navs } from '../store/navs'
import { changeActive } from '../reducer/navs'
import { parseContent } from '../lib/parse-content'
import { head } from '../component/head'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Content } from '../store/content'

export const contentManager = (
	route: BehaviorSubject<string>,
	content: BehaviorSubject<Content>
) =>
	new Set<Subscription>()
		.add(route.subscribe(x => history.pushState(null, '', x)))
		.add(route.subscribe(x => navs.next(changeActive(navs.value, x))))
		.add(
			route.subscribe(async x =>
				fetchContent(x).then(text => content.next(parseContent(text)))
			)
		)
		.add(
			content.subscribe(x =>
				render(
					head(route.value, x ? x.meta : undefined),
					document.head as HTMLHeadElement
				)
			)
		)
