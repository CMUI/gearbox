'use strict'

const path = require('path')
const gulp = require('gulp')
const gulpfiles = require('gulpfiles')
const rename = require('gulp-rename')
const wrap = require('gulp-wrap')
const replace = require('gulp-replace')

const streamToPromise = require('gulp-stream-to-promise')

const myPath = {
	temp: './.tmp/',
	src: './src/',
	dest: './dist/',
}
const FILENAME = 'gearbox'
// const NS = 'gearbox'

const modules = {
	action:   './bower_components/action/src/action.js',
	template: './bower_components/underscore-template/src/underscore-template.js',
}

const scripts = {
	[FILENAME + '.js']: [
		'./src/core.js',
		'./src/str.js',
		'./src/root.js',
		'./src/ua.js',
		'./src/url.js',
		'./src/dom.js',
	]
}
// combine external modules
Object.keys(modules).forEach(function (key) {
	scripts[FILENAME + '.js'].push(path.join(myPath.temp, key + '.js'))
})

gulp.task('clean', gulpfiles.del({
	glob: path.join(myPath.dest, '*.*'),
}))

gulp.task('clean-temp', gulpfiles.del({
	glob: path.join(myPath.temp, '*.*'),
}))

gulp.task('prepare-module', function () {
	let tasks = []
	Object.keys(modules).forEach(function (key) {
		const src = modules[key]
		let stream = gulp.src(src)
			.pipe(wrap('*/\n<%= contents %>\n/*'))
			.pipe(wrap({src: path.join(myPath.src, '_wrapper/mod-' + key + '.js')}))
			.pipe(rename(key + '.js'))
			.pipe(gulp.dest(myPath.temp))
		tasks.push(streamToPromise(stream))
	})
	return Promise.all(tasks)
})

gulp.task('js', gulpfiles.concat({
	rules: scripts,
	dest: myPath.dest,
	config: {
		pipes: [
			{
				plugin: 'wrap',
				config: '*/\n<%= contents %>\n/*',
			},
			{
				plugin: 'wrap',
				config: {src: path.join(myPath.src, '_wrapper/dist-trad.js')},
			},
			{
				plugin: 'replace',
				config: [/\/\*\* DEBUG_INFO_START \*\*\//g, '/*'],
			},
			{
				plugin: 'replace',
				config: [/\/\*\* DEBUG_INFO_END \*\*\//g, '*/'],
			},
			{
				plugin: 'uglify',
				rename: FILENAME + '.min.js',
				config: {
					preserveComments: 'some',
				},
			}
		]
	},
}))

gulp.task('dist', gulp.series([
	'clean',
	'clean-temp',
	'prepare-module',
	'js',
]))
gulp.task('default', gulp.series('dist'))
