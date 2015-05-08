var SuiteRunner = require('./suiteRunner');
var TestRunner = require('./testRunner');

module = {
	evaluateFunc: function (func, options, cb) {
		if (typeof options === 'function') {
			cb = options;
			options = {};
		}
		new TestRunner(func, options, cb).execute();
	},
	evaluateSuite: function (suite, options, cb) {
		if (typeof options === 'function') {
			cb = options;
			options = {};
		}
		new SuiteRunner(suite, options, cb).execute();
	}
}