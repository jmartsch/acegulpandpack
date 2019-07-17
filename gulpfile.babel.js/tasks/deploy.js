/*
 * @title Deploy
 * @description Publish contents to Github pages
 */

// Dependencies
import { src } from 'gulp';
import ghPages from 'gulp-gh-pages';

// Config
import { config } from "../config";

// Task
export function deploy() {
  return src(config.paths.deploy)
    .pipe(ghPages())
 }
