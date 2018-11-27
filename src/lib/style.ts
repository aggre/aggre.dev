import { createStyle } from 'lit-style'
import { html } from 'lit-html'
import postcssPresetEnv from 'postcss-preset-env'

export const style = createStyle({
	plugins: [postcssPresetEnv({ stage: 0 })],
	build: css => html`
		<style>
			${css}
		</style>
	`
})
