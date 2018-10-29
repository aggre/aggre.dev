const { location } = window

const convertUrl = (path: string) => `${path === '/' ? 'index' : path}.md`

export const fetchContent = async (path?: string) => {
	const res = await fetch(convertUrl(path || location.pathname))
	return res.text()
}
