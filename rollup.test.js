import typescript from 'rollup-plugin-typescript'
import multiEntry from 'rollup-plugin-multi-entry'

export default {
	input: './src/**/*.test.ts',
	plugins: [
		typescript(),
		multiEntry()
	],
	output: {
		file: './src/test.js',
		format: 'iife'
	}
}
