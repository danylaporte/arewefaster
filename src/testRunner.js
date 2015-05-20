var Stats = require('fast-stats').Stats;
var utils = require('./utils');

function TestRunner(test, options, cb) {
    this.cb = cb || typeof options === 'function' && options || utils.noop;
    this.done = this.done.bind(this);
    this.execute = this.execute.bind(this);
    this.options = options;
    this.start = null;
    this.startDate = new Date();
    this.stats = new Stats();
    this.test = test;

    this.emit('test-start', test.name);
}

TestRunner.prototype = {
    done: function () {
        var t = process.hrtime(this.start);
        this.stats.push(t[0] * 1000 + t[1] / 1000000); // nano to ms
        setImmediate(this.execute);
    },
    emit: function (name, value) {
        this.options && this.options.reporter && this.options.reporter.emit(name, value);
    },
    execute: function () {
        var avg = this.stats.amean();
        var err = Math.round((this.stats.moe() / avg) * 10000) / 100;
        var hasTimeout = new Date() - this.startDate >= (this.test.maxDuration || 1000);
        var hasReachedErrMargin = this.stats.length > 2 && err < (this.test.targetError || 5);

        if (hasTimeout || hasReachedErrMargin) {

            var r = this.stats.range();

            var result = {
                avg: avg,
                err: err,
                max: r[1],
                min: r[0],
                name: this.test.name,
                samples: this.stats.length,
                sd: this.stats.σ(),
                type: 'test-result'
            };

            this.emit('test-end', result);
            this.cb(null, result);
        } else {
            this.start = process.hrtime();
            this.test.func(this.done);
        }
    }
};

module.exports = function (test, options, cb) {
    new TestRunner(test, options, cb).execute();
};