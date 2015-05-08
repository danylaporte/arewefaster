var TestRunner = require('./testRunner');

function SuiteRunner(suite, options, cb) {
    this.cb = cb;
    this.done = this.done.bind(this);
    this.duration = 0;
    this.execute = this.execute.bind(this);
    this.name = suite.name;
    this.results = [];
    this.runners = [];
    
    var tests = suite.tests;
    
    for (var k in tests) {
        var test = tests.hasOwnProperty(k) && tests[k];
        test && this.runners.unshift(new TestRunner({ func: test, name: k }, options, this.done));
    }
}

SuiteRunner.prototype = {
    done: function (results) {
        this.results.push(results);
        process.nextTick(this.execute);
    },
    execute: function () {
        var runner = this.runners.pop();
        runner ? runner.execute() : this.cb({ name: this.name, tests: this.results });
    }
}

module.exports = SuiteRunner;