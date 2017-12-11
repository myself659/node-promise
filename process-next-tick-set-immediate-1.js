var i = 0;
var func = function() {
    console.log('next tick - process.nextTick - ' + i + '.');
    i++;
    if (i < 10) {
        process.nextTick(func);
    }
};
process.nextTick(func);

setImmediate(function() {
    console.log('next tick - immediate.');
});

console.log('first tick.');