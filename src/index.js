var interfaces = require('./interfaces');
var path = require('path');
var Suite = require('./suite');
var suiteRunner = require('./suiteRunner');
var testRunner = require('./testRunner');

function run(testOrSuite, cb) {
	switch(testOrSuite && testOrSuite.type) {
		case 'suite':
			return suiteRunner(testOrSuite, cb);
		case 'test':
			return testRunner(testOrSuite, cb);
		default:
			throw new Error('not a valid test or suite.');
	}
}

module.exports.run = run;

module.exports.runFiles = function (files, cb) {
	if (!Array.isArray(files)) files = [files];
	
	var context = { suite: new Suite(null) };
	interfaces.tdd(context);

	for (var i = 0; i < files.length; i++) {
		require(path.resolve(files[i]));
	}

	run(context.suite, cb);
};

module.exports.presenters = {
	markdown: function (history) {
		return require('./presenters/mdPresenter')(history);
	}
};