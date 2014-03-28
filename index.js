/*jshint node: true */
/*global require: true */

/**
 * We declare here our nodeJs server, that will produce the REST api and publish our application
 *
 * @author Julien Roche
 * @version 1.0
 * @since 1.0
 */

'use strict';

console.log('Start to initialize our server');

// First, load required modules
var
    /**
     * Express instance to have some tools to produce easily our REST api
     * @type {Object}
     */
    express = require('express'),

    /**
     * Express application instance
     * @type {express}
     */
    app = express(),

    /**
     * User REST api
     * @type {exports}
     */
    userRestApi = require('devoxx-2014-backend/rest/user'),

    /**
     * Server configuration
     * @type {exports}
     */
    configurator = require('devoxx-2014-backend/config'),

    /**
     * Server port
     * @type {number}
     */
    port = process.env.PORT || 9000;

// ---------------------------------------------------------------------------------------------------------------------
// Add some mime-types
console.log('Define some mime types');
express.static.mime.define(
    {
        'text/cache-manifest': ['appcache'],
        'text/html': ['tmpl'],
        'text/less': ['less'],
        'image/svg+xml': ['svg'],
        'font/opentype': ['otf'],
        'application/vnd.ms-fontobject': ['eot'],
        'application/octet-stream': ['ttf'],
        'application/font-woff': ['woff']
    }
);

// ---------------------------------------------------------------------------------------------------------------------
// Classical configuration
console.log('Initialization of the server (with right configurations and middlewares)');
app.configure(function () {
    configurator(app);
	app.use(express.static(__dirname + '/node_modules/devoxx-2014-frontend/target/compiled-webapp'));
});

// ---------------------------------------------------------------------------------------------------------------------
// REST api definition
console.log('Start to initialize our REST api');
userRestApi(app);

// ---------------------------------------------------------------------------------------------------------------------
// And finally, run the server
app.listen(port);

console.log('Server started on port ' + port);