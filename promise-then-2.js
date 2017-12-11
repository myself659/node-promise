var promise = require('promise');
var fs = require('fs');
var crypto = require('crypto');

if (process.argv.length < 3) {
    console.error('lack argument.');
    process.exit(1);
}
// 接力赛
var p = new promise(function(resolve, reject) {
    fs.stat(process.argv[2], function(err, stats) {
        if (err) {
            reject(err);
        } else if (stats.isFile()) {
            resolve({ size: stats.size });
        } else {
            reject(new Error('not a file.'));
        }
    });
});

var p2 = p.then(function(result) {
    return new promise(function(resolve, reject) {
        // 读取文件，返回数据处理
        fs.readFile(process.argv[2], 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                result.data = data;
                resolve(result);
            }
        });
    });
});

var p3 = p2.then(function(result) {
    var hash = crypto.createHash('sha256');
    hash.update(result.data);
    result.hash = hash.digest('hex');
    return result;
});

p3.done(function(result) {
    console.log('data: ' + result.data);
    console.log('length: ' + result.data.length); //自带长度属性
    console.log('size: ' + result.size);
    console.log('hash: ' + result.hash);
}, function(err) {
    console.error(err);
    process.exit(1);
});