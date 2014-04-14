/*jshint node:true */
/*global module: true */

var path = require('path');

// Casper configuration
module.exports = function (grunt, options) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-casper');

    return {
        'tasks': {
            // Casper part
            'casper': {
                'options': {
                    'test' : true,
                    'parallel' : false, // Otherwise, we will have many reports ...
                    'engine': 'phantomjs',
                    'log-level' : 'debug',
                    'verbose': true,
                    'includes': options.testFolderPath + '/casper/pre-script.js'
                },
                'test': {
                    'src': [options.testFolderPath + '/casper/**/*SpecIhm.js'],
                    'dest': function() {
                        return options.targetFolderPath + '/report-test-xunit.xml';
                    }
                }
            },

            // Other parts
            'express': {
                'ihmtests': {
                    'options': {
                        'port': 9001,
                        'hostname': 'localhost',
                        'server': path.resolve(options.dirname, 'index.js'), // Prefer using this instead of 'bases': mostly faster !
                        'livereload': false
                    }
                }
            },

            'clean': {
                'ihmtests': {
                    'src': [options.targetFolderPath + '/report-test-xunit.xml', options.targetFolderPath + '/casper-screenshots']
                }
            }
        }
    };
};