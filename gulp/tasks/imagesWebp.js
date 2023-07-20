const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const size = require('gulp-size');
const imageminWebp = require('imagemin-webp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const paths = require('../paths');

const imagesWebp = () => {
  return gulp
    .src([
      `${paths.src.images}/*.{jpg,png}`,
      '!src/assets/images/favicon/**',
      '!src/assets/images/intTelInput/**',
      '!src/assets/images/ogp/**',
    ])
    .pipe(
      plumber(
        notify.onError({
          title: 'IMAGESWEBP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(newer(paths.build.images))
    .pipe(imagemin([imageminWebp({ quality: 75 })]))
    .pipe(rename({ extname: '.webp' }))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.build.images));
};

module.exports = imagesWebp;
