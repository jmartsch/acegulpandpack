/*
 * @title Clean
 * @description A task to delete the output directory
 */

// Dependencies
import del from 'del';
import gulp from 'gulp';

// Config
import { config } from '../config';

// Task
export function clean() {
  return del( config.paths.clean );
}
