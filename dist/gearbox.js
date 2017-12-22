/*! Gearbox | MIT License | https://github.com/CMUI/gearbox */
!function (window, undefined) {
	// check conflict
	if (window.gearbox) return false

	// shortcut
	var _ = window._
	var $ = window.Zepto || window.jQuery || window.$

	// check dependency
	if (!_ || !$) return false

////////////////////  START: source code  ////////////////////
/* */

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

;

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
	str.RE_MOBILE = /^1[3456789]\d{9}$/
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

;

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
	}

	gearbox.__defineModule('root', root)

}(window, gearbox)

;

////////////////////  ua  ////////////////////
void function (window, gearbox) {
	'use strict'

	// namespace
	var ua = {}

	// detect by feature
	// we want it to work with chrome's touch device simulator,
	// so we don't use `document.createTouch` to detect.
	ua.isTouchDevice = ('ontouchstart' in window) && ('ontouchmove' in window) &&
			('ontouchend' in window)

	// detect by ua string
	ua.str = navigator.userAgent

	function _detect(ua) {
		var s = ua.str.toLowerCase()
		var _includes = gearbox.str.includes

		ua.isSafari = /\bapple\b/i.test(navigator.vendor) && /\bsafari\b/i.test(s)
		ua.isChrome = _includes(s, 'chrome') ||
				_includes(s, 'crios')	// both desktop and mobile version

		// platform version and device
		ua.osVersion = ''
		ua.isIOS = /\(i(?:phone|pod|pad)\b/.test(s) || /\bios \d+\./.test(s)
		if (ua.isIOS) {
			ua.isIPad = /\(ipad\b/.test(s)
			ua.isIPod = /\(ipod\b/.test(s)
			ua.isIPhone = /\(iphone\b/.test(s)
			ua.osVersion = (/[\/; i]os[\/: _](\d+(?:[\._]\d+)?)[\._; ]/.exec(s) || [0, ''])[1]
				.replace('_', '.')
		} else {
			var _includeAndroid = _includes(s, 'android')
			var _includeAdr = /\badr\b/.test(s) && /\blinux;\s*u;/.test(s)
			var _isJUC = /juc\s*\(linux;\s*u;\s*\d+\.\d+/.test(s)
			ua.isAndroid = _includeAndroid || _includeAdr || _isJUC
			if (_includeAdr || _isJUC) {
				ua.osVersion = (
					/\badr[\/: ]?(\d+\.\d)\d*\b/.exec(s) ||
					/\blinux;\s*u;\s*(\d+\.\d)\d*\b/.exec(s) || [0, '']
				)[1]
			} else {
				ua.osVersion = (/\bandroid(?:_os)?[\/: ]?(\d+\.\d)\d*\b/.exec(s) || [0, ''])[1]
			}
		}
		// fix - Windows Phone might pretend to be iOS or Android
		if (_includes(s, 'windows phone')) {
			ua.isIOS = ua.isAndroid = false
			ua.osVersion = ''
		}
		if (ua.osVersion && !_includes(ua.osVersion, '.')) ua.osVersion += '.0'

		// summery
		ua.isMobileDevice = !!(ua.isIOS || ua.isAndroid)

		// get browser info
		var browser = ''
		if (_includes(s, 'micromessenger')) {
			browser = 'wechat'
		} else if (_includes(s, 'ucbrowser') || _includes(s, 'ucweb') || _includes(s, ' uc applewebkit')) {
			browser = 'uc'
		} else if (_includes(s, 'baiduhd') || _includes(s, 'baiduboxapp')) {
			browser = 'baidu-app'
		} else if (_includes(s, 'baidubrowser')) {
			browser = 'baidu-browser'
		} else if (_includes(s, 'mqqbrowser')) {
			browser = 'm-qq-browser'
		} else if (_includes(s, 'miuibrowser')) {
			browser = 'miui'
		} else if (_includes(s, '_weibo_') || _includes(s, ' weibo ')) {
			browser = 'weibo'
		} else if (_includes(s, 'firefox')) {
			browser = 'firefox'
		} else if (_includes(s, 'opera')) {
			browser = 'opera'
		} else if (_includes(s, ' edge/')) {
			browser = 'edge'
		} else if (_includes(s, 'iemobile')) {
			browser = 'ie-mobile'
		}
		// these two must be the last
		else if (ua.isChrome) {
			browser = 'chrome'
			if (ua.isAndroid && /\bwv\b/.test(s)) browser = 'chrome-webview'
		} else if (ua.isSafari) {
			browser = 'safari'
		}

		// fix - some browsers might be detected as Chrome or Safari
		if (browser !== 'chrome') ua.isChrome = false
		if (browser !== 'safari') ua.isSafari = false

		// get engine info
		var engine = ''
		var engineVersion = ''
		var testChrome = /chrome[^\d]*([\.\d]*)[ ;\/]/.exec(s)
		if (testChrome) {
			engine = 'chrome'
			engineVersion = _trimVersion(testChrome[1])
		} else {
			var testWebKit = /webkit[^\d]*([\.\d]*)\+*[ ;\/]/.exec(s)
			if (testWebKit) {
				engine = 'webkit'
				engineVersion = _trimVersion(testWebKit[1])
			}
		}
		if (!engine) {
			if (_includes(s, 'webkit')) {
				engine = 'webkit'
			} else if (ua.isIOS) {
				engine = 'webkit'
			} else if (ua.isAndroid && browser === 'm-qq-browser') {
				engine = 'webkit'
			}
			if (browser === 'firefox' && !ua.isIOS) engine = 'gecko'
			if (browser === 'opera' && !ua.isIOS && _includes(s, 'presto')) engine = 'presto'
		}
		// fix Windows Phone, IE Mobile and Edge
		if (browser === 'edge') {
			engine = 'edge'
			engineVersion = ''
		} else if (browser === 'ie-mobile') {
			engine = engineVersion = ''
		}

		// output
		ua.browser = browser
		ua.engine = engine
		ua.engineVersion = engineVersion
		return ua
	}

	// TODO: detect size and features of screen
	/*
	function __detectScreen(ua) {}
	*/

	// util
	// TODO: implement a stricter API: `gearbox.str.formatVersion(ver, length)`, e.g. ('1.2', 3) -> '1.2.0'
	function _trimVersion(ver, length) {
		var temp = ver.split('.')
		temp.length = length || 2
		return _.compact(temp).join('.')
	}

	// init
	_detect(ua)

	/*
	// exports for unit test
	ua.__detect = _detect
	ua.__trimVersion = _trimVersion
	*/

	// exports
	gearbox.__defineModule('ua', ua)

}(window, gearbox)

;

////////////////////  url  ////////////////////
void function (window, gearbox) {
	'use strict'

	// namespace
	var url = {}

	// shortcut
	var loc = window.location

	// url param processing
	url.parseQuery = function (query) {
		var data = {}
		if (query && _.isString(query)) {
			var pairs = query.split('&'), pair, name, value
			_.each(pairs, function(n) {
				pair = n.split('=')
				name = pair[0]
				value = pair[1] || ''
				if (name) {
					data[decodeURIComponent(name).toLowerCase()] = decodeURIComponent(value)
				}
			})
		}
		return data
	}

	var _query, _cacheParam = null
	function _getQuery() {
		return loc.search.slice(1)
	}
	url.getParam = function (s) {
		if (!s || !_.isString(s)) return false
		if (typeof _query === 'undefined') {	// first run
			_query = _getQuery()
		} else {
			var currentQuery = _getQuery()
			if (currentQuery !== _query) {
				_cacheParam = null	// clear cache to enforce re-parse
				_query = currentQuery
			}
		}
		if (!_cacheParam) {
			_cacheParam = this.parseQuery(_query)
		}
		return _cacheParam[s.toLowerCase()]
	}

	url.appendParam = function (url, param) {
		var s = ''
		url = _.isString(url) ? url : ''
		url = gearbox.url.removeHashFromUrl(url)
		if ($.isPlainObject(param)) {
			param = $.param(param)
		} else if (_.isString(param)) {
			// fix param string
			if (gearbox.str.startsWith(param, '&') || gearbox.str.startsWith(param, '?')) {
				param = param.slice(1)
			}
		} else {
			param = null
		}
		// append
		s = param ? url + (gearbox.str.includes(url, '?') ? '&' : '?') + param : s
		return s || false
	}

	// hash processing
	url.removeHashFromUrl = function (s) {
		return arguments.length ? String(s).split('#')[0] : ''
	}
	url.getHashFromUrl = function (s) {
		var a = String(s).split('#')
		a[0] = ''
		return a.join('#')
	}

	// aliases
	url.isHash = gearbox.str.isHash
	url.stripHash = gearbox.str.stripHash

	// exports
	gearbox.__defineModule('url', url)

}(window, gearbox)

;

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

;

////////////////////  action  ////////////////////
// include and wrap external module: Action

void function (window, gearbox) {
	'use strict'

/* =================  START: source code  ================= */
/* */
/**
 * Action - Easy and lazy solution for click-event-binding.
 * Released under the MIT license.
 * https://github.com/cssmagic/action
 */
var action = (function () {
	'use strict'

	// namespace
	var action = {}

	var SELECTOR = '[data-action]'
	var _actionList = {}

	// util
	function _getActionName($elem) {
		var result = $elem.attr('data-action') || ''
		if (!result) {
			var href = $.trim($elem.attr('href'))
			if (href && href.indexOf('#') === 0) result = href
		}
		return _formatActionName(result)
	}
  
	function _formatActionName(s) {
		return s ? $.trim(String(s).replace(/^[#!\s]+/, '')) : ''
	}

	function _init() {
		var $wrapper = $(document.body || document.documentElement)
		$wrapper.on('click', SELECTOR, function (ev) {
			// notice: default click behavior will be prevented.
			ev.preventDefault()

			var $elem = $(this)
			var actionName = _getActionName($elem)
			_handle(actionName, this)
		})
	}

	function _handle(actionName, context) {
		if (!actionName) {
			/*
			console.warn('[Action] Empty action. Do nothing.')
			*/

			return
		}
		var fn = _actionList[actionName]
		if (fn && $.isFunction(fn)) {
			/*
			console.log('[Action] Executing action `%s`.', actionName)
			*/

			return fn.call(context || window)
		} else {
			/*
			console.error('[Action] Not found action `%s`.', actionName)
			*/
		}
	}

	// API
	function add(actionSet) {
		if (!$.isPlainObject(actionSet)) {
			/*
			console.error('[Action] Param must be a plain object.')
			*/

			return
		}

		$.each(actionSet, function (key, value) {
			var actionName = _formatActionName(key)

			if (!actionName) {
				/*
				console.error('[Action] The action name `%s` is invalid.', key)
				*/

				return
			}

			if (!$.isFunction(value)) {
				/*
				console.error('[Action] The function for action `%s` is invalid.', actionName)
				*/

				return
			}

			/*
			if (_actionList[actionName]) {
				console.warn('[Action] The existing action `%s` has been overwritten.', actionName)
			}
			*/

			_actionList[actionName] = value
		})
	}
  
	function trigger(actionName, context) {
		return _handle(_formatActionName(actionName), context)
	}

	// init
	_init()

	/*
	// exports for unit test
	action.__actionList = _actionList
	action.__getActionName = _getActionName
	action.__formatActionName = _formatActionName
	*/

	// exports
	action.add = add
	action.trigger = trigger
	return action

}())

/* */
/* =================  END: source code  ================= */

	gearbox.__defineModule('action', action)

}(window, gearbox)
;

////////////////////  template  ////////////////////
// include and wrap external module: Underscore-template

void function (window, gearbox) {
	'use strict'

/* =================  START: source code  ================= */
/* */
/**
 * Underscore-template - More APIs for Underscore's template engine - template fetching, rendering and caching.
 * Released under the MIT license.
 * https://github.com/cssmagic/underscore-template
 */
var template = (function () {
	'use strict'

	// namespace
	var template = {}

	// config
	var ELEM_ID_PREFIX = 'template-'

	// cache
	var _cacheTemplate = {}
	var _cacheCompiledTemplate = {}

	// util - string
	function _trim(str) {
		return str.replace(/^\s+|\s+$/g, '')
	}
	function _include(str, substring) {
		return str.length > substring.length ? str.indexOf(substring) > -1 : false
	}
	function _startsWith(str, starts) {
		return str.length > starts.length ? str.indexOf(starts) === 0 : false
	}
	function _endsWith(str, ends) {
		return str.length > ends.length ? str.indexOf(ends) === (str.length - ends.length) : false
	}

	// util
	function _toTemplateId(id) {
		/** example:
			`#template-my-tmpl-001` -> `my-tmpl-001`
			 `template-my-tmpl-001` -> `my-tmpl-001`
			          `my-tmpl-001` -> `my-tmpl-001`
		 */
		id = id && _.isString(id) ? _trim(id).replace(/^[#!]+/, '') : ''
		return _trim(id).replace(ELEM_ID_PREFIX, '')
	}
	function _toElementId(id) {
		/** example:
			`template-my-tmpl-001` -> `template-my-tmpl-001`
			         `my-tmpl-001` -> `template-my-tmpl-001`
		 */
		id = id && _.isString(id) ? _trim(id) : ''
		return _startsWith(id, ELEM_ID_PREFIX) ? id : ELEM_ID_PREFIX + id
	}
	// get template by ID (of dummy script element in html)
	function _getTemplateById(id) {
		if (!id) return false
		var result = ''
		var elementId = _toElementId(String(id))
		var elem = document.getElementById(elementId)
		if (elem) {
			result = _trim(elem.innerHTML)
			/*
			if (!result) {
				console.warn('[Template] Element "#' + elementId + '" is empty!')
			} else if (!_isTemplateCode(result)) {
				console.warn('[Template] Template code in element "#' + elementId + '" is invalid!')
			}
			*/
		} else {
			/*
			console.warn('[Template] Element "#' + elementId + '" not found!')
			*/
		}
		return result
	}
	function _isTemplateCode(s) {
		var code = String(s)
		var config = _.templateSettings
		return (
			// it must contain any template tags
			config.escape.test(code) ||
			config.interpolate.test(code) ||
			config.evaluate.test(code)
		) && (
			// it must contain variable name (if we have specified a variable name)
			config.variable ? _include(code, config.variable) : true
		)
	}

	// API
	function add(id, templateCode) {
		// TODO: accept second param as a function, to support pre-compiled template.
		var result = false
		if (arguments.length < 2) {
			/*
			console.error('[Template] Missing param for `.add()` method.')
			*/
			return result
		}

		if (templateCode) {
			var templateId = _toTemplateId(id)
			/*
			if (_cacheTemplate[templateId] || _cacheCompiledTemplate[templateId]) {
				console.warn('[Template] Template id "' + templateId + '" already existed.')
			}
			*/
			if (_cacheCompiledTemplate[templateId]) {
				_cacheCompiledTemplate[templateId] = null
			}
			_cacheTemplate[templateId] = String(templateCode)
			result = true
		}
		return result
	}
	function render(id, data) {
		var result = ''
		if (arguments.length < 2) {
			/*
			console.error('[Template] Missing param for `.render()` method.')
			*/
			return result
		}

		var templateId = _toTemplateId(id)

		// TODO: refactor: use recursion to simplify these codes
		// search in _cacheCompiledTemplate
		var fn = _cacheCompiledTemplate[templateId]
		var templateCode = _cacheTemplate[templateId]
		if (_.isFunction(fn)) {
			result = fn(data)
		}
		// search in _cacheTemplate
		else if (templateCode) {
			fn = _.template(templateCode)
			_cacheCompiledTemplate[templateId] = fn
			result = fn(data)
			// clear _cacheTemplate
			_cacheTemplate[templateId] = null
		}
		// get template code from dom
		else {
			templateCode = _getTemplateById(templateId)
			if (templateCode) {
				fn = _.template(templateCode)
				_cacheCompiledTemplate[templateId] = fn
				result = fn(data)
			}
		}
		return result || ''
	}

	/*
	// exports for unit test
	template.__trim = _trim
	template.__include = _include
	template.__startsWith = _startsWith
	template.__endsWith = _endsWith
	template.__toTemplateId = _toTemplateId
	template.__toElementId = _toElementId
	template.__isTemplateCode = _isTemplateCode
	template.__cacheTemplate = _cacheTemplate
	template.__cacheCompiledTemplate = _cacheCompiledTemplate
	*/

	// exports
	template.add = add
	template.render = render
	return template

}())

/* */
/* =================  END: source code  ================= */

	gearbox.__defineModule('template', template)

}(window, gearbox)
/* */
////////////////////  END: source code  ////////////////////

	window.gearbox = gearbox

}(window)