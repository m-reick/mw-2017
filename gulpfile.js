var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require ('gulp-minify-css');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');
var notify = require('gulp-notify');

gulp.task('sass', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass()
      .on("error", notify.onError({
          title: "Sass Error",
          message: "Error: <%= error.message %>"
      }))
    )
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

// BrowserSync server
gulp.task('browser-sync', function() {
    browserSync.init({
       server: {
            baseDir: "./"
        }/* ,
        proxy: "localhost:80"*/
    });
});

gulp.task('default', ['sass', 'browser-sync'],function() {
  gulp.watch(['src/scss/*', 'src/scss/**/*'], ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});
