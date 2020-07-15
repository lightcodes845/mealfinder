module.exports = {
  staticFileGlobs: [
    './build/*.html',
    './build/*.png',
    './build/static/images/**.*',
    './build/static/media/**.*',
    './build/static/js/*.js',
    './build/static/css/*.css',
  ],
  swFilePath: './build/service-worker.js',
  // templateFilePath: './service-worker.tmpl',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  // navigateFallback: './200.html',
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  stripPrefix: './build',
  // handleFetch: false,
  // runtimeCaching: [{
  //   urlPattern: /this\\.is\\.a\\.regex/,
  //   handler: 'networkFirst'
  // }]
};
