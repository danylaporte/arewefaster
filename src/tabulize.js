module.exports = function (data) {
	var tables = tabulize(data);
	return reorganizeInArray(tables);
}

function detectType(data) {
	for (var k in data) {
		var item = data.hasOwnProperty(k) && data[k];
		return item && item.type;
	}
}

function nameComparer(a, b) {
	return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

function reorganizeInArray(tables) {
	var results = [];
	
	for (var tableName in tables) {
		var table = tables.hasOwnProperty(tableName) && tables[tableName];
		if (!table) continue;
		
		var tableResult = { cols: [], name: tableName, rows: [] };
		results.push(tableResult);
		
		for (var colName in table.cols) {
			var col = table.cols.hasOwnProperty(colName) && table.cols[colName];
			col && tableResult.cols.push(colName);
		}
		
		for (var rowName in table.rows) {
			var row = table.rows.hasOwnProperty(rowName) && table.rows[rowName];
			if (!row) continue;
			
			var rowResult = { name: rowName, cells: {} };
			tableResult.rows.push(rowResult);
			
			for (var cellName in row) {
				var cell = row.hasOwnProperty(cellName) && row[cellName];
				cell && rowResult.cells.push(cell);
			}
		}
		
		tableResult.cols.sort();
		tableResult.rows.sort(nameComparer);
	}
	
	results.sort(nameComparer);
	return results;
}

function tabulize(data) {
	var type = detectType(data);
	switch (type) {
		case 'suitesHistory':
			return tabulizeSuitesHistory(data);
		case 'suites':
			return tabulizeSuites(data);
		default:
			throw new Error('unsupported data type.'); 
	}
}

function tabulizeSuite(suite) {
	var tables = {};
	
	for (var suiteName in suites) {
		var tests = suites.hasOwnProperty(suiteName) && suites[suiteName];
		if (!tests) continue;
		
		for (var testName in tests) {
			var test = tests.hasOwnProperty(testName) && tests[testName];
			if (!test) continue;
			
			var table = tables[suiteName] || (tables[suiteName] = {	cols: {}, rows: {} });
			table.cols['duration'] = true;
			
			var row = table.rows[testName] || (table.rows[testName] = {});
			row['duration'] = test.avg + 'ms ' + '±' + test.err + '%';
		}
	}
	
	return tables;
}


function tabulizeSuites(suites) {
	var tables = {};
	
	for (var suiteName in suites) {
		var tests = suites.hasOwnProperty(suiteName) && suites[suiteName];
		if (!tests) continue;
		
		for (var testName in tests) {
			var test = tests.hasOwnProperty(testName) && tests[testName];
			if (!test) continue;
			
			var table = tables[suiteName] || (tables[suiteName] = {	cols: {}, rows: {} });
			table.cols['duration'] = true;
			
			var row = table.rows[testName] || (table.rows[testName] = {});
			row['duration'] = test.avg + 'ms ' + '±' + test.err + '%';
		}
	}
	
	return tables;
}

function tabulizeSuitesHistory(dates) {
	var tables = {};
	
	for (var dateName in dates) {
		var suites = dates.hasOwnProperty(dateName) && dates[dateName];
		if (!suites) continue;
		
		for (var suiteName in suites) {
			var tests = suites.hasOwnProperty(suiteName) && suites[suiteName];
			if (!tests) continue;
			
			for (var testName in tests) {
				var test = tests.hasOwnProperty(testName) && tests[testName];
				if (!test) continue;
				
				var table = tables[suiteName] || (tables[suiteName] = {	cols: {}, rows: {} });
				table.cols[dateName] = true;
				
				var row = table.rows[testName] || (table.rows[testName] = {});
				row[dateName] = test.avg + 'ms ' + '±' + test.err + '%';
			}
		}
	}
	
	return tables;
}