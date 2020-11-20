/*
 * @title Config
 */

// Paths

export const config = {
  stylelint: true,
  browserSyncConfig: {
    ghostMode: {
      clicks: true,
      scroll: true,
      links: true,
      forms: true
    },
    server: {
      baseDir: ['/dist/']
    },
    proxy: 'https://myproject.localhost',
    https: true,
    open: false,
    debugInfo: false,
    watchTask: false,
    notify: {
      styles: [
        'padding: 8px 16px;',
        'position: fixed;',
        'font-size: 12px;',
        'font-weight: bold',
        'z-index: 9999;',
        'top: inherit',
        'border-radius: 0',
        'right: 0;',
        'top: 0;',
        'color: #f4f8f9;',
        'background-color: #026277;',
        'text-transform: uppercase'
      ]
    }
  },
  'revReplace': {
    'opts': {
      'replaceInExtensions': [
        '.css'
      ]
    }
  },
  minify: {
    images: {
      svgoPlugins: [{
        'cleanupIDs': false
      },
      {
        'removeComments': true
      },
      {
        'removeViewBox': false
      },
      {
        'removeDesc': true
      },
      {
        'removeUselessDefs': false
      },
      {
        'removeDoctype': true
      },
      {
        'removeEmptyText': true
      },
      {
        'removeUnknownsAndDefaults': true
      },
      {
        'removeEmptyContainers': true
      },
      {
        'collapseGroups': true
      },
      {
        'removeUselessStrokeAndFill': true
      },
      {
        'convertStyleToAttrs': true
      }
      ],
      'optimizationLevel': 3,
      'pngquant': {
        'quality': '75-88',
        'speed': 4
      },
      'progressive': true,
      'interlaced': true
    },
    'javascript': {
      'options': {
        'mangle': false
      }
    }
  },
  images: {
    'bitmapSprite': {
      'name': 'sprite.png'
    },
    vectorSprite: {
      'name': 'vector-sprite.svg',
      'symbolName': 'symbol-sprite.svg',
      'maxHeight': 30,
      'maxWidth': 30,
      'padding': 0
    },
    bitmaps: 'src/img/bitmapSingle-assets/',
  },
  system: 'src/.system/',
  paths: {
    src: './src/',
    dest: './dist/',
    deploy: './dist/**/*',
    assets: 'dist/site/templates/assets/',
    styles: {
      src: 'src/styles/*.scss',
      watch: 'src/styles/**/*.scss',
      modules: 'src/modules/**/*.scss',
      dest: 'dist/site/templates/assets/css',
      lint: 'src/styles/**/*.s+(a|c)ss'
    },
    scripts: {
      src: './src/scripts/main.js',
      watch: 'src/scripts/**/*.js',
      modules: 'src/modules/**/*.js',
      dest: 'dist/js',
    },
    templates: {
      src: 'src/structure/**/*.{twig,html,ejs,tpl}',
      inject: 'src/structure/views/scripts.html',
      watch: ['src/templates/**/*.{twig,html,ejs,tpl}', 'dist/site/templates/**/*.{twig,html,ejs,tpl}', 'src/structure/**/*.{twig,html,ejs,tpl}'],
      compile: ['src/structure/**/*.{twig,ejs,tpl}'],
      modules: 'src/modules/**/*.{twig,html,ejs}',
      dest: 'dist/site/templates'
    },
    images: {
      src: 'src/img/**/*',
      dest: 'dist/site/templates/assets/img/',
      contentImages: 'src/img/htmlimages/**/*',
      vectorImages: 'src/img/vectorSingle-assets/**/*.svg',
      vectorSprite: 'src/img/vectorSprite-assets/**/*.svg',
    },
    fonts: {
      src: 'src/fonts/**/*',
      dest: 'dist/site/templates/assets/fonts'
    },
    copy: {
      src: ['src/img/copy-only/**/*'],
      dest: 'dist/site/templates/assets/img/'
    },
    webpackPublicPath: '/site/templates/assets/js/',
    revManifest: {
      path: 'dist/site/templates/assets/rev-manifest.json',
      opts: {
        'merge': false
      }
    }
  }
};

export const isProd = process.env.NODE_ENV === 'production';
