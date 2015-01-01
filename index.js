var through = require('through2');

function defaultComparator(a, b) {
    return a.path.localeCompare(b.path);
}

function gulpSort(params) {
    params = params || {};
    // sort ascending by default
    var asc = typeof params.asc !== 'undefined' ? asc : true;
    var comparator = params.comparator || defaultComparator;
    var files = [];

    return through.obj(function(file, enc, cb) {
        files.push(file);
        cb();
    }, function(cb) {
        files.sort(comparator);
        if (!asc) {
            files.reverse();
        }
        files.forEach(function(file) {
            this.push(file);
        }, this);
        cb();
    });
}

module.exports = gulpSort;
