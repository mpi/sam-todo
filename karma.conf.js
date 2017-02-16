'use strict';

module.exports = function (karma) {
  karma.set({
    
    files: [
      'node_modules/lodash/lodash.js',
      'src/**/*.spec.js',
      'test/**/*.spec.js'
    ],
    frameworks: ['jasmine', /*'browserify',*/ 'source-map-support'],
    reporters: ['spec', 'brackets'],

//    preprocessors: {
//      'src/**/*.spec.js': ['browserify'],
//      'test/**/*.spec.js': ['browserify']
//    },

    browsers: ['PhantomJS' ],
//    browsers: ['Chrome'],

    logLevel: 'LOG_DEBUG',

    singleRun: true,
    autoWatch: false //,

    // browserify configuration
//    browserify: {
//      debug: true,
//      transform: ['brfs', 'browserify-shim']
//    }
  });
};
