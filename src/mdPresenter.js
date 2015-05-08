function dateComparer(a, b) {
	return a.date - b.date;
}

function createTabularData(histories) {
	var dates = {};
	var tests = {};
	var datesArray = [];
	var testsArray = [];
	
	for (var i = 0; i < histories.length; i++) {
		var history = histories[i];
		var dateItem = dates[history.date.toString()] || (dates[history.date.toString()] = []);
		
		for (var j = 0; j < history.length; j++) {
			var stats = history[j];
			dateItem.push(stats);
			tests[dateItem.name] = true;
		}
	}
	
	for (var k in tests) {
		tests.objectOwnPropert(k) && testsArray.push(k);
	}
	
	for (var k in dates) {
		datesArray.push({
			date: k,
			stats: dates[k]
		});
	}
	
	datesArray.sort(dateComparer);
	testsArray.sort();
	
	return {
		dates: datesArray,
		tests: testsArray
	};
}

module.exports = function (results) {
		
	results = createTabularData(results);
	
	var dates = results.dates;
	var tests = results.tests;
	var s = '###' + this.results.name + '\r\n';
	
	s += '\r\n|  |';
	
	for (var i = 0; i < dates.length; i++) {
		var col = dates[i];
		s += col.date + '|';
	}
	
	s += '\r\n|--|';
	
	for (var i = 0; i < dates.length; i++) {
		s += '--|';
	}
	
	for (var i = 0; i < tests.length; i++) {
		var test = tests[i];
		s += '\r\n|' + test + '|';
		
		for (var j = 0; j < dates[j]; j++) {
			var dateItem = dates[j];
			var stat = dateItem.stats[test];
			s += stat ? stat.avg + 'ms ' + '±' + stat.errorMargin + '%' + '|' : '';	
		}
	}
	
	s += '\r\n';
	return s;
}