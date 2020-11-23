# Acegulp 4
A set of gulp 4 tasks with JS transpilation, webpack, SVG Sprites, minification and file revving

# What is inside?
* Gulp 4
* Webpack 5 with Babel
* SVG Sprites with minification
* Browsersync with proxy for existing webservers
* File revving
* JavaScript transpilation with Babel and minification
* SCSS compilation with minification and sourcemaps

### Requirements
Make sure all dependencies have been installed before moving on:

* [yarn](https://yarnpkg.com/lang/en/) or [npm](https://www.npmjs.com/get-npm)
* [Node.js](https://nodejs.org/en/download/) >= 8.16.0
* [Gulp](http://gulpjs.com/)

# Installation
- clone (as a submodule?) or copy the files into your root directory
- `yarn` or `npm install` to install dependencies
- modify paths and everything else to your likings in the file `gulpfile.babel.js/config.js`
- adjust target browsers in .browserslist.rc
- adjust eslint settings in .eslint.rc



# Opinionated
This set of tools is very opinionated, because I did it my way, just like Frank Sinatra :)
Uses cross-env because Windows handles node environment variables differently.

Sourcemaps and stylelint settings are the same for source and production.

Uses src and dist directories with default settings but you can change them. 

## Tasks
You run the different tasks with `npm run taskname`.

On the first run you would use `npm run start`.

Here are the different available tasks
* start - starts the default gulp task
* watch -  watches files and triggers compiling if they are changed - watch out: rev manifest is still there and outdated files could be served
* dev - First cleans the rev manifest and copies and compiles files then watches the files. Following tasks are being run:

  * styles
  * scripts
  * templates
  * minifyImages
  * fonts
  * buildSvgSprite
* build - builds this thingy - uses filename revving
* deploy is not being used

## File revving
What is file revving ? 

File revving is a strategy to bypass caching problems.
You can read about different strategies here https://css-tricks.com/strategies-for-cache-busting-css/

To use long term caching https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching 
or https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31 
I created a rev task which renames files based on their hash value.
A manifest file is generated that maps the original name to the hashed file name, then I use a PHP script which reads the hashed files from this mapping.

Here is an example code (for ProcessWire) that I use to get the revved filename. A general example will be added later.

It looks if the manifest file exists and returns the revved filename. 

If the manifest does not exist, the original filename is returned.

```
function asset_path($filename, $path = false)
{
  $manifest = \ProcessWire\wire()->config->manifest;
  if ($manifest === false) {
    if ($path === false) {
      return \ProcessWire\wire()->config->urls->templates . "assets/" . $filename;
    } else {
      return \ProcessWire\wire()->config->paths->templates . "assets/" . $filename;
    }
  } else {
    $manifest_filename = "";
    if (array_key_exists($filename, $manifest)) {
//          bd("manifest eintrag für $filename existiert");
      if ($path === false) {
        $manifest_filename = \ProcessWire\wire()->config->urls->templates . "assets/" . $manifest[$filename];
      } else {
        $manifest_filename = \ProcessWire\wire()->config->paths->templates . "assets/" . $manifest[$filename];
      }
    }
    return $manifest_filename;
  }
}
```

# Automatic JavaScript injection with html-webpack-plugin

Generates a "script.html" file in config.paths.templates.dest which can be included server side to include the JavaScripts in your website.
The template for this injection is an empty .html file which is defined in `config.js` at config.paths.templates.inject,
Webpack reads the template file, injects the code and writes out the file to the destination.

# Todo
 * needs cleanup in config.js 
 * add better documentation
 * add generic code to get revved filename

#Again, why use both Webpack and Gulp?
Taken from https://css-tricks.com/combine-webpack-gulp-4/

Static File Handling
Gulp can handle static assets better than Webpack. The Copy Webpack Plugin can also copy files from your source to your build folder but when it comes to watching file deletion or changes like overriding an image, gulp.watch is a safer bet.

Server Environment
Webpack also comes with a local server environment via Webpack Dev Server but using BrowserSync has some features you might not want to miss:

CSS/HTML/image injection for non-app projects
multiple device testing out of the box
includes an admin panel for more control
bandwidth throttling for speed and loading tests
Compilation Time
As seen in this post on GitHub Sass gets processed by node-sass much quicker than by Webpack's combination of sass-loader, css-loader and extract-text-webpack-plugin.

Convenience
In Webpack, you have to import your CSS and SVG files for instance into JavaScript to process them which can be quite tricky and confusing sometimes. With Gulp, you don't need to adjust your workflow.
