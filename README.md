# gulp-sort
> Sort files in stream by path or any custom sort comparator

## Install

`$ npm install gulp-sort --save-dev`

## Usage

```js
var gSort = require('gulp-sort');

gulp.src('./src/js/**/*.js')
    .pipe(gSort())
    .pipe(gulp.dest('./build/js'));
```

## Options

### asc

Sort ascending. Defaults to true. Specify false to sort descending.

### comparator

Comparator function to use. `comparator(file1, file2)`. Defaults to `localeCompare` of file paths.

## License

MIT ©[Gilad Peleg](http://giladpeleg.com)
