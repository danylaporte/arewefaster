var debug = require('debug')('arewefaster:suiteRunner');
var testRunner = require('./testRunner');

function cloneArray(array) {
    if (!array) return [];
    var newArray = new Array(array.length);
    
    for (var i = 0; i < array.length; i++) {
        newArray[i] = array[i];
    }
    
    return newArray;
}

function noop() { };

function SuiteRunner(suite, options, cb) {
    this.cb = cb || typeof options === 'function' && options || noop;
    this.done = this.done.bind(this);
    this.execute = this.execute.bind(this);
    this.name = suite.name;
    this.options = options;
    this.suiteResults = [];
    this.suites = cloneArray(suite.suites);
    this.testResults = [];
    this.tests = cloneArray(suite.tests);
    debug('start suite ' + suite.name);
    this.emit('suite-start', suite.name);
}

SuiteRunner.prototype = {
    done: function (results) {
        switch (results.type) {
            case 'test-result':
                this.testResults.push(results);
                break;
            case 'suite-result':
                this.suiteResults.push(results);
                break;
        }
        process.nextTick(this.execute);
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
        this.cb(result);
    }
}

function runSuite(suite, options, cb) {
    new SuiteRunner(suite, options, cb).execute();
}

module.exports = runSuite;