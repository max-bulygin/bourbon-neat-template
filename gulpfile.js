var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var rigger      = require('gulp-rigger');

gulp.task('serve', ['sass', 'rigger'], function() {

    browserSync.init({
        server: "./dev"
    });

    gulp.watch('./dev/html/**/*.html', ['rigger']);
    gulp.watch('./dev/scss/**/*.s*ss', ['sass']);
    gulp.watch('./dev/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('dev/scss/*.s*ss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./dev/css/'))
        .pipe(browserSync.stream());
});

gulp.task('rigger', function () {
    gulp.src('./dev/html/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./dev'));
});

gulp.task('default', ['serve']);