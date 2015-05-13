var presenters = require('../src/presenters');
var should = require('should');

describe('mdPresenter', function () {
	it('should returns a markdown', function (done) {
		
		presenters.md({
			name: 'sampleSuite',
			type: 'suite-result',
			tests: [
				{
					avg: 1,
					err: 5,
					name: 'sampleTest1',
					type: 'test-result'
				},
				{
					avg: 2,
					err: 4,
					name: 'sampleTest2',
					type: 'test-result'
				}
			]
		}, callback);
		
		function callback(err, result) {
			console.log(result);
			done();
		}
	});
})