'use strict'

var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglifyjs')
var del = require('del')

var scripts = [
	'./src/adapter-dist-trad/_intro.js',
	'./src/adapter-dist-trad/var.js',
	'./src/adapter-dist-trad/_defense.js',
	'./src/core.js',
	'./src/str-backup.js',
	'./src/str.js',
	'./src/root.js',
	'./src/ua.js',
	'./src/url.js',
	'./src/dom.js',
	'./src/adapter-mod-action/_intro.js',
	'./bower_components/action/src/action.js',
	'./src/adapter-mod-action/_outro.js',
	'./src/adapter-mod-template/_intro.js',
	'./bower_components/underscore-template/src/underscore-template.js',
	'./src/adapter-mod-template/config.js',
	'./src/adapter-mod-template/_outro.js',
	'./src/adapter-dist-trad/_outro.js'
]

gulp.task('default', ['clean'], function () {
	gulp.start('js')
})

gulp.task('clean', function () {
	del('./dist/*.js')
})

gulp.task('js', function() {
	gulp.src(scripts)
		.pipe(concat('gearbox.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify('gearbox.min.js'))
		.pipe(gulp.dest('./dist'))
})
