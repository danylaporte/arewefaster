var m = module.exports;

function avgComparer(a, b) {
	return a.avg - b.avg;
}

m.cloneArray = function (array) {
	if (!array) return [];
    var newArray = new Array(array.length);

    for (var i = 0; i < array.length; i++) {
        newArray[i] = array[i];
    }

    return newArray;
};

m.fastestVsSecond = function (tests) {
	if (tests && tests.length > 1) {
		tests = m.cloneArray(tests);
		tests.sort(avgComparer);
		
		var fastest = tests[0];
		var second = tests[1];
		var msg =  fastest.name + ' is ' + Math.round(second.avg * 100 / fastest.avg) / 100 + 'x faster than ' + second.name;
		
		return msg;
	}
};

m.noop = function () { };

m.parallel1 = function (array, value, cb) {
	var count = 0;
	var done = false;

	function callback(err) {
		if (!done && err || count === array.length) {
			done = true;
			cb(err);
		}
	}

	for (var i = 0; i < array.length; i++) {
		array[i](value, callback);
	}
};