import { BehaviorSubject } from 'rxjs'
import { TemplateResult, html } from 'lit-html'

export const content = new BehaviorSubject<TemplateResult>(html``)
