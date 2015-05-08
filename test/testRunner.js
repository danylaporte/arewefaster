var TestRunner = require('../src/testRunner');
var should = require('should');

describe('testRunner', function () {
	it('should returns results', function (done) {
		function func(cb) {
			//setTimeout(cb);
			cb();
		}
		
		function callback(results) {
			results.avg.should.be.a.Number;
			results.sd.should.be.a.Number;
			done();
		}
		
		var options = {};		
		new TestRunner(func, options, callback).execute();
	});
})