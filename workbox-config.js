module.exports = {
  globDirectory: 'build',
  globPatterns: [
    '**/*.{js,svg}',
    '*.html',
    '*.png',
    // 'static/images/**.*',
    'static/media/**.*',
    'static/js/*.js',
    'static/css/*.css',
  ],
  swDest: './build/service-worker.js',
  swSrc: 'src/sw.js',
};
