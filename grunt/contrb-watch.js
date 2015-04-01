module.exports = function (grunt) {

    grunt.config('watch', {
        stylesheets: {
            files: 'src/**/*.less',
            tasks: [ 'newer:less']
        },
        'typescript-src': {
            files: [
                'src/**/*.ts',
                'src/*.ts'
            ],
            tasks: [
                'ts:development-src'
            ],
            options: {
                spawn: false
            }
        },
        'typescript-tests': {
            files: [
                'tests/**/*.ts'
            ],
            tasks: [
                'ts:development-tests'
            ],
            options: {
                spawn: false
            }
        },

        development: {
            files: [
                'src/js/templates/**',
                'resources/images/**',
                'resources/css/**'
            ],
            tasks: [ 'newer:copy:development']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};
