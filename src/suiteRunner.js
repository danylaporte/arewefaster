var debug = require('debug')('arewefaster:suiteRunner');
var testRunner = require('./testRunner');
var utils = require('./utils');

function SuiteRunner(suite, options, cb) {
    this.cb = cb || typeof options === 'function' && options || utils.noop;
    this.done = this.done.bind(this);
    this.execute = this.execute.bind(this);
    this.name = suite.name;
    this.options = options;
    this.suiteResults = [];
    this.suites = utils.cloneArray(suite.suites);
    this.testResults = [];
    this.tests = utils.cloneArray(suite.tests);
    debug('start suite ' + suite.name);
    this.emit('suite-start', suite.name);
}

SuiteRunner.prototype = {
    done: function (err, results) {
        if (err) {
            this.cb(err);
        } else {

            switch (results.type) {

                case 'test-result':
                    this.testResults.push(results);
                    break;

                case 'suite-result':
                    this.suiteResults.push(results);
                    break;
            }

            process.nextTick(this.execute);
        }
    },
    emit: function (name, value) {
        this.options && this.options.reporter && this.options.reporter.emit(name, value);
    },
    execute: function () {
        var test = this.tests.shift();
        if (test) return testRunner(test, this.options, this.done);

        var suite = this.suites.shift();
        if (suite) return runSuite(suite, this.options, this.done);

        debug('suite ' + this.name + ' completed');

        var result = {
            name: this.name,
            tests: this.testResults,
            suites: this.suiteResults,
            type: 'suite-result'
        };

        this.emit('suite-end', result);
        this.cb(null, result);
    }
}

function runSuite(suite, options, cb) {
    new SuiteRunner(suite, options, cb).execute();
}

module.exports = runSuite;