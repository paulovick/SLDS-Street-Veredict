var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssbeautify = require('gulp-cssbeautify');
var cleanCss = require('gulp-clean-css');
var plumber = require('gulp-plumber');

/* SCSS */

gulp.task('compile-sass', function() {
    gulp.src('src/css/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(concat('site.css'))
        .pipe(cssbeautify())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('minify-css', function() {
    setTimeout(function() {
        gulp.src('src/css/site.css')
            .pipe(plumber())
            .pipe(cleanCss())
            .pipe(concat('site.min.css'))
            .pipe(gulp.dest('./src/css/'));
    }, 100);
});

/* EXTERNAL */

gulp.task('minify-external-css', function() {
    gulp.src('src/css/external/*.css')
        .pipe(plumber())
        .pipe(cleanCss())
        .pipe(concat('external.min.css'))
        .pipe(gulp.dest('./src/css/'));
})

/* TASKS SCSS */

var tasksSass = [
    'compile-sass',
    'minify-css'
];

var tasksExternalCss = [
    'minify-external-css'
];

var tasks = tasksSass.concat(tasksExternalCss);

gulp.task('default', tasks, function() {
    gulp.watch('src/css/scss/*.scss', tasksSass);
    gulp.watch('src/css/external/*.css', tasksExternalCss);
});