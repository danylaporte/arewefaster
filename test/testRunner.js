var Test = require('../src/test');
var testRunner = require('../src/testRunner');
var should = require('should');

describe('testRunner', function () {
	it('should returns results', function (done) {
		function func(cb) {
			setTimeout(cb);
		}
		
		function callback(results) {
			console.log(results);
			results.avg.should.be.a.Number;
			results.sd.should.be.a.Number;
			done();
		}
		
		testRunner(new Test('sample', func), callback);
	});
})