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
        this.stats.push(process.hrtime(this.start)[1] / 1000000); // nano to ms
        process.nextTick(this.execute);
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
                avg: Math.round(avg * 10000) / 10000,
                err: err,
                max: Math.round(r[1] * 10000) / 10000,
                min: Math.round(r[0] * 10000) / 10000,
                name: this.test.name,
                samples: this.stats.length,
                sd: Math.round(this.stats.σ() * 100) / 100,
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