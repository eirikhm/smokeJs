module.exports = function (grunt) {

    grunt.config('ts', {
        'build': {
            src: [
                "src/**/*.ts"
            ],
            options: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: true,
                declaration: true,
                removeComments: true
            },
            out:'dev/smoke.js'
        },
        'development-src': {
            src: [
                "src/**/*.ts"
            ],
            options: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: false,
                declaration: false,
                removeComments: true
            },
            out:'dev/smoke.js'
        },
        'development-tests':{
            src: [
                "tests/**/*.ts"
            ],
            outDir:'dev',
            options: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: true,
                declaration: false,
                removeComments: true,
                fast: 'always'
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
};