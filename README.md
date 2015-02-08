# [gulp](https://github.com/wearefractal/gulp)-sort
> Sort files in stream by path or any custom sort comparator

[![Build Status](http://img.shields.io/travis/pgilad/gulp-sort/master.svg?style=flat)](https://travis-ci.org/pgilad/gulp-sort)

## Install

`$ npm install gulp-sort --save-dev`

## Usage

```js
var sort = require('gulp-sort');

// default sort
gulp.src('./src/js/**/*.js')
    .pipe(sort())
    .pipe(gulp.dest('./build/js'));

// pass in a custom comparator function
gulp.src('./src/js/**/*.js')
    .pipe(sort(customComparator))
    .pipe(gulp.dest('./build/js'));

// sort descending
gulp.src('./src/js/**/*.js')
    .pipe(sort({
        asc: false
    }))
    .pipe(gulp.dest('./build/js'));

// sort with a custom comparator
gulp.src('./src/js/**/*.js')
    .pipe(sort({
        comparator: function(file1, file2) {
            if (file1.path.indexOf('build') > -1) {
                return 1;
            }
            if (file2.path.indexOf('build') > -1) {
                return -1;
            }
            return 0;
        }
    }))
    .pipe(gulp.dest('./build/js'));
```

## Options

`gulp-sort` takes in an optional [comparator](#comparator) function, or dictionary with following params:

### asc

Sort ascending. Defaults to true. Specify false to sort descending.

### comparator

Comparator function to use. `comparator(file1, file2)`. Defaults to `localeCompare` of file paths.

## License

MIT ©[Gilad Peleg](http://giladpeleg.com)
