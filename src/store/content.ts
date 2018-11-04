import { BehaviorSubject } from 'rxjs'

export interface ContentMeta {
	readonly title?: string
	readonly image?: string
	readonly description?: string
}
export type Content = {
	readonly meta?: ContentMeta
	readonly body: string
} | null

export const content = new BehaviorSubject<Content>(null)
