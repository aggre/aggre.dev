const { history } = window

export const routeChange = (next: string) => history.pushState(null, '', next)
