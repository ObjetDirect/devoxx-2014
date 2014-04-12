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

/**
 * Istanbul code coverage middleware
 * @type {exports}
 */
var isCoverageEnabled = (process.env.COVERAGE == "true"),
    im = isCoverageEnabled && require('istanbul-middleware');

//before your code is require()-ed, hook the loader for coverage
if (isCoverageEnabled) {
    console.log('Hook loader for coverage - ensure this is not production!');
    console.log('Adding hook for ' + __dirname + '/node_modules/devoxx-2014-backend/rest');
    console.log('Adding hook for ' + __dirname + '/bower_components/devoxx-2014-frontend/');
    im.hookLoader(__dirname + '/node_modules/devoxx-2014');
    im.hookLoader(__dirname + '/node_modules/devoxx-2014-backend');
    im.hookLoader(__dirname + '/bower_components/devoxx-2014-frontend/');
    // cover all files except under node_modules
    // see API for other options
}

// First, load required modules
var
    /**
     * Express instance to have some tools to produce easily our REST api
     * @type {Object}
     */
    express = require('express'),

    /**
     * Mongoose library
     * @type {Mongoose}
     */
    mongoose = require('mongoose'),

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
    port = process.env.PORT || 9000,

    /**
     * Command line arguments
     * @type Array<string>
     */
    args = process.argv.slice(2);

if (args && args.length > 0) {
    port = parseInt(args[0], 10);
}

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
// MongoDB connection
console.log('Connection to mongoDB');

mongoose.connect('mongodb://localhost/devoxx-2014');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback() {
    // -----------------------------------------------------------------------------------------------------------------
	// Classical configuration
	console.log('Initialization of the server (with right configurations and middlewares)');
	app.configure(function () {
		configurator(app);
		app.use(express.static(__dirname + '/target/webapp'));
	});

// ---------------------------------------------------------------------------------------------------------------------
// add the coverage handler
if (isCoverageEnabled) {
    //enable coverage endpoints under /coverage
    console.log('Adding /coverage API for Rest coverage access');
    app.use('/coverage', im.createHandler());
}

    // -----------------------------------------------------------------------------------------------------------------
	// REST api definition
	console.log('Start to initialize our REST api');
	userRestApi(app);

    // -----------------------------------------------------------------------------------------------------------------
	// And finally, run the server
	app.listen(port);

	console.log('Server started on port ' + port);
});
