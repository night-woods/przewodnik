const withTM = require('next-transpile-modules')(['@przewodnik/ui'])

module.exports = withTM({
  reactStrictMode: true,
  images: { domains: ['images.unsplash.com'] },
})
