
////////////////////  str  ////////////////////
void function (window, gearbox) {
	'use strict'

	// namespace
	var str = {}

	////////////////////  START: alternative to underscore.string  ////////////////////
	// this section contains apis same as underscore.string's.
	// heavily inspired by [underscore.string](https://github.com/epeli/underscore.string)
	// source: https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js

	// util
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
			return '[' + str.escapeRegExp(characters) + ']'
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
	str.includes = function (str, needle, position) {
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
	str.contains = str.includes
	// @DEPRECATED
	str.include = str.includes

	////////////////////  END: alternative to underscore.string  ////////////////////


	// shortcuts for frequently-used characters
	str.CNY = str.RMB = '\xA5'	// CNY(RMB) symbol
	str.FULL_WIDTH_CNY = str.FULL_WIDTH_RMB = '\uffe5'	// full-width version of CNY(RMB) symbol

	// shortcuts for frequently-used regexp
	str.RE_EMAIL = /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i
	str.RE_MOBILE = /^1[34578]\d{9}$/
	str.RE_POSTCODE = /^\d{6}$/

	// hash
	str.isHash = function (str) {
		str = gearbox.str.trim(str)
		return gearbox.str.startsWith(str, '#')
	}
	str.stripHash = function (str) {
		str = gearbox.str.trim(str)
		str = gearbox.str.ltrim(str, '#')
		if (gearbox.str.startsWith(str, '!')) str = str.slice(1)
		return str
	}

	// more `toNumber` methods
	str.toFloat = function (str) {return parseFloat(str)}
	str.toInt = function (str) {
		var n = parseFloat(str)
		return n < 0 ? Math.ceil(n) : Math.floor(n)
	}
	str.toFixed = function (str, i) {return gearbox.str.toFloat(gearbox.str.toFloat(str).toFixed(i || 0))}

	// exports
	gearbox.__defineModule('str', str)

}(window, gearbox)
