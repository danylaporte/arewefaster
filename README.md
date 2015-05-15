# arewefaster
Benchmark functions and compare result with other implementation over time.

## Installation

```bash
$ npm install arewefaster
```

##Usage

**command-line**

```bash
$ arewefaster [options] <files>
``` 

**api**

```js
var arewefaster = require('arewefaster');

arewefaster(suite, function (err, result) {
});
```

**interface**
```js
suite('Benchmarking timeouts', function() {
	
	test('setTimeout of 1ms', function (done) {
		setTimeout(done, 1);
	});
	
	test('setTimeout of 2ms', function (done) {
		setTimeout(done, 2);
	});
	
});
```

## Documentation

## License ##
The MIT License (MIT)

Copyright (c) 2015 Dany Laporte