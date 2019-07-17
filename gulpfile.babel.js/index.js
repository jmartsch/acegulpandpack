/*
 * @title gulpfile.babel.js
 * @description A directory file loader to include all the gulp tasks
 *
 */

// Dependencies
import gulp from 'gulp';

import { watch } from './tasks/watch';
import { build } from './tasks/build';
import { deploy } from './tasks/deploy';
import { dev } from './tasks/dev';
import { rev } from './tasks/rev';
import { styles } from './tasks/styles';
import { scripts } from './tasks/scripts';
import {minifyImages} from './tasks/minify-images';
exports.watch = watch;
exports.clean = clean;
exports.styles = styles;
exports.rev = rev;
exports.copy = copy;
exports.webpack = scripts;
exports.minifyImages = minifyImages;
exports.copyImages = copyImages;
exports.build = build;
exports.deploy = deploy;
exports.default = dev;