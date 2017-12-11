var util = require('util');
var async = require('async');

var f = function(t, callback) {
    util.log('f start: ' + t);
    setTimeout(function() {
        util.log('f end: ' + t);
        callback(null, t);
    }, t);
};

var f2 = function(t, callback) {
    util.log('f2 start: ' + t);
    setTimeout(function() {
        util.log('f2 end: ' + t);
        callback(null, t);
    }, t);
};

var af = async.timeout(f2, 1000);

var callback1 = function(err, t) {
    if (err) {
        console.error(err);
    } else {
        util.log('callbacked1: ' + t);
    }
};

var callback2 = function(err, t) {
    if (err) {
        console.error(err);
    } else {
        util.log('callbacked2: ' + t);
    }
};
for (var i = 100; i < 300; i += 200) {
    f(i, callback1);
    af(i, callback2);
}