const { location } = window

const convertUrl = (path: string): string =>
	`${path === '/' ? 'index' : path}.md`

export const fetchContent = async (path?: string): Promise<string> => {
	const res = await fetch(convertUrl(path || location.pathname))
	return res.text()
}
