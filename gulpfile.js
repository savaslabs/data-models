/** Modules **/

const fs = require('fs')
const del = require('del')
const gulp = require('gulp')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const xml2json = require('gulp-xml2json')
const htmlbeautify = require('gulp-html-beautify')
const jsonformat = require('gulp-json-format')



/** Paths **/

let paths = {
  pug: {
    src: [
      'src/pug/views/**/*.pug',
      '!**/_*.pug'
    ],
    dest: 'dist/xml'
  },
  xml: {
    src: 'dist/xml/**/*.xml',
    dest: 'dist/json'
  },
  clean(name) {
    return [`${paths[name].dest}/**`, `!${paths[name].dest}`]
  }
}



/** Tasks **/

let tasks = {
  clean() {
    del.sync(paths.clean('pug'))
    del.sync(paths.clean('xml'))
    return Promise.resolve()
  },
  pug() {
    return gulp.src(paths.pug.src)
      .pipe( pug({doctype: 'xml'}) )
      .pipe( htmlbeautify({indent_size: 2}) )
      .pipe( rename(function(path) {
        path.dirname = path.dirname.replace('views/',''),
        path.extname = '.xml'
      }) )
      .pipe( gulp.dest(paths.pug.dest) )
  },
  xml() {
    return gulp.src(paths.xml.src)
      .pipe( xml2json({ coerce: true, trim: true, explicitArray: false, explicitRoot: false}) )
      .pipe( rename({extname: '.json'}) )
      .pipe( jsonformat(2) )
      .pipe( replace(/(": )"(true|false)"(\,?\n)/g, '$1$2$3') )
      .pipe( replace(/(": )"([1-9][0-9]*)"(\,?\n)/g, '$1$2$3') )
      .pipe( gulp.dest(paths.xml.dest) )
  },
  watch() {
    gulp.watch('src/pug/**/*.pug', tasks.pug)
    gulp.watch('dist/xml/**/*.xml', tasks.xml)
  }
}



/** Exports **/
exports.pug = tasks.pug
exports.xml = tasks.xml
exports.watch = tasks.watch
exports.clean = gulp.series(tasks.clean, tasks.pug, tasks.xml)
exports.default = gulp.series(tasks.pug, tasks.xml, tasks.watch)
