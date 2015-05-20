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

m.formatNumber = function (n, decimal) {
	if (decimal == undefined) decimal = n < 1000 ? 2 : 0;
	
    n = n.toFixed(decimal) + '';
    var x = n.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
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