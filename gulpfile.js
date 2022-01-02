'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
sass.compiler = require('node-sass');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

var browserSync = require("browser-sync").create();

function reload() {
    browserSync.reload();
}
// styles task

gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            // outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            // browsers: ["> 2%", "last 2 versions", "ie >= 10"],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/stylesheets/local'))
        .pipe(browserSync.stream());
});

// pug task

gulp.task('views', function () {
    return gulp.src([
        "src/views/*.pug",
        "!src/views/_*.pug",
        "!src/!views/**/_*.pug"
    ])
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
});

// task scripts

gulp.task('scripts', function() {
    return gulp.src(["src/scripts/*.js", "!src/scripts/*.min.js"])
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(rename({
        prefix: "jquery.",
        // suffix: ".min"
      }))
    //   .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("public/assets/scripts"))
      .pipe(browserSync.stream());
});

// imagemin task

gulp.task('imagemin', function(){
    return gulp.src('src/medias/images/*')
    .pipe(changed('src/medias/images/*'))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('public/medias/images'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
          baseDir: "./public",
          directory: true
        }
    });
    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch([
        "src/views/*.pug",
        "src/views/**/*.pug"
    ], gulp.series('views'));
    gulp.watch('src/scripts/*.js', gulp.series('scripts'));
	gulp.watch(["src/medias/images/*"], gulp.series('imagemin'));
});




// default task
gulp.task('default', gulp.series('watch', 'scripts', 'views', 'styles', 'imagemin'));

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'src/medias/favicon/faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'src/medias/favicon/favicon.png',
      dest: 'public/medias/favicon/',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src([ 'TODO: List of the HTML files where to inject favicon markups' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});