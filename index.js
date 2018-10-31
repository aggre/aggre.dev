const { parse } = require('url')
const { readFile } = require('fs')
const { promisify } = require('util')
const handler = require('serve-handler')
const options = require('./serve.json')

module.exports = async (req, res) => {
	const { pathname } = parse(req.url)
	if (/\..+$/.test(pathname)) {
		handler(req, res, options)
	} else {
		return promisify(readFile)(
			`${__dirname}/dist/index.html`,
			'utf-8'
		)
	}
}
