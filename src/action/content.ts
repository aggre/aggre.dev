import { content } from '../store/content'
import { BehaviorSubject } from 'rxjs'
const { location } = window

const convertUrl = (path: string) => `${path === '/' ? 'index' : path}.md`

export const fetchContent = async (
	path?: string,
	store: BehaviorSubject<string> = content
) => {
	const res = await fetch(convertUrl(path || location.pathname))
	const text = await res.text()
	return store.next(text)
}
