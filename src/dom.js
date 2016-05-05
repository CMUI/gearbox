
////////////////////  dom  ////////////////////
void function (window, gearbox) {
	'use strict'

	// namespace
	var dom = {}

	// shortcuts for frequently-used elements
	dom.$win = $(window)
	dom.$root = $(document.documentElement)
	dom.$body = $(document.body)

	// methods
	dom.is$Element = function (o) {
		if (!o || !_.isObject(o)) return false
		var result = false
		if ('__proto__' in o) {
			result = o.__proto__ === $.fn
		} else {
			var Class = ($.zepto && $.zepto.Z) || $
			result = o instanceof Class
		}
		return result
	}

	// exports
	gearbox.__defineModule('dom', dom)

}(window, gearbox)
