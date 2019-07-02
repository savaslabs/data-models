/** Modules **/

const fs = require('fs')
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
  }
}



/** Tasks **/

let tasks = {
  pug() {
    return gulp.src(paths.pug.src)
      .pipe( pug() )
      .pipe( htmlbeautify({indent_size: 2}) )
      .pipe( rename(function(path) {
        path.dirname = path.dirname.replace('views/',''),
        path.extname = '.xml'
      }) )
      .pipe( gulp.dest(paths.pug.dest) )
  },
  xml() {
    return gulp.src(paths.xml.src)
      .pipe( xml2json({ trim: true, explicitArray: false, explicitRoot: false}) )
      .pipe( rename({extname: '.json'}) )
      .pipe( jsonformat(2) )
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
exports.default = gulp.series(tasks.pug, tasks.xml, tasks.watch)
