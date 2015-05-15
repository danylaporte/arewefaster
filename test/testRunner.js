var assert = require('assert');
var should = require('should');
var Test = require('../src/test');
var testRunner = require('../src/testRunner');

describe('testRunner', function () {
	it('should returns results', function (done) {
		function func(cb) {
			setTimeout(cb);
		}

		function callback(err, results) {
			console.log(results);
			assert(err === null);
			results.avg.should.be.a.Number;
			results.sd.should.be.a.Number;
			done();
		}

		testRunner(new Test('sample', func), callback);
	});
})