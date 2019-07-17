/*
 * @title Images
 * @description A task to copy images
 */

// Dependencies
import { src, dest, parallel, series } from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import errorHandler from '../util/errorHandler.js';
import fs from 'fs';

// Config
import {
  config
} from '../config';

const revAll = require('gulp-rev-all');
const revDistClean = require('gulp-rev-dist-clean');
const del = require('del');

export function deleteRevvedFiles(callback) {
  if (fs.existsSync(config.paths.revManifest.path)) {
    return src([`${config.paths.assets}{img,css}/**/*.{jpg,jpeg,png,svg,gif,css}`], {
      read: false
    })
      .pipe(revDistClean(config.paths.revManifest.path, {
        keepRenamedFiles: false
      }));
  }
  callback();
}

export function deleleteRevManifest(callback) {
  if (fs.existsSync(config.paths.revManifest.path)) {
    return del(config.paths.revManifest.path);
  }
  callback();
}

export function rev() {
  return src([`${config.paths.assets}{img,css}/**/*.{jpg,jpeg,png,svg,gif,css}`])
    .pipe(revAll.revision({
      fileNameManifest: config.paths.revManifest.path,
      includeFilesInManifest: ['.css', '.jpg', '.png', '.svg', '.gif']
    }))
    .pipe(dest(config.paths.assets))
    .pipe(revAll.manifestFile())
    .pipe(dest('./'));
}

export const revClean = series(deleteRevvedFiles, deleleteRevManifest);