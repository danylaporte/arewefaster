function Suite(name) {
	this.name = name;
	this.suites = [];
	this.tests = [];
	this.type = 'suite';
}

module.exports = Suite;