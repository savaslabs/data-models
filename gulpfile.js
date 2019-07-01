/** Modules **/

const fs = require('fs')
const gulp = require('gulp')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const xml2json = require('gulp-xml2json')
const htmlbeautify = require('gulp-html-beautify')
const jsonformat = require('gulp-json-format')




/** Tasks **/

// pug
gulp.task('pug', () => {
  return gulp.src([
    'src/pug/**/*.pug',
    '!src/pug/**/_*.pug'
  ]).pipe( pug() )
    .pipe( htmlbeautify({indent_size: 2}) )
    .pipe( rename({extname: '.xml'}) )
    .pipe( gulp.dest('dist/xml') )
})

// xml
gulp.task('xml', () => {
  return gulp.src('dist/xml/**/*.xml')
    .pipe(
      xml2json({
        trim: true,
        explicitArray: false,
        explicitRoot: false
      })
    )
    .pipe( rename({extname: '.json'}) )
    .pipe( jsonformat(2) )
    .pipe( gulp.dest('dist/json') )
})

// watch
//gulp.task('watch',
//  gulp.watch('src/pug/**/*.pug',
//    gulp.series('pug','xml')
//  )
//)

// default
//gulp.task('default',
//  gulp.series('pug','xml','watch')
//)
