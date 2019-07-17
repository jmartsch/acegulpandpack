/*
 * @title Fonts
 * @description A task to copy fonts
 */

// Dependencies
import { src, dest } from 'gulp';
import changed from 'gulp-changed';

// Config
import { config } from '../config';

// Task
export function fonts() {
  return src(config.paths.fonts.src)
    .pipe(changed(config.paths.fonts.dest))
    .pipe(dest(config.paths.fonts.dest));
}
