import { process, directive } from 'lit-style'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import postcssPresetEnv from 'postcss-preset-env'
import { AcceptedPlugin } from 'postcss'

export const processor = process({
	// tslint:disable-next-line:readonly-array
	plugins: [postcssPresetEnv({ stage: 0 })] as AcceptedPlugin[]
})

export const style = directive(
	processor,
	css =>
		html`
			<style>
				${until(css)}
			</style>
		`
)
