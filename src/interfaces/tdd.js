var Suite = require('../suite');
var Test = require('../test');

module.exports = function (context) {
	global.suite = function (name, func) {
		var backup = context.suite;
		var newSuite = context.suite = new Suite(name);

		backup.suites.push(newSuite);
		func();

		context.suite = backup;
	};

	global.test = function (name, func) {
		context.suite.tests.push(new Test(name, func));
	};
};