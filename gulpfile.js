'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var livereload = require('gulp-livereload');
var connect = require('connect');

var rename = require('gulp-rename');
var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');


/** Config variables */
var SERVER_PORT = 8888;
var LIVERELOAD_PORT = 35731;


/** File paths */
var JS_DIST_DIR = 'dist/js';
var JS_ENTRY_FILE = './src/index.jsx';

// traceur runtime path:
// node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js
// react path:
// bower_components/react/react-with-addons.js


function compileScripts(watch, entryFile, outputDir, outputFile) {
    gutil.log('Starting browserify');

    es6ify.traceurOverrides = {experimental: true};

    var bundler = browserify(
            entryFile, {debug: false, extensions: ['.jsx', '.js']})
        .transform(reactify)
        .transform(es6ify.configure(/.js[x]?/));

    var rebundle = function () {
        var stream = bundler.bundle()
            //.on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .on('error', function (err) {
                console.error(err.message);
            })
            .pipe(source(entryFile))
            .pipe(rename(outputFile))
            .pipe(gulp.dest(outputDir))
            .pipe(livereload());
    }

    if (watch) {
        bundler = watchify(bundler);
    }

    //bundler.on('update', rebundle);
    return rebundle();
}


gulp.task('browserify', function() {
    compileScripts(true, JS_ENTRY_FILE, JS_DIST_DIR, 'literallycanvas.js');
});


gulp.task('uglify', ['browserify'], function() {
    return gulp.src('./dist/js/literallycanvas.js')
        .pipe(uglify())
        .pipe(rename('literallycanvas.min.js'))
        .pipe(gulp.dest('./lib/js'));
});


gulp.task('serve', function (next) {
    var server = connect();
    server.use(connect.static('./')).listen(SERVER_PORT, next);
});


/**
 * Run default task
 */
gulp.task('default', ['browserify', 'serve'], function () {
    livereload.listen({port: LIVERELOAD_PORT});
    gulp.watch(['src/**/*'], ['browserify']);
});