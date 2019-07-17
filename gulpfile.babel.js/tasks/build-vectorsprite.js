/**
 * Build SVG Sprite File
 * @description Build an SVG Vector Sprite and a Map file
 */

// Dependencies
import {
  src,
  dest,
  series
} from 'gulp';
import plumber from 'gulp-plumber';

import svgSprite from 'gulp-svg-sprite';
import imagemin from 'gulp-imagemin';
import debug from 'gulp-debug';
import cheerio from 'gulp-cheerio';

// import svgo from 'imagemin-svgo';

// Config
import {
  config
} from '../config';

export function buildVectorSpriteTask() {
  return src(config.paths.images.vectorSprite)
    .pipe(debug({
      title: 'unicorn:'
    }))

    .pipe(plumber())
    .pipe(imagemin([
      imagemin.svgo({
        plugins: config.minify.images.svgoPlugins
      })
    ]))
    .pipe(svgSprite(
      {
        shape: {
          dimension: {  // Set maximum dimensions
            maxWidth: config.images.vectorSprite.maxWidth,
            maxHeight: config.images.vectorSprite.maxHeight
          },
          spacing: { // Add padding
            padding: config.images.vectorSprite.padding
          },
          dest: config.paths.images.dest
        },
        mode: {
          view: {  // Activate the «view» mode
            sprite: config.images.vectorSprite.name,
            dest: config.paths.images.dest,
            bust: false,
            prefix: '%%svg',
            render: {
              css: true, // CSS output option for icon sizing
              scss: false // SCSS output option for icon sizing
              // scss : {
              //   template: config.system + 'tpl_svgsprite.scss',
              //   dest: config.style +'maps/_sprite-svg.scss'
              // }
            }
          },
          symbol: {
            sprite: config.images.vectorSprite.symbolName,
            dest: config.paths.images.dest
          }
        }
      }
    ))
    .pipe(dest('./'));
}

export const buildSymbolCleanupTask = () => {
  return src([config.paths.images.dest + config.images.vectorSprite.symbolName], {
    base: './'
  })
    .pipe(cheerio({
      run: function ($) {
        $('[fill^="#"]').removeAttr('fill');
        $('[fill^="none"]').removeAttr('fill');
        $('[fill-rule]').removeAttr('fill-rule');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(dest('./'));
};

export const buildSvgSprite = series(buildVectorSpriteTask, buildSymbolCleanupTask);
