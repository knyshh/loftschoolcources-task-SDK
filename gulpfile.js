var gulp = require('gulp');
var browserify = require('gulp-browserify');
//var browserSync = require('browser-sync');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {

    gulp.src('src/js/script.js')
        .pipe(browserify({
            //insertGlobals : true,
            //debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('server',['scripts'], function () {
    browserSync.init({
        port: 4000,
        server: {
            baseDir: './'
        }
    });

   // gulp.watch("src/sass/**/*.scss", ['sass']);
    gulp.watch("src/js/*.js", ['scripts']);
    gulp.watch("index.html").on('change', browserSync.reload);

});

gulp.task('default', ['server']);