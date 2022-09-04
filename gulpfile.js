const gulp = require('gulp');
const { series } = require('gulp');
const browserSync = require('browser-sync').create();
const gulpSass = require('gulp-sass')(require('sass'));

function serve() {
    browserSync.init({
        server: "./src"
    });

    gulp.watch("./src/scss/**/*.scss", series(css));
    gulp.watch("./src/**/*.html", series(html));
    gulp.watch("./src/**/*.js", series(js));
}

function css() {
    return gulp.src("src/scss/*.scss")
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
}

function js() {
    return gulp.src("./src/**/*.js")
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream());
}

exports.default = series(html, css, js, serve);