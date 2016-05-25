
// Gearbox Migrate Plugin

////////////////////  shim  ////////////////////
// shim deprecated APIs
gearbox.isPlainObject = function () {
	/** DEBUG_INFO_START **/
	console.warn('[Gearbox] [Migrate] This API `gearbox.isPlainObject()` is deprecated, use `$.isPlainObject()` instead!')
	/** DEBUG_INFO_END **/

	return $.isPlainObject.apply($, arguments)
}
gearbox.str.include = function () {
	/** DEBUG_INFO_START **/
	console.warn('[Gearbox] [Migrate] This API `gearbox.str.include()` is deprecated, use `gearbox.str.includes()` instead!')
	/** DEBUG_INFO_END **/

	return gearbox.str.includes.apply(gearbox.str, arguments)
}

////////////////////  ns  ////////////////////
// clone modules on `gearbox` namespace to `_`

/** DEBUG_INFO_START **/
console.log('[Gearbox] [Migrate] Start restoring `_.foo` from `gearbox.foo`.')
/** DEBUG_INFO_END **/

_.each(gearbox, function (apiSet, moduleName) {
	/** DEBUG_INFO_START **/
	console.log('[Gearbox] [Migrate] Handling this key: `%s`.', moduleName)
	/** DEBUG_INFO_END **/

	// if `_` has no same name key
	// `gearbox.xxx` => `_.xxx`
	if (!(moduleName in _)) {
		// skip private keys
		if (!gearbox.str.startsWith(moduleName, '__')) {
			_[moduleName] = apiSet
		}
	}
	// if `_` already has same name key
	// `gearbox.foo.xxx` => `_.foo.xxx`
	else {
		/** DEBUG_INFO_START **/
		console.warn('[Gearbox] [Migrate] `_` already has this key: `%s`.', moduleName)
		/** DEBUG_INFO_END **/
		if (_.isObject(apiSet)) {
			_.extend(_[moduleName], apiSet)
		} else {
			/** DEBUG_INFO_START **/
			console.error('[Gearbox] [Migrate] Fail to overwrite `_.%s`', moduleName)
			/** DEBUG_INFO_END **/
		}
	}
})
