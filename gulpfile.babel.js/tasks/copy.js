/*
 * @title Copy
 * @description A task to copy files to the output directory
 */

// Dependencies
import { src, dest } from 'gulp';
import changed from 'gulp-changed';

// Config
import { config } from '../config';

// Task
export function copy() {
  return src(config.paths.copy.src)
    .pipe(changed(config.paths.copy.dest))
    .pipe(dest(config.paths.copy.dest));
}
