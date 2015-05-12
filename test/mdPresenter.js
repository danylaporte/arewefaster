var mdPresenter = require('../src/presenters/mdPresenter');
var should = require('should');

describe('mdPresenter', function () {
	it('should returns a markdown', function (done) {
		var result = mdPresenter({
			'2015-05-10T11:06:46.657Z': {
				'suite1': {
					'test1': {
						avg: 1,
						err: 5
					},
					'test2': {
						avg: 2,
						err: 4
					}
				}
			}
		});
		
		console.log(result);
		done();
	});
})