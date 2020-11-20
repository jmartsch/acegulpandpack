/*
 * @title gulpfile.babel.js
 * @description A directory file loader to include all the gulp tasks
 *
 */

// Dependencies
import gulp from 'gulp';
import {
  series,
  parallel
} from 'gulp';

// Tasks
import {
  reload,
  serve
} from './tasks/server';
import {
  clean
} from './tasks/clean';
import {
  scss,
  stylelint
} from './tasks/styles';
import {
  scripts, esTranspile
} from './tasks/scripts';
import {
  templates
} from './tasks/templates';
import {
  copyImages
}
  from './tasks/copy-images';
import {
  fonts
} from './tasks/fonts';
import {
  copy
} from './tasks/copy';

import {
  buildVectorSpriteTask,
  buildSymbolCleanupTask
} from './tasks/build-vectorsprite';
import {minifyImages} from './tasks/minify-images';

// import { deploy } from './tasks/deploy';
import {rev, deleteRevvedFiles, deleleteRevManifest} from './tasks/rev';

// Config
import {
  config
} from './config';

// define aliases
export const buildSvgSprite = series(buildVectorSpriteTask, buildSymbolCleanupTask);
let styles = scss; // Alias for scss compilation
export const revClean = series(deleteRevvedFiles, deleleteRevManifest);

// Gulp Tasks

function watchFiles() {
  // this task watches files for changes and triggers compilation and BrowserSync reloads
  gulp.watch([config.paths.styles.watch], styles);
  gulp.watch(config.paths.scripts.watch, series(scripts, reload));
  gulp.watch(config.paths.copy.src, copy);
  gulp.watch(config.paths.templates.compile, series(templates, reload));
  gulp.watch(config.paths.templates.watch, series(reload));
  gulp.watch([config.paths.images.contentImages, config.paths.images.vectorImages], series(minifyImages, reload));
  gulp.watch(config.paths.images.vectorSprite, buildSvgSprite);
  gulp.watch(config.paths.fonts.src, series(fonts, reload));
}


if (config.stylelint) {
  styles = series(stylelint, scss);
}


export const build = series(
  // this task builds all assets and revisions them afterwards
  // read more about revving in the readme
  revClean,
  parallel(styles, scripts,  templates, minifyImages, fonts, buildSvgSprite),
  rev
);

export const dev = series(
  // this task first cleans revved files if they exist and regenerates assets that have changed
  // you would run this at first, when you start a new project
  series(
    revClean,
    parallel(styles, scripts,  templates, minifyImages, fonts, buildSvgSprite),
  ),
  serve,
  watchFiles
);

export const watch = series(
  // this task only serves (depending on your config) and watches files
  serve,
  watchFiles
);

// exports.deploy = deploy; // deploy task not ready yet

exports.watch = watch;
exports.clean = clean;
exports.css = styles;
exports.styles = styles;
exports.rev = rev;
exports.copy = copy;
exports.scripts = scripts;
exports.minifyImages = minifyImages;
exports.copyImages = copyImages;

export default dev;
