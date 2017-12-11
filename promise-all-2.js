var promise = require('promise');
var fs = require('fs');
var path = require('path');

if (process.argv.length < 4) {
    console.error('lack argument.');
    process.exit(1);
}

var p1 = new promise(function(resolve, reject) {
    fs.readdir(process.argv[2], function(err, list) {
        if (err) {
            reject(err);
        } else {
            resolve(list);
        }
    });
});

var p2 = p1.then(function(list) {
    var ps = [];
    for (var i = 0; i < list.length; i++) {
        let e = list[i];
        ps.push(new promise(function(resolve, reject) {
            fs.stat(path.join(process.argv[2], e), function(err, stats) {
                if (err) {
                    reject(err);
                } else if (stats.isFile() && path.extname(e) === process.argv[3]) {
                    resolve(e);
                } else {
                    resolve(null);
                }
            });
        }));
    }
    return promise.all(ps);
});

p2.done(function(flist) {
    for (var i = 0; i < flist.length; i++) {
        if (flist[i]) {
            console.log(flist[i]);
        }
    }
}, function(err) {
    console.error(err);
    process.exit(1);
});
// nodejs 如何提高效率