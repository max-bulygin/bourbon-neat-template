var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var paths = {
    dev: {
        html: 'dev/index.html',
        scss: 'dev/scss/**/*.scss'
    },
    build: {
        css: 'build/css/'
    }
}

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch(paths.dev.scss, ['sass']);
    gulp.watch(paths.dev.html).on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src(paths.dev.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);