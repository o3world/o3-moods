'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const jshint = require('gulp-jshint');

const lintFiles = [
  '**/*.js',
  '!node_modules/**/*',
  '!**/bundle.js'
];

gulp.task('css', () => {
    gulp.src('./public/styles/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifycss())
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'Safari 8']
        }))
        .pipe(gulp.dest('public/styles'))
        .pipe(notify({message: 'SCSS Compiled!'}));
});

gulp.task('lint', () => (
  gulp.src(lintFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
));

gulp.task('watch', () => {
  gulp.watch('./public/styles/scss/*.scss', ['css']);
  gulp.watch('./public/styles/scss/**/*.scss', ['css']);
  gulp.watch(lintFiles, ['lint']);
});

gulp.task('default', ['watch']);
