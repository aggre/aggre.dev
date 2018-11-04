import typescript from 'rollup-plugin-typescript'
import postcss from 'rollup-plugin-transform-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'

export default {
	input: './src/index.ts',
	plugins: [
		typescript(),
		postcss({
			plugins: [postcssImport, postcssPresetEnv({ stage: 0 })]
		})
	],
	output: {
		file: './src/index.js',
		format: 'esm'
	}
}
