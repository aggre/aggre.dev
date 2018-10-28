import multiEntry from 'rollup-plugin-multi-entry'
import rollupConfig from './rollup.config'

export default {
	...rollupConfig,
	...{
		input: './src/**/*.test.ts',
		plugins: [...rollupConfig.plugins, ...[multiEntry()]],
		output: {
			...rollupConfig.output,
			...{
				file: './src/test.js'
			}
		}
	}
}
