/* jshint strict:false */
/* global CasperError, console, phantom, require */

var casper = require('casper').create({
    logLevel: 'debug',
    verbose: true,
    viewportSize: {width: 360, height: 600}
});

casper.test.begin('Checking navigation to dashboard and KPI values', 1, function (test) {

    casper.start('http://localhost:9000/index.html', function () {
        this.echo('Loaded');
    });

    casper.waitForUrl(/#\/users/, function () {
        this.echo('Users');
    });

    casper.thenClick('a[href="#/users/1/read"]', function () {
        this.echo('Clicked on detail for first user')
    });

    casper.waitForUrl(/#\/users\/1/, function () {
        this.echo('User 1 displayed');
    });

    casper.then(function () {
        this.echo('Evaluating coverage');
        var covData = this.evaluate(function() {
            return JSON.stringify(window.__coverage__);
        });
        this.echo(covData);
    });

    casper.run();

});

casper.test.on("exit", function() {
    this.echo('Exiting');
    var covData = this.evaluate(function() {
        return JSON.stringify(window.__coverage__);
    });
    this.echo(covData);
    var options = {
        port: 9000,
        host: "localhost",
        path: "/coverage/client",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };
    var req = http.request(options, function (res) {
        console.log("\nFinished sending coverage data.");
        done();
        casper.exit();
    });
    req.write(covData);
    req.end();
});

