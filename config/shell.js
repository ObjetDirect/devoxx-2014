/*jshint node:true */
/*global module: true */


// Shell configuration
module.exports = function(grunt){
    'use strict';

    grunt.loadNpmTasks('grunt-shell');

    return {
        'tasks': {
            'shell': {
                'dev': {
                    'options': {
                        'stdout': true,
                        'stderr': true,
                        'failOnError': true
                    },
                    'command': 'node index.js 9100'
                },
                'dist': {
                    'options': {
                        'stdout': true,
                        'stderr': true,
                        'failOnError': true
                    },
                    'command': 'node index.js'
                }
            }
        }
    };
};