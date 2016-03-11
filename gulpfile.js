var gulp = require('gulp');
var browserify = require('browserify');
var browserifyInc = require('browserify-incremental');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var moment = require('moment');
var chalk = require('chalk');

gulp.task('watch', () => {
  var b = createBundle(true);

  b.on('log', (msg) => {
    console.log(chalk.green(msg));
  });

  function rebundle() {
    console.log(chalk.bgBlack.white('\nSomething changed. Starting...'));
    bundle(b);
  }

  b.on('update', rebundle);

  rebundle();
});

gulp.task('build', () => {
  return bundle(createBundle(false));
});

function createBundle(watch) {
  var opts = Object.assign({}, browserifyInc.args, {
    entries: './app/bootstrap.js',
    debug: true
  });

  var b = browserify(opts);

  if(watch) {
    b.plugin(watchify);
  }

  browserifyInc(b, {cacheFile: './b-cache.json'});

  b.transform('babelify', {presets: ['es2015', 'react']});

  return b;
}

function bundle(b) {
  return b.bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('./public/javascripts/'))
}