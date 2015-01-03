/* global describe,it */
'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var sort = require('../index');

describe('gulp-sort', function () {
    it('should sort files based on path', function (cb) {
        var stream = sort();
        var files = [];
        stream.on('data', function (file) {
            files.push(file);
        }).on('error', function (err) {
            assert.false(err);
        }).on('end', function () {
            assert.ok(/index-1/.test(files[0].path));
            assert.ok(/index-2/.test(files[1].path));
            assert.ok(/index-5/.test(files[2].path));
            cb();
        });

        stream.write(new gutil.File({
            path: './index-5.js',
            contents: new Buffer('data')
        }));
        stream.write(new gutil.File({
            path: './index-2.js',
            contents: new Buffer('data')
        }));
        stream.write(new gutil.File({
            path: './index-1.js',
            contents: new Buffer('data')
        }));
        stream.end();
    });

    it('should sort files based on path descending', function (cb) {
        var stream = sort({
            asc: false
        });
        var files = [];
        stream.on('data', function (file) {
            files.push(file);
        }).on('error', function (err) {
            assert.false(err);
        }).on('end', function () {
            assert.ok(/index-1/.test(files[2].path));
            assert.ok(/index-2/.test(files[1].path));
            assert.ok(/index-5/.test(files[0].path));
            cb();
        });

        stream.write(new gutil.File({
            path: './index-1.js',
            contents: new Buffer('data')
        }));
        stream.write(new gutil.File({
            path: './index-2.js',
            contents: new Buffer('data')
        }));
        stream.write(new gutil.File({
            path: './index-5.js',
            contents: new Buffer('data')
        }));
        stream.end();
    });

    it('should sort files with custom comparator', function (cb) {
        var stream = sort({
            comparator: function (file1, file2) {
                var num1 = file1.path.match(/index-(\d)/)[1];
                var num2 = file2.path.match(/index-(\d)/)[1];
                return parseInt(num1) - parseInt(num2);
            }
        });
        var files = [];
        stream.on('data', function (file) {
            files.push(file);
        }).on('error', function (err) {
            assert.false(err);
        }).on('end', function () {
            assert.ok(/index-1/.test(files[0].path));
            assert.ok(/index-2/.test(files[1].path));
            assert.ok(/index-7/.test(files[2].path));
            cb();
        });

        stream.write(new gutil.File({
            path: './index-7.js',
            contents: new Buffer('data')
        }));
        stream.write(new gutil.File({
            path: './index-1.js',
            contents: new Buffer('data')
        }));
        stream.write(new gutil.File({
            path: './index-2.js',
            contents: new Buffer('data')
        }));
        stream.end();
    });
});
