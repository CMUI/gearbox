
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

	var defaultToWhiteSpace = function (characters) {
		if (characters == null)
			return '\\s'
		else if (characters.source)
			return characters.source
		else
			return '[' + _s.escapeRegExp(characters) + ']'
	}
	str.escapeRegExp = function (str) {
		if (str == null) return ''
		return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
	}

	// trim
	str.trim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrim) return nativeTrim.call(str)
		characters = defaultToWhiteSpace(characters)
		return String(str).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '')
	}
	str.ltrim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str)
		characters = defaultToWhiteSpace(characters)
		return String(str).replace(new RegExp('^' + characters + '+'), '')
	}
	str.rtrim = function (str, characters) {
		if (str == null) return ''
		if (!characters && nativeTrimRight) return nativeTrimRight.call(str)
		characters = defaultToWhiteSpace(characters)
		return String(str).replace(new RegExp(characters + '+$'), '')
	}

	// sub-string
	str.include = function (str, needle) {
		if (needle === '') return true
		if (str == null) return false
		return String(str).indexOf(needle) !== -1
	}
	str.startsWith = function (str, starts) {
		if (starts === '') return true
		if (str == null || starts == null) return false
		str = String(str)
		starts = String(starts)
		return str.length >= starts.length && str.slice(0, starts.length) === starts
	}
	str.endsWith = function (str, ends) {
		if (ends === '') return true
		if (str == null || ends == null) return false
		str = String(str)
		ends = String(ends)
		return str.length >= ends.length && str.slice(str.length - ends.length) === ends
	}

	// aliases
	_s.contains = _s.include

	// exports
	_ext.exports('str', str)

}(window, _ext)
