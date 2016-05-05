
////////////////////  root  ////////////////////
void function (window, gearbox) {
	'use strict'

	var root = {
		$: function (input) {
			var result
			if (_.isElement(input)) {
				result = input.__$__ = input.__$__ || $(input)
			} else if (gearbox.dom.is$Element(input)) {
				result = input
			} else {
				result = $(input)
			}
			return result
		},
		isPlainObject: $.isPlainObject
	}

	gearbox.__defineModule('root', root)

}(window, gearbox)
