const gulp = require('gulp');
const { series } = require('gulp');
const browserSync = require('browser-sync').create();
const gulpSass = require('gulp-sass')(require('sass'));

function serve() {
    browserSync.init({
        server: "./src"
    });

    gulp.watch("./src/scss/**/*.scss", series(sass));
    gulp.watch("./src/**/*.html").on("change", browserSync.reload);
    gulp.watch("./src/**/*.js").on("change", browserSync.reload);
}

function sass() {
    return gulp.src("src/scss/*.scss")
        .pipe(gulpSass.sync().on('error', gulpSass.logError))
        .pipe(gulp.dest("./src/css/"))
        .pipe(browserSync.stream());
}

exports.default = series(serve);