import { Navs, Nav } from '../store/navs'

const createNav = ({ link, label, active }: Nav): Nav => ({
	link,
	label,
	active,
})

export const changeActive = (navs: Navs, link: string): readonly Nav[] =>
	navs.map(({ link: originalLink, label }) =>
		createNav({
			link: originalLink,
			label,
			active: originalLink === link,
		})
	)
