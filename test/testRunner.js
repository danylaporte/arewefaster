var TestRunner = require('../src/testRunner');
var should = require('should');

describe('testRunner', function () {
	it('should returns results', function (done) {
		var test = {
			func: function (cb) {
				//setTimeout(cb);
				cb();
			},
			name: 'sampleTest'
		};
		
		var options = {
			maxSample: 1000,
			maxDuration: 1000
		};
		
		function callback(results) {
			results.name.should.equal('sampleTest');
			results.avg.should.be.a.Number;
			results.sd.should.be.a.Number;
			done();
		}
		
		new TestRunner(test, options, callback).execute();
	});
})