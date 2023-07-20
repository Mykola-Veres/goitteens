const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const mode = require('gulp-mode')();
const newer = require('gulp-newer');
const size = require('gulp-size');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const paths = require('../paths');

const imageMinConfig = {
  gifsicle: { interlaced: true },
  mozjpeg: { quality: 75, progressive: true },
  optipng: { optimizationLevel: 5 },
  svgo: {
    plugins: [
      { cleanupIDs: false },
      { removeViewBox: true },
      { removeComments: true },
      { removeEmptyContainers: true },
    ],
  },
};

const images = () => {
  return gulp
    .src([paths.src.images, '!src/assets/images/sprite/**'])
    .pipe(
      plumber(
        notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(newer(paths.build.images))
    .pipe(
      mode.production(
        imagemin([
          imagemin.gifsicle(imageMinConfig.gifsicle),
          imagemin.mozjpeg(imageMinConfig.mozjpeg),
          imagemin.optipng(imageMinConfig.optipng),
          imagemin.svgo(imageMinConfig.svgo),
        ])
      )
    )
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.build.images));
};

module.exports = images;
