/*
 * @title Watch
 * @description A task to start the server and watch for changes.
 */

// Dependencies
import gulp from 'gulp';
import { series } from 'gulp';

// Tasks
import { reload, serve } from './server';
import { styles } from './styles';
import { scripts } from './scripts';
import { templates } from './templates';
import { fonts } from './fonts';
import { buildSvgSprite } from './build-vectorsprite';
import { minifyImages } from './minify-images';

// Config
import { config } from '../config';

function watchFiles() {
  // this task watches files for changes and triggers compilation and BrowserSync reloads
  gulp.watch([config.paths.styles.watch], styles);
  gulp.watch(config.paths.scripts.watch, series(scripts, reload));
  gulp.watch(config.paths.templates.compile, series(templates, reload));
  gulp.watch(config.paths.templates.watch, series(reload));
  gulp.watch(config.paths.images.contentImages, series(minifyImages, reload));
  gulp.watch(config.paths.images.vectorSprite, buildSvgSprite);
  gulp.watch(config.paths.fonts.src, series(fonts, reload));
}

export const watch = series(
  // this task only serves (depending on your config) and watches files
  serve,
  watchFiles
);