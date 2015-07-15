
////////////////////  root  ////////////////////
void function (window, _ext) {
	'use strict'

	var root = {
		$: function (input) {
			var result
			if (_.isElement(input)) {
				result = input.__$__ = input.__$__ || $(input)
			} else if (_.dom.is$Element(input)) {
				result = input
			} else {
				result = $(input)
			}
			return result
		},
		isPlainObject: $.isPlainObject
	}

	_ext.exports('root', root)

}(window, _ext)
