/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/immutable-data */
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha'],
		plugins: ['karma-mocha', 'karma-mocha-reporter', 'karma-chrome-launcher'],
		files: [
			'node_modules/expect.js/index.js',
			'test/**/*.js',
			{
				pattern: 'content/**',
				included: false,
				served: true,
				watched: false,
				nocache: true,
			},
		],
		proxies: {
			'/asset': '/base/content/asset',
			'/page': '/base/content/page',
			'/post': '/base/content/post',
			'/index.md': '/base/content/index.md',
			'/post.md': '/base/content/index.md',
		},
		reporters: ['mocha'],
		singleRun: true,
		customLaunchers: {
			ChromiumHeadlessConfigured: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox', '--disable-setuid-sandbox'],
			},
		},
		browsers: ['ChromiumHeadlessConfigured'],
		browserConsoleLogOptions: {
			level: 'log',
			terminal: true,
		},
	})
}
