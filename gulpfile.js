var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
//var sass            = require('gulp-sass');
var rubySass        = require('gulp-ruby-sass');
var autoprefixer    = require('gulp-autoprefixer');
var maps            = require('gulp-sourcemaps');
var include         = require('gulp-file-include');
var del             = require('del');
var imagemin        = require('gulp-imagemin');
var pngquant        = require('imagemin-pngquant');
var cleanCSS        = require('gulp-clean-css');

gulp.task('serve', ['rubySass','include'], function() {

    browserSync.init({
        server: './dev',
        browser: 'google chrome',
        injectChanges: true,
        // Uncomment this options to generate temporary public URL 
        //tunnel: true,
        //gostMode: false
    });

    gulp.watch('./dev/html/**/*.html', ['include']);
    gulp.watch('./dev/scss/**/*.*', ['rubySass']);
    gulp.watch('./dev/*.html').on('change', browserSync.reload);

});

gulp.task('rubySass', function() {
    return rubySass('dev/scss/**/*.*', {sourcemap: true})
        .on('error', rubySass.logError)
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./dev/css/'))
        .pipe(browserSync.stream());
});

// Uncomment this section to use libSass instead

//gulp.task('sass', function() {
//    return gulp.src('dev/scss/**/*.*')
//        .pipe(maps.init())
//        .pipe(sass({outputStyle: 'expanded'}))
//        .pipe(autoprefixer(['last 15 versions']))
//        .pipe(maps.write('./'))
//        .pipe(gulp.dest('./dev/css/'))
//        .pipe(browserSync.stream());
//});

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