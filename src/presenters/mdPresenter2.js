module.exports = function (data) {
	var i;
	var cols = data.cols;
	var rows = data.rows;
	var s = '###' + data.name + '\r\n';
	
	s += '\r\n|   |';
	
	for (i = 0; i < cols.length; i++) {
		var col = cols[i];
		s += col.header + '|';
	}
	
	s += '\r\n|---|';
	
	for (i = 0; i < cols.length; i++) {
		s += '---|';
	}	
	
	for (i = 0; i < rows.length; i++) {
		var row = rows[i];
		var cells = row.cells;
		
		s += '\r\n|' + row.name + '|';
		
		for (var j = 0; j < cells.length; j++) {
			s += (cells[j] || '') + '|';
		}
	}
	
	return s;
}