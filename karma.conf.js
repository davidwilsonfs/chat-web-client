const karmaWebpack = require('karma-webpack');
const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    // basePath: "./",
    frameworks: ['jasmine'],

    files: ['./src/index.spec.js'],

    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
      stats: 'verbose',
    },

    reporters: ['progress', 'coverage'], // , "teamcity"],

    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html', subdir: 'html' }, { type: 'text-summary' }],
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      'PhantomJS',
      //"Chrome"
    ],
    singleRun: false,
    concurrency: Infinity,
  });
};
