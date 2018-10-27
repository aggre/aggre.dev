import typescript from 'rollup-plugin-typescript'

export default {
	input: './src/index.ts',
	plugins: [
		typescript()
	],
	output: {
		file: './src/index.js',
		format: 'esm'
	}
}
