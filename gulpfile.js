var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var maps            = require('gulp-sourcemaps');
var include         = require('gulp-file-include');
var del             = require('del');

gulp.task('serve', ['sass', 'include'], function() {

    browserSync.init({
        server: "./dev"
    });

    gulp.watch('./dev/html/**/*.html', ['include']);
    gulp.watch('./dev/scss/**/*.s*ss', ['sass']);
    gulp.watch('./dev/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('dev/scss/*.s*ss')
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./dev/css/'))
        .pipe(browserSync.stream());
});

gulp.task('include', function () {
    gulp.src('./dev/html/*.html')
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dev'));
});

gulp.task('del', function () {
    return del(['build/**/*']);
});

gulp.task('default', ['serve']);