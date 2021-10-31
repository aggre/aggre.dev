import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import multiEntry from '@rollup/plugin-multi-entry'
import json from '@rollup/plugin-json'

export default [
	{
		input: ['src/**/*.test.ts'],
		output: {
			file: 'dist/test.js',
			format: 'umd',
		},
		plugins: [
			typescript(),
			commonjs({
				include: 'node_modules/**',
			}),
			resolve(),
			json(),
			multiEntry(),
		],
	},
]
