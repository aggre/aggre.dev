const micro = require('micro')
const handler = require('serve-handler')

micro(async (req, res) => {
	await handler(req, res, {
		public: 'dist',
		headers: [
			{
				source: '**',
				headers: [
					{
						key: 'cache-control',
						value: 'public, s-maxage=31536000'
					}
				]
			}
		]
	})
}).listen()
