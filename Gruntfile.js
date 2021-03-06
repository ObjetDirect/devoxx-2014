/*jshint node:true, strict:false, camelcase:false */
/*global module: true */

/**
 * GruntJs configuration
 * To have some specifics tasks:
 *  - grunt clean
 *  - grunt dependencies
 *  - grunt server
 */

module.exports = function (grunt) {
    'use strict';

    // Define some global variables:
    var srcFolderPath = './bower_components/devoxx-2014-frontend/src',
        targetFolderPath = './target',
        tempWebAppBuildPath = targetFolderPath + '/webapp';

    // Grunt configuration
    grunt.initConfig(
        require('load-grunt-configs')(
            grunt,
            {
                'srcFolderPath': srcFolderPath,
                'targetFolderPath': targetFolderPath,
                'tempWebAppBuildPath': tempWebAppBuildPath,
                'dirname': __dirname,
                'config': {
                    'src' : [
                        'config/*.js*',
                        'bower_components/devoxx-2014-frontend/config/clean.js',
                        'bower_components/devoxx-2014-frontend/config/dist.js'
                    ]
                }
            }
        )
    );

    // A very basic defaukt task.
    grunt.registerTask('default', 'Log some stuff.', function () {
        grunt.log.write('Logging some stuff...').ok();
    });

    // Task for the dependencies
    grunt.registerTask('dependencies', [
        'bower:install'
    ]);

    // Task for running the server
    grunt.registerTask('server', 'Run the Devoxx 2014 application', function (mode) {
        var modeToUse = 'dev';

        if (mode) {
            modeToUse = mode;
        }

        if (modeToUse === 'dev') {
            // Development step
            grunt.task.run([
                // -- Clean & copy
                'clean:build',
                'copy:build',

                // -- Launch the server
                'shell:dev'
            ]);

        } else {
            // Compilation step
            grunt.task.run([
                // -- Clean & copy
                'clean:build',
                'copy:build',

                // -- Generate the CSS files
                'less',
                'clean:less',

                // -- Minification
                'imagemin',
                'svgmin',
                'htmlmin',

                // -- Modify some files (to remove or replace some elements)
                'combine:build',
                'strip',

                // -- Minification using RequireJs
                'requirejs',

                // -- Minify frameworks JavaScript files
                'uglify',

                // -- At last, generate the HTML5 manifest
                'manifest',

                // -- Launch the server
                'shell:dist'
            ]);
        }
    });
};