var gulp = require('gulp');
var jade = require('jade');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css')
var plugins = require('gulp-load-plugins')();
var rename = require('gulp-rename');
var gls = require('gulp-live-server');
var server = gls.static('dist', 8000);

function getData(path) {
  var resumeData = require(path);
  var dataPath = './languages/' + resumeData.languages + '.js';
  try {
    var data = require(dataPath);
  } catch (err) {
    console.log('------ Languages file not find ------');
    var data = require('./languages/zh-CN.js');
  }


  for (var item in resumeData) {
    data[item] = resumeData[item];
  }
  return data;
}

gulp.task('jade', function() {
  gulp.src('./src/layout/index.jade')
    .pipe(plugins.jade({ data: getData('./resume_zh.json') }))
    .pipe(gulp.dest('./dist/'));

  try {
    gulp.src('./src/layout/index.jade')
      .pipe(plugins.jade({ data: getData('./resume_en.json') }))
      .pipe(rename('en.html'))
      .pipe(gulp.dest('./dist/'));
  } catch (e) {
    console.log('--- Not find resume_en.html ---')
  }
});

gulp.task('less', function() {
  gulp.src('./src/style/style.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('static', function() {
  gulp.src('./static/**/*', { base: 'static' })
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['jade', 'less', 'static'], function() {
  gulp.watch([
    './src/layout/*.jade',
    './src/layout/**/*.jade',
    './resume_en.json',
    './resume_zh.json'
  ], ['jade']);
  gulp.watch([
    './src/style/*.less',
    './src/style/**/*.less'
  ], ['less']);
  gulp.watch('./static/**/*', ['static']);
  gulp.watch('./dist/**/*', function() {
    server.notify.apply(server, arguments);
  });
});

gulp.task('server', function() {
  server.start();
});


gulp.task('deploy', ['jade', 'less', 'static'], function() {
  return gulp.src('./dist/**/*')
    .pipe(plugins.ghPages());
});
gulp.task('d', ['deploy']);

gulp.task('default', ['watch','server']);
