import { changeActive } from './navs'

const navs: ReadonlyArray<any> = [
	{
		label: 'test',
		link: '/test',
		active: true
	},
	{
		label: 'spec',
		link: '/spec',
		active: false
	}
]
// tslint:disable:no-expression-statement
describe('navs reducers', () => {
	it('changeActive', () => {
		expect(changeActive(navs, '/spec')).to.eql([
			{
				label: 'test',
				link: '/test',
				active: false
			},
			{
				label: 'spec',
				link: '/spec',
				active: true
			}
		])
	})
})
