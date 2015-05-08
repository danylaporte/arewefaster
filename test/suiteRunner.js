var SuiteRunner = require('../src/suiteRunner');
var should = require('should');

describe('suiteRunner', function () {
	it('should returns results', function (done) {

		var tests = {
			test1: function (cb) {
				setTimeout(cb, 1);
			},
			test2: function (cb) {
				setTimeout(cb, 2);
			}
		};
		
		var options = {
			maxDuration: 500
		};
		
		function callback(results) {
			console.log(results);
			done();
		}
		
		new SuiteRunner(tests, options, callback).execute();
	});
})