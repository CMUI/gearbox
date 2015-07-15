'use strict'

var path = require('path')
var gulp = require('gulp')
var del = require('del')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var wrap = require('gulp-wrap')
var replace = require('gulp-replace')
var uglify = require('gulp-uglify')

var myPath = {
	temp: './.tmp/',
	src: './src/',
	dest: './dist/',
}

var scripts = [
	'./src/core.js',
	'./src/str-alt.js',
	'./src/str.js',
	'./src/root.js',
	'./src/ua.js',
	'./src/url.js',
	'./src/dom.js',
]

var modules = {
	action:   './bower_components/action/src/action.js',
	template: './bower_components/underscore-template/src/underscore-template.js',
}

gulp.task('default', ['clean', 'prepare-module'], function () {
	gulp.start('js')
})

gulp.task('clean', function () {
	del(path.join(myPath.dest, '*.*'))
})

gulp.task('clean-temp', function () {
	del(path.join(myPath.temp, '*.*'))
})

gulp.task('prepare-module', ['clean-temp'], function () {
	Object.keys(modules).forEach(function (key) {
		var src = modules[key]
		gulp.src(src)
			.pipe(wrap({src: path.join(myPath.src, '_wrapper/mod-' + key + '.ejs')}))
			.pipe(rename(key + '.js'))
			.pipe(gulp.dest(myPath.temp))
	})
})

gulp.task('js', ['prepare-module'], function() {
	// combine external modules
	Object.keys(modules).forEach(function (key) {
		scripts.push(path.join(myPath.temp, key + '.js'))
	})

	gulp.src(scripts)
		.pipe(concat('gearbox.js'))
		.pipe(wrap({src: path.join(myPath.src, '_wrapper/dist-trad.ejs')}))
		.pipe(replace(/\/\*\* DEBUG_INFO_START \*\*\//g, '/*'))
		.pipe(replace(/\/\*\* DEBUG_INFO_END \*\*\//g, '*/'))
		.pipe(gulp.dest(myPath.dest))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename('gearbox.min.js'))
		.pipe(gulp.dest(myPath.dest))
})
