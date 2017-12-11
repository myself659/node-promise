var promise = require('promise');

if (process.argv.length < 3) {
    console.error('lack argument.');
    process.exit(1);
}

// 一件事件，两种结果
var p = new promise(function(resolve, reject) {
    var n = Number(process.argv[2]);
    if (n || n === 0) {
        resolve(n);
    } else {
        throw new Error('not a number.');
    }
});
// then 后续处理 promise 的结果的promise
var pt1 = p.then(function(result) {
    if (result % 2 === 0) {
        return result / 2;
    } else {
        throw new Error('not divisible by 2.');
    }
});

var pt2 = pt1.then(function(result) {
    if (result % 3 === 0) {
        return result / 3;
    } else {
        throw new Error('not divisible by 3.');
    }
});

// done 结束promise 
pt2.done(function(result) {
    console.log('result is ' + result + '.');
}, function(err) {
    console.error(err);
    process.exit(1);
});