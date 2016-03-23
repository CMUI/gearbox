describe('URL', function () {
	describe('Query String', function () {
		describe('_.url.parseQuery()', function () {
			it('parses empty str to empty object', function () {
				var query = ''
				expect(_.url.parseQuery(query)).to.eql({})
			})
			it('parses key/value pairs to object', function () {
				var query = 'foo=1&bar=2&alice=&bob&chris=3'
				expect(_.url.parseQuery(query)).to.eql({
					foo: '1',
					bar: '2',
					alice: '',
					bob: '',
					chris: '3'
				})
			})
			it('decodes keys and values in query string', function () {
				var query = 'foo=%20&bar=%2B&blah%3Dblah=1'
				expect(_.url.parseQuery(query)).to.eql({
					foo: ' ',
					bar: '+',
					'blah=blah': '1'
				})
			})
			it('returns empty object if bad type of param', function () {
				var arg
				arg = undefined
				expect(_.url.parseQuery(arg)).to.eql({})
				arg = null
				expect(_.url.parseQuery(arg)).to.eql({})
				arg = 0
				expect(_.url.parseQuery(arg)).to.eql({})
				arg = true
				expect(_.url.parseQuery(arg)).to.eql({})
				arg = {}
				expect(_.url.parseQuery(arg)).to.eql({})
				arg = []
				expect(_.url.parseQuery(arg)).to.eql({})
				arg = it
				expect(_.url.parseQuery(arg)).to.eql({})
			})
		})

		var registeredTests = {}
		var src = "sandbox.html"
		var $iframeSandbox

		function _getRandomStr() {
			return (Date.now() + Math.random()).toString(36)
		}

		function _initSandbox() {
			$iframeSandbox = $('<iframe></iframe>')
				.attr({
					src: 'about:blank',
					id: "sandbox",
					frameborder: 0
				})
				.css({
					display: 'block',
					height: 0
				})
				.appendTo(document.body)
		}

		function _cleanSandbox() {
			$iframeSandbox.remove()
		}

		function _getSandboxWindow() {
			return $iframeSandbox[0].contentWindow
		}

		function _startSandboxTest(url, testObj, fn) {
			var testId = _getRandomStr()
			registeredTests[testId] = fn
			$iframeSandbox.attr('src', src + '?testId=' + testId + "&&" + url)
			var keyArr = []
			for (var key in testObj) {
				keyArr.push(key)
			}
			_getSandboxWindow().name = keyArr.join(";=;")
		}

		function _listenSandboxMessage() {
			var handler = function (ev) {
				var data = JSON.parse(ev.data || '') || {}
				var fn = registeredTests[data.testId]
				if (_.isFunction(fn)) fn(data.content, data.undefinedVar)
			}
			if (window.addEventListener) {
				window.addEventListener('message', handler, false)
			} else {
				if (window.attachEvent) {
					window.attachEvent('onmessage', handler)
				}
			}
		}

		function _postMessageCB(result, expectedResult) {

		}

		describe('_.url.getParam()', function () {
			var _state = history.state || null
			var _url = location.href

			before(function () {
				_initSandbox()
				_listenSandboxMessage()
			})

			after(function () {
				_cleanSandbox()
			})

			it('does basic functionality', function (done) {

				this.timeout(5000)

				var url
				url = 'foo=1&bar=2&alice=&bob&chris=3'
				var expectedResult = {
					"foo": "1",
					"bar": "2",
					"alice": "",
					"bob": "",
					"chris": "3"
				}
				_startSandboxTest(url, expectedResult, function (result, undefinedVar) {
					for (var item in result) {
						expect(result[item]).to.equal(expectedResult[item])
					}
					for (var i = 0; i < undefinedVar.length; i++) {
						expect(undefined).to.equal(expectedResult[undefinedVar[i]])
					}
					done()
				})
			})
			it('returns `undefined` if getting a missing param key 1', function (done) {

				this.timeout(5000)
				var url
				url = ''
				var expectedResult = {
					"foo": undefined
				}
				_startSandboxTest(url, expectedResult, function (result, undefinedVar) {
					for (var item in result) {
						expect(result[item]).to.equal(expectedResult[item])
					}
					for (var i = 0; i < undefinedVar.length; i++) {
						expect(undefined).to.equal(expectedResult[undefinedVar[i]])
					}
					done()
				})
			})
			it('returns `undefined` if getting a missing param key 2', function (done) {
				this.timeout(5000)
				var url
				url = 'bar=1'
				var expectedResult = {
					"blah": undefined
				}
				_startSandboxTest(url, expectedResult, function (result, undefinedVar) {
					for (var item in result) {
						expect(result[item]).to.equal(expectedResult[item])
					}
					for (var i = 0; i < undefinedVar.length; i++) {
						expect(undefined).to.equal(expectedResult[undefinedVar[i]])
					}
					done()
				})
			})
			it('returns `false` if bad type of param', function () {
				var arg
				arg = undefined
				expect(_.url.getParam(arg)).to.equal(false)
				arg = null
				expect(_.url.getParam(arg)).to.equal(false)
				arg = 0
				expect(_.url.getParam(arg)).to.equal(false)
				arg = true
				expect(_.url.getParam(arg)).to.equal(false)
				arg = {}
				expect(_.url.getParam(arg)).to.equal(false)
				arg = []
				expect(_.url.getParam(arg)).to.equal(false)
				arg = it
				expect(_.url.getParam(arg)).to.equal(false)
			})
			it('re-parses if url changed 1', function (done) {
				this.timeout(5000)
				var url
				url = 'foo=%20&bar=%2B&blah%3Dblah=1'
				var expectedResult = {
					"foo": " ",
					"bar": "+",
					"blah=blah": "1"
				}
				_startSandboxTest(url, expectedResult, function (result, undefinedVar) {
					for (var item in result) {
						expect(result[item]).to.equal(expectedResult[item])
					}
					for (var i = 0; i < undefinedVar.length; i++) {
						expect(undefined).to.equal(expectedResult[undefinedVar[i]])
					}
					done()
				})
			})
			it('re-parses if url changed 2', function (done) {
				this.timeout(5000)
				var url
				url = ''
				var expectedResult = {
					"foo": undefined,
					"bar": undefined,
					"blah=blah": undefined
				}
				_startSandboxTest(url, expectedResult, function (result, undefinedVar) {
					for (var item in result) {
						expect(result[item]).to.equal(expectedResult[item])
					}
					for (var i = 0; i < undefinedVar.length; i++) {
						expect(undefined).to.equal(expectedResult[undefinedVar[i]])
					}
					done()
				})
			})
			it('re-parses if url changed 3', function (done) {
				this.timeout(5000)
				var url
				url = 'foo=%20&bar=%2B&blah%3Dblah=1'
				var expectedResult = {
					"foo": " ",
					"bar": "+",
					"blah=blah": "1"
				}
				_startSandboxTest(url, expectedResult, function (result, undefinedVar) {
					for (var item in result) {
						expect(result[item]).to.equal(expectedResult[item])
					}
					for (var i = 0; i < undefinedVar.length; i++) {
						expect(undefined).to.equal(expectedResult[undefinedVar[i]])
					}
					done()
				})
			})
		})

		describe('_.url.appendParam()', function () {
			it('does basic functionality', function () {
				var baseUrl = 'http://domain.com/path/file'
				var url1 = _.url.appendParam(baseUrl, {foo: 'bar'})
				var url2 = _.url.appendParam(url1, {test: 1})
				expect(url1).to.equal(baseUrl + '?foo=bar')
				expect(url2).to.equal(baseUrl + '?foo=bar&test=1')

				var testUrl = baseUrl + '?key=value'
				var url3 = _.url.appendParam(testUrl, {foo: 'bar'})
				var url4 = _.url.appendParam(url3, {test: 1})
				expect(url3).to.equal(baseUrl + '?key=value&foo=bar')
				expect(url4).to.equal(baseUrl + '?key=value&foo=bar&test=1')
			})
		})
	})

	describe('Hash Handling', function () {
		describe('_.url.removeHashFromUrl()', function () {
			it('does basic functionality', function () {
				var url
				url = _.url.removeHashFromUrl('http://domain.com/path/file?query=1#hash')
				expect(url).to.equal('http://domain.com/path/file?query=1')
				url = _.url.removeHashFromUrl('http://domain.com/path/file#hash')
				expect(url).to.equal('http://domain.com/path/file')
				url = _.url.removeHashFromUrl('//domain.com/path/file#hash')
				expect(url).to.equal('//domain.com/path/file')
				url = _.url.removeHashFromUrl('/path/file#hash')
				expect(url).to.equal('/path/file')
				url = _.url.removeHashFromUrl('file#hash')
				expect(url).to.equal('file')
				url = _.url.removeHashFromUrl('#hash')
				expect(url).to.equal('')
				url = _.url.removeHashFromUrl('http://domain.com/path/file#hash#foo')
				expect(url).to.equal('http://domain.com/path/file')
			})
			it('converts param to string if it\'s not a string', function () {
				var url
				url = _.url.removeHashFromUrl(null)
				expect(url).to.equal('null')
				url = _.url.removeHashFromUrl(undefined)
				expect(url).to.equal('undefined')
				url = _.url.removeHashFromUrl(3.1415)
				expect(url).to.equal('3.1415')
				url = _.url.removeHashFromUrl(false)
				expect(url).to.equal('false')
			})
			it('returns empty string if no param', function () {
				var url
				url = _.url.removeHashFromUrl()
				expect(url).to.equal('')
			})
		})
		describe('_.url.getHashFromUrl()', function () {
			it('does basic functionality', function () {
				var url
				url = _.url.getHashFromUrl('http://domain.com/path/file?query=1#hash')
				expect(url).to.equal('#hash')
				url = _.url.getHashFromUrl('http://domain.com/path/file#hash')
				expect(url).to.equal('#hash')
				url = _.url.getHashFromUrl('//domain.com/path/file#hash')
				expect(url).to.equal('#hash')
				url = _.url.getHashFromUrl('/path/file#hash')
				expect(url).to.equal('#hash')
				url = _.url.getHashFromUrl('file#hash')
				expect(url).to.equal('#hash')
				url = _.url.getHashFromUrl('#hash')
				expect(url).to.equal('#hash')
				url = _.url.getHashFromUrl('http://domain.com/path/file#hash#foo')
				expect(url).to.equal('#hash#foo')
			})
			it('converts param to string if it\'s not a string', function () {
				var url
				url = _.url.getHashFromUrl(null)
				expect(url).to.equal('')
				url = _.url.getHashFromUrl(undefined)
				expect(url).to.equal('')
				url = _.url.getHashFromUrl(3.1415)
				expect(url).to.equal('')
				url = _.url.getHashFromUrl(false)
				expect(url).to.equal('')
			})
			it('returns empty string if no param', function () {
				var url
				url = _.url.getHashFromUrl()
				expect(url).to.equal('')
			})
		})
	})

	/*
	describe('Parse URL', function () {
		describe('_.url.parseUrl()', function () {
			it('(dummy test)', function () {
				//
			})
		})
	})
	*/

})
