var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var maps = require('gulp-sourcemaps');
var include = require('gulp-file-include');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cleanCSS = require('gulp-clean-css');
var spriteSmith = require('gulp.spritesmith');
var gulpif = require('gulp-if');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var watch = require('gulp-watch');
var rename = require('gulp-rename');

var reload = browserSync.reload;

var Paths = {
    DEV: './dev/',
    HTML: './dev/html/',
    SASS: './dev/sass/',
    CSS: './dev/css/',
    JS: './dev/js/',
    IMG: './dev/img/',
    ICONS: './dev/img/icons/',
    SPRITE: './dev/img/sprite/'
};

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('serve', ['sass', 'include', 'svgstore', 'sprite', 'icons-watch'], function () {

    browserSync.init({
        server: Paths.DEV,
        browser: 'google chrome',
        injectChanges: true
    });

    gulp.watch([Paths.HTML + '**/*.html'], ['include', reload]);
    gulp.watch([Paths.SASS + '**/*.scss'], ['sass']);
});

gulp.task('sass', function () {
    return gulp.src(Paths.SASS + '**/*.*')
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(Paths.CSS))
        .pipe(browserSync.stream());
});

gulp.task('include', function () {
    gulp.src(Paths.HTML + '*.html')
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(Paths.DEV));
});

gulp.task('minify-css', function () {
    return gulp.src('dev/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css')); // TODO place minified file next to origin
});

gulp.task('imagemin', function () {
    return gulp.src(Paths.IMG + '*.{jpg, jpeg, png}')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img')); //TODO use imagemin properly
});

gulp.task('svgstore', function () {
    return gulp.src(Paths.ICONS + '*.svg')
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest(Paths.IMG));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src(Paths.SPRITE + '*.png').pipe(spriteSmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '../img/sprite.png',
        padding: 2
    }));
    return spriteData
        .pipe(gulpif('*.png', gulp.dest(Paths.IMG)))
        .pipe(gulpif('*.scss', gulp.dest(Paths.SASS + 'base/')));
});

gulp.task('icons-watch', function () {
    var path2SVG = Paths.ICONS.replace(/^\.\//, '') + '*';
    var path2PNG = Paths.SPRITE.replace(/^\.\//, '') + '*';

    watch(path2SVG, function () {
        gulp.start('svgstore');
    });

    watch(path2PNG, function () {
        gulp.start('sprite');
    })
});

gulp.task('del', function () {
    return del.sync('build/**/*');
});

gulp.task('default', ['serve']);