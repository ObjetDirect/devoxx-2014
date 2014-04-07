/*jshint node:true */
/*global module: true */

var path = require('path');

// Dependencies configuration
module.exports = function(){
    'use strict';

    grunt.loadNpmTasks('grunt-bower-task');

    return {
        'tasks': {
            // Bower part
            'bower': {
                'install': {
                    'options': {
                        // See https://github.com/yatskevich/grunt-bower-task#options
                        'verbose': true,
                        'install': true,
                        'cleanBowerDir': false,
                        'copy': false,
                        'bowerOptions': {
                            'forceLatest': false,
                            'production': true
                        }
                    }
                }
            }
        }
    };
};