'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/tmp'],
        },
        generateTranslations: {
            options: {
                path: 'test/tmp/'
            },
            article: {
                src: ['test/fixture/*.yml']
            },
            comments: {
                src: ['test/fixture/comments.yml']
            }
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/test.js'],
        }/*,
        lineending: {
            options: {
                eol: 'lf',
                overwrite: true
            },
            files: ['test/expected/*.*', 'test/files/*.*']
        }*/
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    //grunt.loadNpmTasks('grunt-lineending');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'generateTranslations', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
