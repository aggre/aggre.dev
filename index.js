const { parse } = require('url')
const micro = require('micro')
const handler = require('serve-handler')
const puppeteer = require('puppeteer')
const options = require('./serve.json')
const port = 5000
const format = h => (typeof h === 'string' ? h.replace(/<\!---->/g, '') : h)

micro((req, res) => handler(req, res, options)).listen(port)

module.exports = async (req, res) => {
	const { pathname } = parse(req.url)

	if (/\..+$/.test(pathname)) {
		return handler(req, res, options)
	}
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	})
	const page = await browser.newPage()
	await Promise.all([
		page.goto(`http://localhost:${port}${pathname}`, {
			waitUntil: 'networkidle0'
		}),
		page.waitForSelector('x-app > *')
	])
	const html = await page.content()
	await browser.close()
	return format(html)
}
