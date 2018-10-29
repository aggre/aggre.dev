import { BehaviorSubject } from 'rxjs'

export interface ContentMeta {
	readonly title?: string
	readonly image?: string
}
export interface Content {
	readonly meta?: ContentMeta
	readonly body: string
}

export const content = new BehaviorSubject<Content | null>(null)
