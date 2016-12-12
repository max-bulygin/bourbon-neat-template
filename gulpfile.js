var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var maps            = require('gulp-sourcemaps');
var include         = require('gulp-file-include');
var del             = require('del');
var imagemin        = require('gulp-imagemin');
var pngquant        = require('imagemin-pngquant');
var cleanCSS        = require('gulp-clean-css');

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
gulp.task('minify-css', function() {
    return gulp.src('dev/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('imagemin', function() {
    return gulp.src('dev/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('build', ['del', 'imagemin', 'minify-css'], function() {

    var buildHtml = gulp.src('dev/*.html').pipe(gulp.dest('build/'));
    var buildFonts = gulp.src('dev/fonts/**/*').pipe(gulp.dest('build/fonts'));

});

gulp.task('del', function () {
    return del.sync('build/**/*');
});

gulp.task('default', ['serve']);