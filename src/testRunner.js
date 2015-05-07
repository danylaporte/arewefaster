function TestRunner(test, options, cb) {
    this.cb = cb;
    this.done = this.done.bind(this);
    this.duration = 0;
    this.execute = this.execute.bind(this);
    this.func = test.func;
    this.options = options;
    this.name = test.name;
    this.samples = [];
    this.start = null;
}

TestRunner.prototype = {
    done: function () {
        var v =  process.hrtime(this.start)[1]/1000000; // nano to ms
        this.samples.push(v);
        this.duration += v;
        process.nextTick(this.execute);
    },
    execute: function () {
        if ((this.options.maxSample && this.samples.length < this.options.maxSample) &&
            this.duration < options.maxDuration) {
            this.start = process.hrtime();
            this.func(this.done);
        } else {
            this.cb({
                name: this.name,
                duration: this.duration,
                samples: samples
            });
        }
    }
}

module.exports = TestRunner;