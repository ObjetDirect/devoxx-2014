/*jshint node: true */
/*global casper: true */

/**
 * A module to check the navigation
 *
 * @module test/casper/navigationSpecIhm
 * @version 1.0
 * @since 1.0
 * @author Frederic Dubois
 */
(function (casper) {
    'use strict';

    casper.test.begin('Check navigation', 2, function suite(test) {
        casper.start();

        // Default route
        casper.open('http://localhost:9001/index.html');

        casper.waitForUrl(/#users/, function () {
            this.echo('Users');
        });

        casper.then(function() {
            test.assert(casper.getTitle().indexOf('Devoxx Application') === 0);
            test.assertUrlMatch(this.getCurrentUrl(), 'http://localhost:9001/index.html#users');
        });

        casper.run(function() {
            test.done();
        });
    });

})(casper);
