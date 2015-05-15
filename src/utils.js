module.exports.cloneArray = function (array) {
	if (!array) return [];
    var newArray = new Array(array.length);

    for (var i = 0; i < array.length; i++) {
        newArray[i] = array[i];
    }

    return newArray;
};

module.exports.noop = function () { };

module.exports.parallel1 = function (array, value, cb) {
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