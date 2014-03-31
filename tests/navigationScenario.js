/* jshint strict:false */
/* global CasperError, console, phantom, require */

var casper = require('casper').create({
    logLevel: 'debug',
    verbose: true,
    viewportSize: {width: 360, height: 600}
});

casper.test.begin('Checking navigation to dashboard and KPI values', 1, function (test) {

    casper.start('http://localhost:9000/devoxx-214/index.html', function () {
        this.echo('Loaded');
    });

    casper.waitForUrl(/#login/, function () {
        this.echo('Login required');
    });

    casper.then(function () {
        this.fill('form#login-form', {
            'login': 'wsall',
            'password': 'test'
        }, false);
    });

    casper.thenClick('button[type="submit"]', function () {
        this.echo('Clicked on submit button')
    });

    casper.waitForUrl(/#home/, function () {
        this.echo('Redirect to home');
    });

    casper.waitFor(function check() {
        return this.evaluate(function () {
            return document.querySelectorAll('#home-page').length > 0;
        });
    }, function then() {
        this.capture('home.png');
    });

    casper.thenClick('#go-dashboard', function () {
        this.echo('Clicked on dashboard button')
    });

    casper.waitForUrl(/#dashboard/, function () {
        this.echo('Accessing dashboard');
        this.capture('dashboard.png');
    });

    casper.waitFor(function check() {
        return this.evaluate(function () {
            return document.querySelectorAll('#supervision>ul>li [class=tdb-kpi-cont] > span').length === 3;
        });
    });

    casper.waitFor(function check() {
        return this.evaluate(function () {
            return (document.querySelectorAll('#ticketing>ul>li [class=tdb-kpi-cont] > span').length === 3)
                && (document.querySelector('#ticketing>ul>li [class=tdb-kpi-cont] > span')[0] !== '<i class="fa fa-spinner fa-spin"></i>')
                && (document.querySelector('#ticketing>ul>li [class=tdb-kpi-cont] > span')[1] !== '<i class="fa fa-spinner fa-spin"></i>')
                && (document.querySelector('#ticketing>ul>li [class=tdb-kpi-cont] > span')[2] !== '<i class="fa fa-spinner fa-spin"></i>');
        });
    });

    casper.then(function () {
        test.assertEval(function () {
            var kpiSupervision = document.querySelectorAll('#supervision>ul>li .tdb-kpi-cont > span');
            return kpiSupervision[0].innerText === '3+' && kpiSupervision[1].innerText === '121' && kpiSupervision[2].innerText === '';
        }, 'Checking dashboard supervision KPI');

        test.assertEval(function () {
            var nbSupervision = document.querySelectorAll('#supervision>ul>li .tdb-icon-and-nb .tdb-nb');
            return nbSupervision[0].innerText === '10' && nbSupervision[1].innerText === '145' && nbSupervision[2].innerText === '15';
        }, 'Checking dashboard supervision nb');

        test.assertEval(function () {
            var kpiTicketing = document.querySelectorAll('#ticketing>ul>li .tdb-kpi-cont > span');
            return kpiTicketing[0].innerText === '3+' && kpiTicketing[1].innerText === '' && kpiTicketing[2].innerText === '121';
        }, 'Checking dashboard ticketing KPI');

        test.assertEval(function () {
            var kpiTicketing = document.querySelectorAll('#ticketing>ul>li .tdb-icon-and-nb .tdb-nb');
            return kpiTicketing[0].innerText === '10' && kpiTicketing[1].innerText === '786' && kpiTicketing[2].innerText === '145';
        }, 'Checking dashboard ticketing KPI');

        this.capture('dashboard-kpi.png');
    });

    casper.run();

});

