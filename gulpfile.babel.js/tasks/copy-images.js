/*
 * @title Images
 * @description A task to copy images
 */

// Dependencies
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import errorHandler from '../util/errorHandler.js';

// Config
import { config } from '../config';

// Task
export function copyImages() {
  return src(config.paths.images.contentImages)
    .pipe(plumber({errorHandler}))
    .pipe(changed(config.paths.images.dest))
    .pipe(dest(config.paths.images.dest));
}
