var testRunner = require('./testRunner');
var util = require('./util');

function SuiteRunner(suite, cb) {
    this.cb = cb;
    this.done = this.done.bind(this);
    this.execute = this.execute.bind(this);
    this.name = suite.name;
    this.suiteResults = [];
    this.suites = util.cloneArray(suite.suites);
    this.testResults = [];
    this.tests = util.cloneArray(suite.tests);
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
    execute: function () {
        var test = this.tests.pop();
        if (test) return testRunner(test, this.done);
        
        var suite = this.suites.pop();
        if (suite) return runSuite(suite, this.done);
        
        this.cb({
            name: this.name,
            tests: this.testResults,
            suites: this.suiteResults,
            type: 'suite-result'
        });
    }
}

function runSuite(suite, cb) {
    new SuiteRunner(suite, cb).execute();
}

module.exports = runSuite;