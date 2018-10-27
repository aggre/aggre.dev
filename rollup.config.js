import typescript from 'rollup-plugin-typescript'
import postcss from 'rollup-plugin-transform-postcss'
import postcssPresetEnv from 'postcss-preset-env'

export default {
	input: './src/index.ts',
	plugins: [
		typescript(),
		postcss({
			plugins: [
				postcssPresetEnv
			]
		})
	],
	output: {
		file: './src/index.js',
		format: 'esm'
	}
}
