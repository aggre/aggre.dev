import { BehaviorSubject } from 'rxjs'

export interface ContentMeta {
	readonly title?: string
	readonly image?: string
	readonly description?: string
}
export interface Content {
	readonly meta?: ContentMeta
	readonly body: string
}

export const content = new BehaviorSubject<Content>({
	body: '',
})
