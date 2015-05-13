function avgComparer(a, b) {
	return a.avg - b.avg;
}

function ConsoleReporter() {
	this.indent = 0;
	this.testResults = [];
}

ConsoleReporter.prototype = {
	emit: function (name, value) {
		switch (name) {
			case 'suite-start':
				this.writeFastest();
				value && this.write(value);
				this.indent++;
				break;
				
			case 'suite-end':
				this.writeFastest();
				console.log();
				this.indent--;
				break;
			
			case 'test-start':
				break;
				
			case 'test-end':
				this.write(value.name + ' ' + value.avg + 'ms ± ' + value.err + '% (' + value.samples + ' samples)');
				this.testResults.push(value);
				break;
		}
	},
	write: function (text) {
		var s = '';
		for (var i = 0; i < this.indent; i++) {
			s += '  ';
		}
		s += text;
		console.log(s);	
	},
	writeFastest: function () {
		if (this.testResults.length > 1) {
			this.testResults.sort(avgComparer);
			var fastest = this.testResults[0];
			var second = this.testResults[1];
			console.log();
			this.write(fastest.name + ' is ' + Math.round(fastest.avg * 100 / second.avg) / 100 + 'x faster than ' + second.name); 
		}
		
		this.testResults.length = 0;
	}
}

module.exports = function () {
	return new ConsoleReporter();
};