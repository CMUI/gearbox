'use strict'

const path = require('path')
const gulp = require('gulp')
const del = require('del')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const wrap = require('gulp-wrap')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify')

const myPath = {
	temp: './.tmp/',
	src: './src/',
	dest: './dist/',
}
const FILENAME = 'gearbox'
const NS = 'gearbox'

const scripts = [
	'./src/core.js',
	'./src/str.js',
	'./src/root.js',
	'./src/ua.js',
	'./src/url.js',
	'./src/dom.js',
]

const modules = {
	action:   './bower_components/action/src/action.js',
	template: './bower_components/underscore-template/src/underscore-template.js',
}

gulp.task('default', ['clean'], function () {
	gulp.start('js')
})

gulp.task('clean', function (callback) {
	del(path.join(myPath.dest, '*.*'), callback)
})

gulp.task('clean-temp', function (callback) {
	del(path.join(myPath.temp, '*.*'), callback)
})

gulp.task('prepare-module', ['clean-temp'], function () {
	Object.keys(modules).forEach(function (key) {
		const src = modules[key]
		gulp.src(src)
			.pipe(wrap('*/\n<%= contents %>\n/*'))
			.pipe(wrap({src: path.join(myPath.src, '_wrapper/mod-' + key + '.js')}))
			.pipe(rename(key + '.js'))
			.pipe(gulp.dest(myPath.temp))
	})
})

gulp.task('js', function() {
	// combine external modules
	Object.keys(modules).forEach(function (key) {
		scripts.push(path.join(myPath.temp, key + '.js'))
	})

	gulp.src(scripts)
		.pipe(concat(FILENAME + '.js'))
		.pipe(wrap('*/\n<%= contents %>\n/*'))
		.pipe(wrap({src: path.join(myPath.src, '_wrapper/dist-trad.js')}))
		.pipe(replace(/\/\*\* DEBUG_INFO_START \*\*\//g, '/*'))
		.pipe(replace(/\/\*\* DEBUG_INFO_END \*\*\//g, '*/'))
		.pipe(gulp.dest(myPath.dest))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename(FILENAME + '.min.js'))
		.pipe(gulp.dest(myPath.dest))
})
