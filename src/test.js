function Test(name, func, options) {
    this.func = func;
    this.maxDuration = options && options.maxDuration || 1000;  // default duration 1sec
    this.name = name;
    this.targetError = options && options.targetError || 5; // default target error margin 5%
    this.type = 'test';
}

module.exports = Test;