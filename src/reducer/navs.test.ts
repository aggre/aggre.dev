import { expect } from '@esm-bundle/chai'
import { changeActive } from './navs'

const navs: ReadonlyArray<{
	readonly label: string
	readonly link: string
	readonly active: boolean
}> = [
	{
		label: 'test',
		link: '/test',
		active: true,
	},
	{
		label: 'spec',
		link: '/spec',
		active: false,
	},
]

describe('navs reducers', () => {
	it('changeActive', () => {
		expect(changeActive(navs, '/spec')).to.be.eql([
			{
				label: 'test',
				link: '/test',
				active: false,
			},
			{
				label: 'spec',
				link: '/spec',
				active: true,
			},
		])
	})
})
