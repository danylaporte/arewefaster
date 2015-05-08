var Stats = require('fast-stats').Stats;

function TestRunner(func, options, cb) {
    this.cb = cb;
    this.done = this.done.bind(this);
    this.duration = 0;
    this.execute = this.execute.bind(this);
    this.func = func;
    this.options = {
        maxDuration: options.maxDuration || 1000,
        maxSample: options.maxSample || 10000
    };
    this.start = null;
    this.stats = new Stats({ sampling: true, store_data: false });
}

TestRunner.prototype = {
    done: function () {
        var v =  process.hrtime(this.start)[1]/1000000; // nano to ms
        this.stats.push(v);
        this.duration += v;
        process.nextTick(this.execute);
    },
    execute: function () {
        if ((this.options.maxSample && this.stats.length < this.options.maxSample) &&
            this.duration < this.options.maxDuration) {
            this.start = process.hrtime();
            this.func(this.done);
        } else {
            var avg = this.stats.amean();
            var r = this.stats.range();
            
            this.cb({
                avg: Math.round(avg*10000)/10000,
                duration: Math.round(this.duration*100)/100,
                errorMargin: Math.round((this.stats.moe()/avg)*10000)/100,
                max: Math.round(r[1]*10000)/10000,
                min: Math.round(r[0]*10000)/10000,
                sd: Math.round(this.stats.σ()*100)/100,
                samples: this.stats.length
            });
        }
    }
}

module.exports = TestRunner;