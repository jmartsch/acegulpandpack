const critical = require('critical');
import { config } from '../config';
const PromisePool = require('es6-promise-pool');
const log = require('fancy-log');
const logSymbols = require('log-symbols');

export function criticalcss(cb) {
  const pages = config.criticalCssConfig.pages;
  // Modified example code from promiseProducer docs
  const promiseProducer = function () {
    const page = pages.pop();
    if (!page) {
      return null;
    }
    const url = config.criticalCssConfig.baseUrl + page.url + '?criticalcss=false';
    log(logSymbols.info, `Generating critical CSS for template ${page.template} with URL ${url}`);
    // critical.generate returns a Promise.
    return critical.generate({
      base: './',
      inline: false,
      src: url,
      target: config.paths.styles.dest +  page.template + config.criticalCssConfig.suffix,
      minify: true,
      // width: config.criticalCssConfig.criticalWidth,
      // height: config.criticalCssConfig.criticalHeight,
      dimensions: [
        {width: 375, height: 1200},
        {width: 1024, height: 1400},
        {width: 1280, height: 1500}
      ],
      ignore: {
        atrule: ['@font-face'],
      },
      // include: [
      //   '.foundation-mq',
      //   '.is-dropdown-submenu',
      // ]
    });
  };

  let pool = new PromisePool(promiseProducer, config.criticalCssConfig.concurrency);

  let poolPromise = pool.start();
  poolPromise.then(function () {
    log.info(logSymbols.success, 'All critical css files generated');
    cb();
  }, function (error) {
    log.error(logSymbols.error,'Failed to generate all/some critical css files: ' + error.message);
    cb();

  });
  // return poolPromise.resolve('cool');

}
