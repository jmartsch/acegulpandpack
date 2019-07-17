/*
 * @title Build
 * @description A task to compile production code.
 */

// Dependencies
import { series, parallel } from 'gulp';

// Tasks
import { reload, serve } from './server';
import { revClean } from './rev';
import { styles } from './styles';
import { scripts } from './scripts';
import { templates } from './templates';
import { copyImages } from './copy-images';
import { fonts } from './fonts';
import { copy } from './copy';
import { buildSvgSprite } from './build-vectorsprite';
import { minifyImages } from './minify-images';
import { rev } from './rev';

// Config
import { config } from '../config';

export const build = series(
  // this task builds all assets and revisions them afterwards
  // read more about revving in the readme
  revClean,
  parallel(styles, scripts, templates, minifyImages, fonts, buildSvgSprite),
  rev
);