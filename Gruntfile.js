/*jshint node:true, strict:false, camelcase:false */
/*global module: true */

/**
 * GruntJs configuration
 * To have some specifics tasks:
 *  - grunt clean
 *  - grunt dependencies
 *  - grunt server
 */
var path = require('path');

module.exports = function (grunt) {
    'use strict';

    // Define some global variables:
    var srcFolderPath = './bower_components/devoxx-2014-frontend/src',
        targetFolderPath = './target',
        tempWebAppBuildPath = targetFolderPath + '/webapp';


    // Grunt configuration
    grunt.initConfig({
        // -----------------------------------------------------------------------------------
        // -- Dependencies part
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
        },

        // -----------------------------------------------------------------------------------
        // -- Distribution part
        // RequireJS part
        'requirejs': {
            'build': {
                /**
                 * Configuration for the RequireJs compilation
                 * @see https://github.com/jrburke/r.js/blob/master/build/example.build.js
                 */
                'options': {
                    'appDir': srcFolderPath + '/javascripts',
                    'baseUrl': '.',
                    'mainConfigFile': srcFolderPath + '/javascripts/main.js',
                    'name': 'main',
                    'findNestedDependencies': true, // Detect require call into require / define modules and include these into the build.
                    'keepBuildDir': true,
                    'dir': tempWebAppBuildPath + '/javascripts',
                    'optimize': 'uglify2',
                    'skipDirOptimize': false,
                    'preserveLicenseComments': false,
                    'logLevel': 0,
                    'useSourceUrl': false,
                    'uglify': {
                        'toplevel': true,
                        'ascii_only': true,
                        'beautify': false,
                        'max_line_length': 10000,
                        'defines': {
                            'DEBUG': ['name', 'false']
                        },
                        'no_mangle': false // If you set to 'false', you will have some problems with angular, if you don't specify the injection. Like: function ($scope) ... insteadof ['$scope', function ($scope) ...]
                    },
                    'uglify2': {
                        'output': {
                            'beautify': false
                        },
                        'compress': {
                            'sequences': false,
                            'global_defs': {
                                'DEBUG': false
                            }
                        },
                        'warnings': true,
                        'mangle': false // If you set to 'false', you will have some problems with angular, if you don't specify the injection. Like: function ($scope) ... insteadof ['$scope', function ($scope) ...]
                    },
                    'optimizeCss': 'standard.keepLines',
                    'paths': {
                        'app/template': '../templates' // Base on the 'dir' option path. We override this path in the case we have done modifications and compression on these
                    }
                }
            }
        },

        // Less part
        // See https://github.com/less/less.js
        // See https://github.com/gruntjs/grunt-contrib-less
        'less': {
            'build': {
                'options': {
                    'compress': true,
                    'cleancss': true
                },
                'files': [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: srcFolderPath + '/stylesheets',      // Src matches are relative to this path.
                        src: ['style.less'], // Actual pattern(s) to match.
                        dest: tempWebAppBuildPath + '/stylesheets',   // Destination path prefix.
                        ext: '.css'   // Dest filepaths will have this extension.
                    }
                ]
            }
        },

        // Other parts
        'copy': {
            'build': {
                'files': [
                    {
                        'expand': true,
                        'cwd': srcFolderPath + '/',
                        'dest': tempWebAppBuildPath + '/',
                        'flatten': false,
                        'src': '**/*'
                    }
                ]
            }
        },

        'contrib-clean': {
            'options': {
                'force': true // We can clean external folders / files !!!
            },
            'all': {
                'src': [targetFolderPath]
            },
            'build': {
                'src': [tempWebAppBuildPath]
            },
            'requirejs': {
                'src': [tempWebAppBuildPath + '/javascripts-build']
            },
            'less': {
                'src': [tempWebAppBuildPath + '/**/*.less']
            }
        },

        'htmlmin': {
            'build': {
                'options': {
                    'removeComments': true,
                    'collapseWhitespace': true,
                    'removeAttributeQuotes': true,
                    'removeCDATASectionsFromCDATA': true,
                    'removeCommentsFromCDATA': true
                },
                'files': [
                    {
                        'expand': true,
                        'cwd': srcFolderPath + '/',
                        'flatten': false,
                        'src': ['index.html', '**/*.tmpl'],
                        'dest': tempWebAppBuildPath + '/'
                    }
                ]
            }
        },

        'imagemin': {
            'build': {
                'files': [{
                    'expand': true,
                    'cwd': srcFolderPath + '/',
                    'flatten': false,
                    'src': ['**/*.{gif,jpeg,jpg,png}'],
                    'dest': tempWebAppBuildPath + '/'
                }]
            }
        },

        'svgmin': {
            'build': {
                'files': [
                    {
                        'expand': true,
                        'cwd': srcFolderPath + '/',
                        'flatten': false,
                        'src': ['**/*.svg'],
                        'dest': tempWebAppBuildPath + '/'
                    }
                ]
            }
        },

        'manifest': {
            'build': {
                'options': {
                    'basePath': tempWebAppBuildPath,
                    'network': ['*'],
                    'preferOnline': true,
                    'timestamp': true
                },
                'src': [ '**/*.{txt,html,htm,tmpl,svg,png,jpg,jpeg,gif,tiff,swf,js,json,css,otf,eot,ttf,woff}' ],
                'dest': tempWebAppBuildPath + '/manifest.appcache'
            }
        },

        'combine': {
            'build': {
                'input': tempWebAppBuildPath + '/index.html',
                'output': tempWebAppBuildPath + '/index.html',
                'tokens': [
                    {
                        'token': '<html',
                        'string': '<html manifest=manifest.appcache'
                    },
                    {
                        'token': '<script type=text/javascript charset=UTF-8 defer=defer src=./frameworks/less/less-1.6.3.js></script>',
                        'string': ' ' // Cannot set an empty character ...
                    },
                    {
                        'token': 'type=text/less',
                        'string': 'type=text/css' // Cannot set an empty character ...
                    },
                    {
                        'token': '.less',
                        'string': '.css'
                    }
                ]
            }
        },

        'uglify': {
            'build': {
                'files': [
                    {
                        'expand': true,
                        'cwd': tempWebAppBuildPath + '/',
                        'flatten': false,
                        'src': ['frameworks/**/*.js', 'nls/**/*.js'],
                        'dest': tempWebAppBuildPath
                    }
                ]
            }
        },

        'strip': {
            'build': {
                'src': tempWebAppBuildPath + '/**/*.js',
                'options': {
                    'inline': true,
                    'nodes': ['console.log', 'console.warn', 'console.error', 'console.time', 'console.timeEnd']
                }
            }
        },

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
    });

    // Load grunt tasks from NPM packages
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-combine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-shell');

    grunt.renameTask('clean', 'contrib-clean');

    // A very basic defaukt task.
    grunt.registerTask('default', 'Log some stuff.', function () {
        grunt.log.write('Logging some stuff...').ok();
    });

    // Task for cleaning all files
    grunt.registerTask('clean', [
        'contrib-clean:all'
    ]);

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
                'contrib-clean:build',
                'copy:build',

                // -- Launch the server
                'shell:dev'
            ]);

        } else {
            // Compilation step
            grunt.task.run([
                // -- Clean & copy
                'contrib-clean:build',
                'copy:build',

                // -- Generate the CSS files
                'less',
                'contrib-clean:less',

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