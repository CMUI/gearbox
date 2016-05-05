
// Gearbox Migrate Plugin
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
