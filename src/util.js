module.exports.cloneArray = function(array) {
	var newArray = new Array(array.length);
	for (var i = 0; i < array.length; i++) {
		newArray[i] = array[i];
	}
	return newArray;
};