function grouBySuite(data, options) {
	var suiteResults = {};
	
	for (var dateName in data) {
		var suites = data.hasOwnProperty(dateName) && data[dateName];
		if (!suites) continue;
		
		var date = new Date(dateName);
		if ((options.startDate && options.startDate > date) || (options.endDate && options.endDate < date)) continue;
		
		for (var suiteName in suites) {
			var suite = suites.hasOwnProperty(suiteName) && suites[suiteName];
			if (!suite) continue;
			
			for (var testName in suite) {
				var test = suite.hasOwnProperty(testName) && suite[testName];
				if (!test) continue;
				
				var suiteResult = suiteResults[suiteName] || (suiteResults[suiteName] = { testsByDate: {}, testsByName: {} });
				var testsByDate = suiteResult.testsByDate;
				var testByDate = testsByDate[dateName] || (testsByDate[dateName] = {});
				testByDate[testName] = test;
				suiteResult.testsByName[testName] = true;
			}
		}
	}
	
	return suiteResults;
}

function createTabular(suiteResults) {
	var array = [];
	var k;
	
	for (var suiteName in suiteResults) {
		var suite = suiteResults.hasOwnProperty(suiteName) && suiteResults[suiteName];
		if (!suite) continue;
		
		suite.name = suiteName;
		suite.dates = [];
		suite.testNames = [];
		
		for (k in suite.testsByDate) {
			suite.testsByDate.hasOwnProperty(k) && suite.dates.push({
				date: new Date(k),
				stats: suite.testsByDate[k]
			});
		}
		
		for (k in suite.testsByName) {
			suite.testsByName.hasOwnProperty(k) && suite.testNames.push(k);
		}
		
		suite.dates.sort(dateComparer);
		suite.testNames.sort();
		array.push(suite);
	}
	
	array.sort(nameComparer);
	return array;
}

function dateComparer(a, b) {
	return a.date - b.date;
}

function nameComparer(a, b) {
	return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;  
}

function pad2(n) {
	return n > 9 ? n : "0" + n;
}

function formatDate(d) {
	return pad2(d.getDate()) + '-' + pad2(d.getMonth() + 1) + '-' + d.getFullYear();
}

module.exports = function (data, options) {
	options = options || {};
	var suites = createTabular(grouBySuite(data, options));
	
	var s = '';
	
	for (var i = 0; i < suites.length; i++) {
		var suite = suites[i];
		var dates = suite.dates;
		var testNames = suite.testNames;
		var j;
		
		s += '###' + suite.name + '\r\n';
		s += '\r\n|   |';
		
		var formatDateFunc = options.formatDate || formatDate;
		
		for (j = 0; j < dates.length; j++) {
			s += formatDateFunc(dates[j].date) + '|';
		}
		
		s += '\r\n|---|';
	
		for (j = 0; j < dates.length; j++) {
			s += '---|';
		}
		
		for (j = 0; j < testNames.length; j++) {
			
			var testName = testNames[j];
			s += '\r\n|' + testName + '|';
			
			for (var k = 0; k < dates.length; k++) {
				var stats = dates[k].stats;
				var stat = stats.hasOwnProperty(testName) && stats[testName];
				s += stat ? stat.avg + 'ms ' + '±' + stat.err + '%' + '|' : '';
			}
		}
		
		s += '\r\n';
	}
	
	return s;
}