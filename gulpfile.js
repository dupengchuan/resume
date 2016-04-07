var gulp = require('gulp');
var jade = require('jade');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css')
var plugins = require('gulp-load-plugins')();
var gls = require('gulp-live-server');

var data = require('./resume.json');
var server = gls.static('dist', 9999);

gulp.task('jade', function() {
  gulp.src('./src/layout/index.jade')
    .pipe(plugins.jade({ data: data}))
    .pipe(gulp.dest('./dist/'));
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
    './resume.json'
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

gulp.task('default', ['watch','server']);
