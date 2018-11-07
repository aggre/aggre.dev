const writeFile = require('write')
const micro = require('micro')
const handler = require('serve-handler')
const puppeteer = require('puppeteer')
const {listFiles} = require('list-files-in-dir')
const options = require('./serve.json')
const port = 5000
const format = h => (typeof h === 'string' ? h.replace(/<\!---->/g, '') : h)
const write = async (path, content) => writeFile.promise(path, content)
const getHTML = page => async pathname => Promise.all([
	page.goto(`http://localhost:${port}${pathname}`, {
		waitUntil: 'networkidle0'
	}),
	page.waitForSelector('x-app > *')
]).then(() => page.content()).then(html => html)


;(async () => {
	const serve = await micro((req, res) => handler(req, res, options)).listen(port)
	const pages = await listFiles('content').then(fls => fls.filter(f => f.endsWith('.md')).map(f => f.replace(`${__dirname}/content`, '').replace('.md', '')))
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	})
	const page = await browser.newPage()
	const ssr = getHTML(page)
	const htmls = await Promise.all(pages.map(page => ssr(page)))
	await page.close()
	await browser.close()
	await Promise.all(pages.map((page, i) => write(`.rendered${page}.html`, format(htmls[i]))))
	serve.close()
	console.log('completed!!!')
})()
