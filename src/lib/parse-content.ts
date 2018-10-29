import { load } from 'js-yaml'
import { ContentMeta, Content } from '../store/content'

const marker = `\\+{3}`
const regexMarker = new RegExp(marker, 'g')
const regexYaml = new RegExp(`${marker}[\\w|\\W]*${marker}(\n+)?`)

export const parseContent = (content: string): Content => {
	const [yml] = content.match(regexYaml) || ['']
	const meta: ContentMeta | undefined = load(yml.replace(regexMarker, ''))
	const body = content.replace(yml, '')
	return {
		meta,
		body
	}
}
