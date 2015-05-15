var path = require('path');
var Suite = require('./suite');
var suiteRunner = require('./suiteRunner');
var testRunner = require('./testRunner');
var utils = require('./utils');

var m = module.exports = {
	interfaces: require('./interfaces'),
	presenters: require('./presenters'),
	reporters: require('./reporters'),
	run: run,
	runFiles: runFiles
};

function run(testOrSuite, options, cb) {
	if (!options) options = {};
	if (options && !options.reporter) options.reporter = m.reporters.console();

	function callback(err, value) {
		if (!err && options.presenters) {
			utils.parallel1(options.presenters, value, function (err) {
				cb(err, err ? undefined : value);
			});
		} else {
			cb(err, value);
		}
	}

	switch (testOrSuite && testOrSuite.type) {

		case 'suite':
			return suiteRunner(testOrSuite, options, callback);

		case 'test':
			return testRunner(testOrSuite, options, callback);

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