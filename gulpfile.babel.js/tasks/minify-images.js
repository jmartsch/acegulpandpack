/**
 * Contentimages
 * @description Copy and Compress all Images
 * Inline Images (SVG, PNG, JPG, GIF)
 */
// Dependencies
import {
  src,
  dest
} from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import errorHandler from '../util/errorHandler.js';
import imagemin from 'gulp-imagemin';
// Config
import {
  config,
} from '../config';

// Task
export function minifyImages() {
  return src([config.paths.images.contentImages, config.paths.images.vectorImages, `!${config.paths.images}/copy-only/**/*{jpeg,jpg,gif,svg,png}`])
    .pipe(plumber({
      errorHandler
    }))
    .pipe(changed(config.paths.images.dest))
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: false,
            collapseGroups: true
          }]
        })
      ], {
        verbose: true
      })
    )
    .pipe(dest(config.paths.images.dest));
}
