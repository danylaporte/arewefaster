var interfaces = require('./interfaces');
var path = require('path');
var presenters = require('./presenters');
var reporters = require('./reporters');
var Suite = require('./suite');
var suiteRunner = require('./suiteRunner');
var testRunner = require('./testRunner');

function run(testOrSuite, options, cb) {
	if (!options) options = {};
	if (options && !options.reporter) options.reporter = reporters.console();
	
	switch(testOrSuite && testOrSuite.type) {
		case 'suite':
			return suiteRunner(testOrSuite, options, cb);
		case 'test':
			return testRunner(testOrSuite, options, cb);
		default:
			throw new Error('not a valid test or suite.');
	}
}

module.exports.run = run;

module.exports.runFiles = function (files, options, cb) {
	if (!Array.isArray(files)) files = [files];
	
	var context = { suite: new Suite(null) };
	interfaces.tdd(context);

	for (var i = 0; i < files.length; i++) {
		require(path.resolve(files[i]));
	}

	run(context.suite, options, cb);
};

module.exports.reporters = reporters;
module.exports.presenters = presenters;