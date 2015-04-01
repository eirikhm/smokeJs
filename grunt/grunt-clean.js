module.exports = function (grunt) {

    grunt.config('clean', {
        development: {
            src: [ 'dev/*', 'build-result/*' ]
        },
        test: {
            src: [ '.tscache' ]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
};
