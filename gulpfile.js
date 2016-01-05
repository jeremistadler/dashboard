var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('scripts', function() {
  return gulp.src([
      'node_modules/angular/angular.js',
      'src/app.js',
      'src/clouds/clouds.js'
  ])
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src([
      'src/index.html',
      'src/clouds/clouds.html'
  ])
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src([
      'src/clouds/clouds.css',
  ])
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

gulp.task('watch', ['scripts', 'html', 'css'], function() {
    gulp.watch(['src/**/*.js'], ['scripts']);
    gulp.watch(['src/**/*.html'], ['html']);
    gulp.watch(['src/**/*.css'], ['css']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('default', ['connect', 'watch']);
