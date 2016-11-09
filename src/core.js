
////////////////////  core  ////////////////////
// namespace
var gearbox = {}

// shortcut
var document = window.document

void function (window, gearbox) {
	'use strict'

	gearbox.__defineModule = function (moduleName, apiSet) {
		if (!moduleName || !_.isString(moduleName) || !apiSet || !_.isObject(apiSet)) return

		if (moduleName === 'root') {
			// {apiSet}.xxx => gearbox.xxx
			_.each(apiSet, function (value, key) {
				gearbox[key] = value
			})
		} else {
			// {apiSet}.xxx => gearbox.{key}.xxx
			gearbox[moduleName] = apiSet
		}

	}

}(window, gearbox)
