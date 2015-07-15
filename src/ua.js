
////////////////////  ua  ////////////////////
void function (window, _ext) {
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

	function __detect(ua) {
		var s = ua.str.toLowerCase()

		ua.isSafari = /\bapple\b/i.test(navigator.vendor) && /\bsafari\b/i.test(s)
		ua.isChrome = _.str.include(s, 'chrome') ||
				_.str.include(s, 'crios')	// both desktop and mobile version

		// platform version and device
		ua.osVersion = '0'
		ua.isIOS = /\(i(?:phone|pod|pad)\b/.test(s) || /\bios \d+\./.test(s)
		if (ua.isIOS) {
			ua.isIPad = /\(ipad\b/.test(s)
			ua.isIPod = /\(ipod\b/.test(s)
			ua.isIPhone = /\(iphone\b/.test(s)
			ua.osVersion = (/[\/; i]os[\/: _](\d+(?:[\._]\d+)?)[\._; ]/.exec(s) || [0,'0'])[1]
				.replace('_', '.')
		} else {
			var _includeAndroid = _.str.include(s, 'android')
			var _includeAdr = /\badr\b/.test(s) && /\blinux;\s*u;/.test(s)
			var _isJUC = /juc\s*\(linux;\s*u;\s*\d+\.\d+/.test(s)
			ua.isAndroid = _includeAndroid || _includeAdr || _isJUC
			if (_includeAdr || _isJUC) {
				ua.osVersion = (
					/\badr[\/: ]?(\d+\.\d)\d*\b/.exec(s) ||
					/\blinux;\s*u;\s*(\d+\.\d)\d*\b/.exec(s) || [0,'0']
				)[1]
			} else {
				ua.osVersion = (/\bandroid(?:_os)?[\/: ]?(\d+\.\d)\d*\b/.exec(s) || [0,'0'])[1]
			}
		}
		if (!_.str.include(ua.osVersion, '.')) ua.osVersion += '.0'

		// summery
		if (ua.isIOS || ua.isAndroid) ua.isMobileDevice = true

		return ua
	}

	// TODO: detect size and features of screen
	/*
	function __detectScreen(ua) {
		return ua
	}
	*/

	// init
	__detect(ua)

	/** DEBUG_INFO_START **/
	// exports for unit test
	ua.__detect = __detect
	/** DEBUG_INFO_END **/

	// exports
	_ext.exports('ua', ua)

}(window, _ext)
