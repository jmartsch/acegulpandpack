/*
 * @title serve
 * @description A task to initialise browser-sync
 * either via proxy or serving the files directly
 * depending on your settings
 */

// Dependencies
import browserSync from 'browser-sync';
import gulp from 'gulp';

// Config
import {config} from '../config';

// Task
// const server = browserSync.create();

export function serve(cb) {
  // Build a condition when Proxy is active
  let bsProxy;
  let bsServer;

  // Condition for Proxy
  if (config.browserSyncConfig.proxy != '') {
    bsProxy = {
      target: config.browserSyncConfig.proxy,
      ws: true
    };
    bsServer = false;
  } else {
    bsProxy = false;
    bsServer = {
      baseDir: [config.paths.dest]
    };
  }

  browserSync.init({
    server: bsServer,
    proxy: bsProxy,
    notify: config.browserSyncConfig.notify,
    open: config.browserSyncConfig.open,
    https: config.browserSyncConfig.https,
    ghostMode: config.browserSyncConfig.ghostMode,
    debugInfo: config.browserSyncConfig.debugInfo,
    watchTask: config.browserSyncConfig.watchTask,
  });
  cb();
}

gulp.task('browser-sync', serve);

export function reload(cb) {
  browserSync.reload();
  cb();
}
