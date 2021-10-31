/* eslint-disable functional/no-expression-statement */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const write = require('write')
const micro = require('micro')
const handler = require('serve-handler')
const puppeteer = require('puppeteer')
const { listFiles } = require('list-files-in-dir')
const serveConfig = require('./serve.json')
const port = 5555
const format = (h) =>
	typeof h === 'string' ? h.replace(/<!---->|\s+?class="show"/g, '') : h
const getHTML = (browser) => async (pathname) => {
	console.info('render start', pathname)
	const page = await browser.newPage()
	await page.goto(`http://localhost:${port}${pathname}`, {
		waitUntil: 'domcontentloaded',
	})
	await page
		.waitForSelector('x-app > *', {
			timeout: 5000,
		})
		.catch(console.log)
	const html = await page.content()
	console.info('render end', pathname)
	return html
}
;(async () => {
	const serve = await micro((req, res) =>
		handler(req, res, serveConfig)
	).listen(port)
	const pages = await listFiles('content').then((fls) =>
		fls
			.filter((f) => f.endsWith('.md'))
			.map((f) =>
				f.replace(`${__dirname}/content`, '').replace(/(\.md|index)/g, '')
			)
	)
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	})
	const ssr = getHTML(browser)
	const htmls = await Promise.all(pages.map(ssr))
	await browser.close()
	await Promise.all(
		pages.map((page, i) => write(`dist${page}/index.html`, format(htmls[i])))
	)
	serve.close()
	console.log('completed!!!')
})()
