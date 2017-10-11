const concat = require('gulp-concat');
const gulp = require('gulp');
const gls = require('gulp-live-server');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('javascript', function() {
  return gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('tap.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.parallel('html', 'javascript'));

gulp.task('serve', gulp.parallel('build', function() {
  const server = gls([gls.script, 'dist', 8000], null, false);
  server.start();

  gulp.watch('app/**/*', gulp.parallel('build'));
}));

gulp.task('default', gulp.parallel('build'));
