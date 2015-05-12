var should = require('should');
var Suite = require('../src/suite');
var suiteRunner = require('../src/suiteRunner');
var Test = require('../src/test');

describe('suiteRunner', function () {
	it('should returns results', function (done) {
		
		var options = { maxDuration: 200 };
		
		var suite = new Suite('suite 1');
		suite.tests.push(
			new Test('test 1', function (cb) { setTimeout(cb, 1); }, options),
			new Test('test 2', function (cb) { setTimeout(cb, 2); }, options)
		);
		
		suiteRunner(suite, function (result) {
			console.log(result);
			done();
		});
	});
});