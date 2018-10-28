import { content } from '../store/content'
const { location } = window

const convertUrl = (path: string) => `${path === '/' ? 'index' : path}.md`

export const fetchContent = async (path?: string) =>
	fetch(convertUrl(path || location.pathname))
		.then(async res => res.text())
		.then(text => content.next(text))
