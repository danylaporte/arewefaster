var path = require('path');
var Suite = require('./suite');
var suiteRunner = require('./suiteRunner');
var testRunner = require('./testRunner');

var m = module.exports = {
	interfaces: require('./interfaces'),
	run: run,
	runFiles: runFiles,
	reporters: require('./reporters'),
	presenters: require('./presenters')
};

function run(testOrSuite, options, cb) {
	if (!options) options = {};
	if (options && !options.reporter) options.reporter = m.reporters.console();

	switch (testOrSuite && testOrSuite.type) {

		case 'suite':
			return suiteRunner(testOrSuite, options, cb);

		case 'test':
			return testRunner(testOrSuite, options, cb);

		default:
			throw new Error('not a valid test or suite.');

	}
}

function runFiles(files, options, cb) {
	if (!Array.isArray(files)) files = [files];

	var context = { suite: new Suite(null) };

	m.interfaces.tdd(context);

	for (var i = 0; i < files.length; i++) {
		require(path.resolve(files[i]));
	}

	run(context.suite, options, cb);
}