
////////////////////  str - alternative to underscore.string  ////////////////////
// this file contains apis same as underscore.string's.
// heavily inspired by [underscore.string](https://github.com/epeli/underscore.string)

// if you has underscore.string in your project,
// just skip this file when building your own package.

void function (window, _ext) {
	'use strict'

	// namespace
	var str = _.str || {}
	// check underscore.string - quit if underscore.string existed
	if (str.VERSION && typeof str.trim === 'function') return

	// source: https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js
	// util
	var _s = str
	var nativeTrim = String.prototype.trim
	var nativeTrimRight = String.prototype.trimRight
	var nativeTrimLeft = String.prototype.trimLeft

	function makeString(object) {
		if (object == null) return ''
		return '' + object
	}
	function toPositive(number) {
		return number < 0 ? 0 : (+number || 0)
	}

	function defaultToWhiteSpace(characters) {
		if (characters == null)
			return '\\s'
		else if (characters.source)
			return characters.source
		else
			return '[' + _s.escapeRegExp(characters) + ']'
	}
	str.escapeRegExp = function (str) {
		if (str == null) return ''
		return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
	}

	// trim
	str.trim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrim) return nativeTrim.call(str)
		characters = defaultToWhiteSpace(characters)
		return makeString(str).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '')
	}
	str.ltrim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str)
		characters = defaultToWhiteSpace(characters)
		return makeString(str).replace(new RegExp('^' + characters + '+'), '')
	}
	str.rtrim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrimRight) return nativeTrimRight.call(str)
		characters = defaultToWhiteSpace(characters)
		return makeString(str).replace(new RegExp(characters + '+$'), '')
	}

	// sub-string
	str.include = function (str, needle, position) {
		if (needle === '') return true
		position = position == null ? 0 : Math.min(toPositive(position), str.length)
		return makeString(str).slice(position).indexOf(needle) !== -1
	}
	str.startsWith = function (str, starts, position) {
		str = makeString(str)
		starts = '' + starts
		position = position == null ? 0 : Math.min(toPositive(position), str.length)
		return str.lastIndexOf(starts, position) === position
	}
	str.endsWith = function (str, ends, position) {
		str = makeString(str)
		ends = '' + ends
		if (typeof position == 'undefined') {
			position = str.length - ends.length
		} else {
			position = Math.min(toPositive(position), str.length) - ends.length
		}
		return position >= 0 && str.indexOf(ends, position) === position
	}

	// aliases
	_s.contains = _s.include

	// exports
	_ext.exports('str', str)

}(window, _ext)
