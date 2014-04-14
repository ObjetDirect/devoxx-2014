/*jshint node: true */
/*global casper: true */

/**
 * A pre-script for casper
 *
 * @module test/casper/pre-script
 * @version 1.0
 * @since 1.0
 * @author Julien Roche
 */
(function (casper) {
    'use strict';

    casper.echo('----------------------------------------------------------------------------------------------------');
    casper.echo('Call of the pre-script !!');

    casper.echo('----------------------------------------------------------------------------------------------------');
    casper.echo('Define some listeners');

    casper.on('complete.error', function (err) {
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
        casper.echo('Complete callback has failed: ' + err, 'ERROR');
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
    });

    casper.on('error', function (msg, backtrace) {
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
        casper.echo('Error catched: ' + msg, 'ERROR');
        casper.echo('With the associated backtrace: ' + JSON.stringify(backtrace, null, '\t'), 'ERROR');
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
    });

    casper.on('load.failed', function (loadError) {
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
        casper.echo('Load failed:' + JSON.stringify(loadError, null, '\t', 'ERROR'));
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
    });

    casper.on('page.error', function (msg, trace) {
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
        casper.echo('Error into the page: ' + msg, 'ERROR');
        casper.echo('With the associated trace: ' + JSON.stringify(trace, null, '\t'), 'ERROR');
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
    });

    casper.on('resource.error', function (resourceError) {
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
        casper.echo('Resource error: ' + JSON.stringify(resourceError, null, '\t'), 'ERROR');
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
    });

    casper.on('remote.message', function (message) {
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
        casper.echo('Resource message: ' + message);
        casper.echo('-------------------------------------------------------------------------------------------------', 'ERROR');
    });

    casper.echo('----------------------------------------------------------------------------------------------------');
    casper.echo('Casper configuration');
    casper.options.viewportSize = {
        'width': 1920,
        'height': 1080
    };

//    casper.options.clientScripts.push('test/casper/polyfills.js');

    casper.echo('----------------------------------------------------------------------------------------------------');

})(casper);
