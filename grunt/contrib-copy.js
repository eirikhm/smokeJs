module.exports = function (grunt) {
    grunt.config('copy', {
        development: {
            files: [
                {expand: true, cwd: './', flatten: false, src: ['lib/**'], dest: 'dev/'},
                {expand: true, cwd: './', flatten: false, src: ['resources/**'], dest: 'dev/'},

                {expand: true, cwd: './', flatten: false, src: ['tests/test-main.js'], dest: 'dev/'},
                {expand: true, cwd: './', flatten: true, src: ['src/index.html'], dest: 'dev/'}
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
