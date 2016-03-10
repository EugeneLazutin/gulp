var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var moment = require('moment');
var chalk = require('chalk');

gulp.task('watchify', () => {
  var b = browserify('./app/bootstrap.js', {debug: true});

  b.plugin(watchify);

  function rebundle() {
    b.transform('babelify', { presets: ['es2015', 'react'] });
    return b.bundle()
      .pipe(source('build.js'))
      .pipe(gulp.dest('./public/javascripts/'));
  }

  b.on('time', function (time) {
    var durationOfBundleBuild = moment.duration(time).asSeconds();
    console.log(chalk.green('Updated'), ' bundle in ', chalk.bold(durationOfBundleBuild + 's'), '\n');
  });

  b.on('update', rebundle);

  rebundle();
});

gulp.task('default', () => {
  var b = browserify({
    entries: './app/bootstrap.js',
    debug: true
  });
  b.transform('babelify', {presets: ['es2015', 'react']});
  return b.bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});