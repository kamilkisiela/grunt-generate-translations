'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/tmp']
        },
        generateTranslations: {
            options: {
                path: 'test/tmp/',
                langs: ['pl', 'en']
            },
            article: {
                src: ['test/fixture/article.yml', 'test/fixture/comments.yml']
            },
            comments: {
                src: ['test/fixture/comments.yml']
            },
            multi: {
                src: ['test/fixture/multi.yml']
            }
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/test_parser.js', 'test/test_task.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'generateTranslations', 'nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);

};
