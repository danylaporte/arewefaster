var TestRunner = require('./testRunner');

function SuiteRunner(tests, options, cb) {
    this.cb = cb;
    this.done = this.done.bind(this);
    this.execute = this.execute.bind(this);
    this.results = [];
    this.tests = [];
    this.testName = null;
    
    for (var k in tests) {
        var func = tests.hasOwnProperty(k) && tests[k];
        typeof func === 'function' && this.tests.unshift({
            name: k, 
            runner: new TestRunner(func, options, this.done)
        });
    }
}

SuiteRunner.prototype = {
    done: function (results) {
        this.results.push({ name: this.testName, results: results });
        process.nextTick(this.execute);
    },
    execute: function () {
        var test = this.tests.pop();
        if (test) {
            this.testName = test.name;
            test.runner.execute();
        } else {
            this.cb(this.results);
        }
    }
}

module.exports = SuiteRunner;