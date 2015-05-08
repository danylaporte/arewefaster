var SuiteRunner = require('../src/suiteRunner');
var should = require('should');

describe('suiteRunner', function () {
	it('should returns results', function (done) {
		
		var suite = {
			name: 'comparison #1',
			tests: {
				test1: function (cb) {
					setTimeout(cb, 1);
				},
				test2: function (cb) {
					setTimeout(cb, 2);
				}
			}
		};
		
		var options = {
			maxSample: 1000,
			maxDuration: 500
		};
		
		function callback(results) {
			results.name.should.equal('comparison #1');
			done();
		}
		
		new SuiteRunner(suite, options, callback).execute();
	});
})