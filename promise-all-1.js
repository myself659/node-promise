var promise = require('promise');
var util = require('util');

var pres1 = new promise(function(resolve, reject) {
    setTimeout(function() {
        util.log('promise resolve 1.');
        resolve('pres1');
    }, 1000);
});
var pres2 = new promise(function(resolve, reject) {
    setTimeout(function() {
        util.log('promise resolve 2.');
        resolve('pres2');
    }, 2000);
});
var pres3 = new promise(function(resolve, reject) {
    setTimeout(function() {
        util.log('promise resolve 3.');
        resolve('pres3');
    }, 3000);
});
var pres4 = new promise(function(resolve, reject) {
    setTimeout(function() {
        util.log('promise resolve 4.');
        resolve('pres4');
    }, 4000);
});

var prej = new promise(function(resolve, reject) {
    setTimeout(function() {
        util.log('promise reject.');
        reject(new Error('prej'));
    }, 5000);
});

// 依赖多个promise promise作为业务单元的处理
var ps1 = promise.all([pres1, pres2, pres3, pres4, prej]);
var ps2 = promise.all([pres1, pres2, pres3, pres4]);

ps1.done(function(result) {
    util.log(result);
}, function(err) {
    console.error(err);
});

ps2.done(function(result) {
    util.log(result);
}, function(err) {
    console.error(err);
});

util.log('program started.');