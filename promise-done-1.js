var promise = require('promise');
var util = require('util');

var pres = new promise(function(resolve, reject) {
    util.log('task 1 complete.');
    // 从数据库读取数据 
    resolve('task 1');
});

var prej = new promise(function(resolve, reject) {
    util.log('task 2 complete.');
    reject(new Error('task 2'));
});

pres.done(function(result) {
    // 数据处理
    util.log(result);
}, function(err) {
    // 失败处理 
    console.error(err);
});

prej.done(function(result) {
    util.log(result);
}, function(err) {
    console.error(err);
});

util.log('program started.');