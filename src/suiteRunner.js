var TestRunner = require('./testRunner');

function SuiteRunner(tests, name, options, cb) {
    this.cb = cb;
    this.done = this.done.bind(this);
    this.duration = 0;
    this.execute = this.execute.bind(this);
    this.name = name;
    this.options = options;
    this.results = [];
    this.runners = [];
    
    for (var k in tests) {
        var test = tests.hasOwnProperty(k) && tests[k];
        test && this.runners.unshift(new TestRunner(test, k, options, this.done));
    }
}

SuiteRunner.prototype = {
    done: function (results) {
        this.results.push(results);
        process.nextTick(this.execute);
    },
    execute: function () {
        var runner = this.runners.pop();
        runner ? runner.execute() : this.cb({ name: this.name, results: this.results });
    }
}

module.exports = SuiteRunner;