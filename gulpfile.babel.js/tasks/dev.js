/*
 * @title Dev
 * @description A task to generate a development environment,
 * start the server and watch for changes.
 */

// Dependencies
import { series, parallel } from 'gulp';

// Tasks
import { revClean } from './rev';
import { buildSvgSprite, scripts, styles, templates, minifyImages, fonts } from './build';
import { watch } from './watch';
import { serve } from './server';

export const dev = series(
  // this task first cleans revved files if they exist and regenerates assets that have changed
  // you would run this at first, when you start a new project
  series(
    revClean,
    parallel(styles, scripts, templates, minifyImages, fonts, buildSvgSprite)
  ),
  serve,
  watch
);