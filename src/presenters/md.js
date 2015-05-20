var fs = require('fs');
var path = require('path');
var utils = require('../utils');

function present(data, cb) {
	switch (data.type) {
		case 'suite-result':
			cb(null, renderSuite(data, 0));
			break;

		case 'test-result':
			cb(null, renderTest(data));
			break;

		default:
			cb(new Error('type of data not supported for presentation.'));
	}
};

function testInfo(test) {
	return Math.round(100000 / test.avg) / 100 + 'ops ± ' + test.err + '%';
}

function header(title, indent) {
	var s = '##';
	for (var i = 0; i < indent; i++) {
		s += '#';
	}
	s += title;
	return s;
}

function renderSuite(suite, indent) {
	var s = suite.name ? header(suite.name, indent) + '\r\n' : '';
	var i;

	if (suite.tests && suite.tests.length) {
		s += '\r\n|name|time ± error margin|';
		s += '\r\n|---|-----|';

		for (i = 0; i < suite.tests.length; i++) {
			var test = suite.tests[i];
			s += '\r\n|' + test.name + '|' + testInfo(test) + '|';
		}
		
		if (suite.tests.length > 1) s += '\r\n' + utils.fastestVsSecond(suite.tests);
		
		s += '\r\n';
	}

	if (suite.suites && suite.suites.length) {
		for (i = 0; i < suite.suites.length; i++) {
			s += '\r\n' + renderSuite(suite.suites[i], indent + 1);
		}
	}

	return s;
}

function renderTest(test) {
	return test.name + ': ' + testInfo(test);
}

present.writeFile = function (filename) {
	filename = path.resolve(filename);
	return function (data, cb) {
		present(data, function (err, value) {
			value = '#Performance'
				+ '\r\nStats are provided by [arewefaster](https://github.com/danylaporte/arewefaster)\r\n\r\n'
				+ value;
			
			err ? cb && cb(err) : fs.writeFile(filename, value, cb);	
		});
	};
};

module.exports = present;