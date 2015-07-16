
////////////////////  str  ////////////////////
void function (window, _ext) {
	'use strict'

	// namespace
	var str = _.str || {}

	// shortcuts for frequently-used characters
	str.CNY = str.RMB = '\xA5'	// CNY(RMB) symbol
	str.FULL_WIDTH_CNY = str.FULL_WIDTH_RMB = '\uffe5'	// full-width version of CNY(RMB) symbol

	// shortcuts for frequently-used regexp
	str.RE_EMAIL = /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i
	str.RE_MOBILE = /^1[34578]\d{9}$/
	str.RE_POSTCODE = /^\d{6}$/

	// hash
	str.isHash = function (str) {
		str = _.str.trim(str)
		return _.str.startsWith(str, '#')
	}
	str.stripHash = function (str) {
		str = _.str.trim(str)
		str = _.str.ltrim(str, '#')
		if (_.str.startsWith(str, '!')) str = str.slice(1)
		return str
	}

	// array of string
	str.uniq = str.unique = function (arr) {
		if (!_.isArray(arr)) return false
		var obj = {}
		_.each(arr, function (str) {
			obj[String(str)] = null
		})
		return _.keys(obj)
	}

	// more `toNumber` methods
	str.toFloat = function (str) {return parseFloat(str)}
	str.toInt = function (str) {
		var n = parseFloat(str)
		return n < 0 ? Math.ceil(n) : Math.floor(n)
	}
	str.toFixed = function (str, i) {return _.str.toFloat(_.str.toFloat(str).toFixed(i || 0))}

	// exports
	_ext.exports('str', str)

}(window, _ext)
