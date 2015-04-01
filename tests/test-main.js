//var allTestFiles = [];
//var TEST_REGEXP = /Test\.js$/i;
//
//var pathToModule = function (path) {
//    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
//};
//
//Object.keys(window.__karma__.files).forEach(function (file) {
//    if (TEST_REGEXP.test(file)) {
//        // Normalize paths to RequireJS module names.
//        allTestFiles.push(pathToModule(file));
//    }
//});

var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Test\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths: {
        'jquery': 'lib/jquery/index',
        'underscore': 'lib/underscore/underscore',
        'backbone': 'lib/backbone/backbone',
        'sinon':'lib/sinonjs-built/pkg/sinon'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        hammerjs: {
            deps: ["jquery"],
            exports: "hammer"
        },
        "backbone-hammer": {
            deps: ["jquery-hammer"]
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "jquery.transit": {
            deps: ["jquery"]
        }
    },

    // dynamically load all test files
    deps: tests,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});