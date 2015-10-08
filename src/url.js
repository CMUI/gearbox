
////////////////////  url  ////////////////////
void function (window, _ext) {
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
		url = _.url.removeHashFromUrl(url)
		if (_.isPlainObject(param)) {
			param = $.param(param)
		} else if (_.isString(param)) {
			// fix param string
			if (_.str.startsWith(param, '&') || _.str.startsWith(param, '?')) {
				param = param.slice(1)
			}
		} else {
			param = null
		}
		// append
		s = param ? url + (_.str.include(url, '?') ? '&' : '?') + param : s
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
	url.isHash = _.str.isHash
	url.stripHash = _.str.stripHash

	// exports
	_ext.exports('url', url)

}(window, _ext)
