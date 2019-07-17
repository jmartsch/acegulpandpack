/*
 * @title Clean
 * @description A task to delete the output directory
 */

// Dependencies
import del from 'del';

// Config
import { config } from '../config';

// Task
export function clean() {
  return del(config.paths.assets);
}
