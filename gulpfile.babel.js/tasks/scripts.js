/*
 * @title Scripts
 * @description A task to concatenate and compress js files via webpack
 */

// Dependencies
import { src, dest, series } from 'gulp';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import gulpEslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import errorHandler from '../util/errorHandler.js';
import uglify from 'gulp-uglify';

// Config
import { config, isProd } from '../config';

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

let webpackConfigName = 'webpack.dev.js';

if (isProd) webpackConfigName = 'webpack.prod.js';

// Task
export function esTranspile() {
  return src(config.paths.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(gulpWebpack(require(`../../${webpackConfigName}`), webpack))
    .pipe(dest(config.paths.scripts.dest));
}

export function esLint() {
  return src(config.paths.scripts.src)
    .pipe(gulpEslint({ fix: true }))
    .pipe(gulpEslint.formatEach());
  // .pipe(gulpif(isProd, gulpEslint.failAfterError()));
}

export function scriptCopy() {
  return src(config.paths.copy.src)
    // .pipe(changed(config.paths.copy.dest))
    .pipe(uglify())
    .pipe(dest(config.paths.copy.dest));
}

export const scripts = series(esTranspile, scriptCopy);
