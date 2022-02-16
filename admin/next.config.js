const withTM = require('next-transpile-modules')()
const nextTranslate = require('next-translate')

module.exports = withTM({
  reactStrictMode: true,
  images: { domains: ['images.unsplash.com'] },
  ...nextTranslate(),
})
