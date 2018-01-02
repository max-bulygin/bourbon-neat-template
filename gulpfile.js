var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
var pngquant = require('imagemin-pngquant');
var spriteSmith = require('gulp.spritesmith');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserify = require('browserify');
var stream = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var $ = gulpLoadPlugins({
    rename: {
        'gulp-clean-css': 'clean',
        'gulp-file-include': 'include',
        'gulp-group-css-media-queries': 'gcmq'
    }
});
var reload = browserSync.reload;

var Paths = {
    DEV: 'dev/',
    DIST: 'dist/',
    HTML: 'dev/html/',
    FONTS: 'dev/fonts/',
    SASS: 'dev/sass/',
    CSS: 'dev/css/',
    JS: 'dev/js/',
    IMG: 'dev/img/',
    ICONS: 'dev/img/icons/',
    SPRITE: 'dev/img/sprite/'
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

var safeClean = [
    Paths.DIST + 'css/styles.min.css',
    Paths.DIST + 'js/bundle.min.js',
    Paths.DIST + '*.html',
    Paths.DIST + 'fonts'
];

gulp.task('serve', ['sass', 'include', 'scripts', 'svgstore', 'sprite'], function () {

    browserSync.init({
        files: Paths.CSS + '*.css',
        server: Paths.DEV,
        browser: 'google chrome',
        injectChanges: true,
        ui: false
    });

    gulp.watch([Paths.HTML + '**/*.html'], ['include', reload]);
    gulp.watch([Paths.SASS + '**/*.scss'], ['sass']);
    gulp.watch([Paths.JS + '**/*.js', '!' + Paths.JS + '**/*.min.js'], ['scripts', reload]);
    gulp.watch([Paths.ICONS + '*'], ['svgstore']);
    gulp.watch([Paths.SPRITE + '*'], ['sprite']);
});

gulp.task('sass', function () {
    return gulp.src(Paths.SASS + '**/*.*')
        .pipe($.sourcemaps.init())
        .pipe($.sass({outputStyle: 'expanded'})
            .on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(Paths.CSS))
        .pipe(browserSync.stream({
            match: Paths.CSS + 'styles.css'
        }));
});

gulp.task('scripts', function () {
    return browserify(Paths.JS + 'scripts.js').bundle()
        .pipe(stream('bundle.min.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(Paths.JS))
});

gulp.task('include', function () {
    gulp.src(Paths.HTML + '*.html')
        .pipe($.include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(Paths.DEV));
});

gulp.task('css', function () {
    return gulp.src(Paths.CSS + '*.css')
        .pipe($.size({title: 'css'}))
        .pipe($.gcmq())
        .pipe($.clean({
            compatibility: 'ie9',
            debug: true
        }))
        .pipe($.rename('styles.min.css'))
        .pipe(gulp.dest(Paths.DIST + 'css'))
        .pipe($.size({title: 'css:minified'}));
});

gulp.task('imagemin', function () {
    return gulp.src(Paths.IMG + '*.*')
        .pipe($.imagemin([
            $.imagemin.gifsicle({interlaced: true}),
            $.imagemin.jpegtran({progressive: true}),
            $.imagemin.optipng({optimizationLevel: 5}),
            $.imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(Paths.DIST + 'img'))
        .pipe($.size({title: 'images'}));
});

gulp.task('svgstore', function () {
    return gulp.src(Paths.ICONS + '*.svg')
        .pipe($.svgmin())
        .pipe($.svgstore())
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
        .pipe($.if('*.png', gulp.dest(Paths.IMG)))
        .pipe($.if('*.scss', gulp.dest(Paths.SASS + 'base/')));
});

gulp.task('clean', function () {
    return del.sync(safeClean);
});

gulp.task('copy', function () {
    gulp.src(Paths.FONTS + '*.*')
        .pipe(gulp.dest(Paths.DIST + 'fonts'))
        .pipe($.size({title: 'fonts'}));

    gulp.src(Paths.DEV + '*.html')
        .pipe(gulp.dest(Paths.DIST))
        .pipe($.size({title: 'html'}));

    gulp.src(Paths.JS + 'bundle.min.js')
        .pipe(gulp.dest(Paths.DIST + 'js'))
        .pipe($.size({
            title: 'scripts',
            gzip: true
        }));
});

// gulp.task('build:size', function() {
//     gulp.src(Paths.DIST + '**')
//         .pipe($.size({
//             showFiles: true,
//             title: 'dist:size'
//         }));
// });

gulp.task('default', ['serve']);
gulp.task('build', ['clean'], function () {
    gulp.run('copy');
    gulp.run('css');
    gulp.run('imagemin');
});
