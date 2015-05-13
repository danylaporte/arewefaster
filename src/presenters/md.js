module.exports = function (data, cb) {
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
	return test.avg + 'ms ±' + test.err + '%';
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
	var s = header(suite.name, indent) + '\r\n';
	var i;
	
	if (suite.tests && suite.tests.length) {
		s += '\r\n|   |Value|';
		s += '\r\n|---|-----|';
		
		for (i = 0; i < suite.tests.length; i++) {
			var test = suite.tests[i];
			s += '\r\n|' + test.name + '|' + testInfo(test) + '|';
		}
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