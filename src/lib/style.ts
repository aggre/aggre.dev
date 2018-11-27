import { createStyle } from 'lit-style'
import { html } from 'lit-html'
import postcssPresetEnv from 'postcss-preset-env'
import { AcceptedPlugin } from 'postcss'

export const style = createStyle({
	// tslint:disable-next-line:readonly-array
	plugins: [postcssPresetEnv({ stage: 0 })] as AcceptedPlugin[],
	build: css => html`
		<style>
			${css}
		</style>
	`
})
