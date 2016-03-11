var gulp = require('gulp');
var browserify = require('browserify');
var browserifyInc = require('browserify-incremental');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var moment = require('moment');
var chalk = require('chalk');

var defaultOpts = {
  entries: './app/bootstrap.js',
  debug: true
};

gulp.task('watch', () => {
  var opts = Object.assign({}, watchify.args, defaultOpts, {
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  var b = browserify(opts);
  b.transform('babelify', {presets: ['es2015', 'react']});

  b.on('log', handleLog);

  function rebundle() {
    console.log(chalk.blue.bold('\nBundle changed...'));
    bundle(b);
  }

  b.on('update', rebundle, () => {
    console.log('--123131232--');
  });

  bundle(b);
});

gulp.task('build', () => {
  var opts = Object.assign({}, browserifyInc.args, defaultOpts);
  var b = browserify(opts);

  browserifyInc(b, { cacheFile: './b-cache.json' });

  b.transform('babelify', {presets: ['es2015', 'react']});

  b.on('log', handleLog);

  return bundle(b);
});

function bundle(b) {
  return b.bundle()
    .on('error', handleError)
    .pipe(source('build.js'))
    .pipe(gulp.dest('./public/javascripts/'));
}

function handleError(msg) {
  console.log(chalk.red.bold(msg));
}

function handleLog(msg) {
  console.log(chalk.green(msg));
}