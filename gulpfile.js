var gulp = require('gulp');
var browserify = require('browserify');
var browserifyInc = require('browserify-incremental');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var moment = require('moment');
var chalk = require('chalk');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var mainBowerFiles = require('gulp-main-bower-files');
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var SpecReporter = require('jasmine-spec-reporter');


gulp.task('sass', () => {
  return gulp.src('./client/styles/**/*.scss')
    .pipe(sass().on('error', handleError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch:sass', () => {
  gulp.watch('./client/styles/**/*.scss', ['sass']);
});

gulp.task('js:lib', () => {
  var jsFilter = filter('**/*.js');
  return gulp.src('./client/bower.json')
    .pipe(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('css', () => {
  var cssFilter = filter('**/*.css');
  return gulp.src('./client/bower.json')
    .pipe(mainBowerFiles())
    .pipe(cssFilter)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('./public/css'));
});

var defaultOpts = {
  entries: './client/bootstrap.js',
  debug: true
};

gulp.task('watch:app', () => {
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

  b.on('update', rebundle);

  bundle(b);
});

gulp.task('js:app', () => {
  var opts = Object.assign({}, browserifyInc.args, defaultOpts);
  var b = browserify(opts);

  browserifyInc(b, {cacheFile: './b-cache.json'});

  b.transform('babelify', {presets: ['es2015', 'react']});

  b.on('log', handleLog);

  return bundle(b);
});

function bundle(b) {
  return b.bundle()
    .on('error', handleError)
    .pipe(source('build.js'))
    .pipe(gulp.dest('./public/js/'));
}

function handleError(msg) {
  console.log(chalk.red.bold(msg));
}

function handleLog(msg) {
  console.log(chalk.green(msg));
}

gulp.task('test', () => {
  return gulp.src('./server/tests/**/test-*.js')
    .pipe(jasmine({
      reporter: new SpecReporter()
    }));
});

gulp.task('app', ['js:app', 'sass']);

gulp.task('lib', ['js:lib', 'css']);

gulp.task('build', ['app', 'lib']);