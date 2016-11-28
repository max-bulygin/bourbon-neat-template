var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var rigger      = require('gulp-rigger');

gulp.task('serve', ['sass', 'rigger'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch('./dev/**/*.html', ['rigger']);
    gulp.watch('./dev/scss/*.scss', ['sass']);
    gulp.watch('./build/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('dev/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream());
});

gulp.task('rigger', function () {
    gulp.src('./dev/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['serve']);