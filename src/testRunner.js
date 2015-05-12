var Stats = require('fast-stats').Stats;

function TestRunner(test, cb) {
	this.cb = cb;
	this.done = this.done.bind(this);
	this.execute = this.execute.bind(this);
	this.start = null;
	this.startDate = new Date();
	this.stats = new Stats();
    this.test = test;
}

TestRunner.prototype = {
	done: function () {
        this.stats.push(process.hrtime(this.start)[1]/1000000); // nano to ms
        process.nextTick(this.execute);
    },
	execute: function () {
		var avg = this.stats.amean();
		var err = Math.round((this.stats.moe()/avg)*10000)/100;
        
        if (new Date() - this.startDate < this.test.maxDuration || this.stats.length < 1 || this.err > this.test.targetError) {
            
            this.start = process.hrtime();
            this.test.func(this.done);
            
        } else {
            var r = this.stats.range();
            
            this.cb({
                avg: Math.round(avg*10000)/10000,
                err: err,
                max: Math.round(r[1]*10000)/10000,
                min: Math.round(r[0]*10000)/10000,
                name: this.test.name,
                sample: this.stats.length,
                sd: Math.round(this.stats.σ()*100)/100,
                type: 'test-result'
            });
        }
	}
};

module.exports = function (test, cb) {
	new TestRunner(test, cb).execute();
};