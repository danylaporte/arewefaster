var suiteRunner = require('./suiteRunner');
var testRunner = require('./testRunner');

module = {
	run: function (testOrSuite, cb) {
		switch(testOrSuite && testOrSuite.type) {
			case 'suite':
				return suiteRunner(testOrSuite, cb);
			case 'test':
				return testRunner(testOrSuite, cb);
			default:
				throw new Error('not a valid test or suite.');
		}
	},
	presenters: {
		markdown: function (history) {
			return require('./presenters/mdPresenter')(history);
		}
	}
}