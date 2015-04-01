module.exports = function (grunt) {
    grunt.initConfig({
        pkg: require('./package.json')
    });

    grunt.loadTasks('grunt');

    grunt.registerTask('development',
        'Prepares for development, sets up watch.',
        [
            'clean:test',
            'clean:development',
            'copy:development',
            'ts:development-src',
            'ts:development-tests',
            'watch'
        ]
    );
};
