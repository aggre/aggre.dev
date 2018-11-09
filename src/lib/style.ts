// tslint:disable:readonly-array
import postcss from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'

type StyleValues = string[]

const cache = new WeakMap<[TemplateStringsArray, StyleValues], string>()
const plugins: any[] = [postcssImport, postcssPresetEnv({ stage: 0 })]
const transform = async (css: string) =>
	postcss(plugins).process(css, { from: `${Math.random()}` })
const union = (strings: TemplateStringsArray, values: StyleValues) =>
	strings.reduce(
		(result, current, i) =>
			`${result}${current}${values[i] ? `${values[i]}` : ''}`,
		''
	)

export const style = async (
	strings: TemplateStringsArray,
	...values: StyleValues
) => {
	const key: [TemplateStringsArray, StyleValues] = [strings, values]
	return cache.has(key)
		? cache.get(key)
		: (processed => {
				const { css } = processed
				// tslint:disable-next-line:no-expression-statement
				cache.set(key, css)
				return css
		  })(await transform(union(strings, values)))
}
