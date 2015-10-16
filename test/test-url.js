describe('URL', function () {
	describe('Query String', function () {
		describe('_.url.parseQuery()', function () {
			it('parses empty str to empty object', function () {
				var query = ''
				expect(_.url.parseQuery(query)).to.deep.equal({})
			})
			it('parses key/value pairs to object', function () {
				var query = 'foo=1&bar=2&alice=&bob&chris=3'
				expect(_.url.parseQuery(query)).to.deep.equal({
					foo: '1',
					bar: '2',
					alice: '',
					bob: '',
					chris: '3'
				})
			})
			it('decodes keys and values in query string', function () {
				var query = 'foo=%20&bar=%2B&blah%3Dblah=1'
				expect(_.url.parseQuery(query)).to.deep.equal({
					foo: ' ',
					bar: '+',
					'blah=blah': '1'
				})
			})
			it('returns empty object if bad type of param', function () {
				var arg
				arg = undefined
				expect(_.url.parseQuery(arg)).to.deep.equal({})
				arg = null
				expect(_.url.parseQuery(arg)).to.deep.equal({})
				arg = 0
				expect(_.url.parseQuery(arg)).to.deep.equal({})
				arg = true
				expect(_.url.parseQuery(arg)).to.deep.equal({})
				arg = {}
				expect(_.url.parseQuery(arg)).to.deep.equal({})
				arg = []
				expect(_.url.parseQuery(arg)).to.deep.equal({})
				arg = it
				expect(_.url.parseQuery(arg)).to.deep.equal({})
			})
		})

		describe('_.url.getParam()', function () {
			var _state = history.state || null
			var _url = location.href
			after(function () {
				history.replaceState(_state, null, _url)
			})
			it('does basic functionality', function () {
				var url
				url = '?' + 'foo=1&bar=2&alice=&bob&chris=3'
				history.replaceState(_state, null, url)
				expect(_.url.getParam('foo')).to.equal('1')
				expect(_.url.getParam('bar')).to.equal('2')
				expect(_.url.getParam('alice')).to.equal('')
				expect(_.url.getParam('bob')).to.equal('')
				expect(_.url.getParam('chris')).to.equal('3')
			})
			it('returns `undefined` if getting a missing param key', function () {
				var url
				url = '?'
				history.replaceState(_state, null, url)
				expect(_.url.getParam('foo')).to.be.undefined
				url = '?bar=1'
				history.replaceState(_state, null, url)
				expect(_.url.getParam('blah')).to.be.undefined
			})
			it('returns `false` if bad type of param', function () {
				var arg
				arg = undefined
				expect(_.url.getParam(arg)).to.be.false
				arg = null
				expect(_.url.getParam(arg)).to.be.false
				arg = 0
				expect(_.url.getParam(arg)).to.be.false
				arg = true
				expect(_.url.getParam(arg)).to.be.false
				arg = {}
				expect(_.url.getParam(arg)).to.be.false
				arg = []
				expect(_.url.getParam(arg)).to.be.false
				arg = it
				expect(_.url.getParam(arg)).to.be.false
			})
			it('re-parses if url changed', function () {
				var url
				url = '?' + 'foo=%20&bar=%2B&blah%3Dblah=1'
				history.replaceState(_state, null, url)
				expect(_.url.getParam('foo')).to.equal(' ')
				expect(_.url.getParam('bar')).to.equal('+')
				expect(_.url.getParam('blah=blah')).to.equal('1')
				url = '?'
				history.replaceState(_state, null, url)
				expect(_.url.getParam('foo')).to.be.undefined
				expect(_.url.getParam('bar')).to.be.undefined
				expect(_.url.getParam('blah=blah')).to.be.undefined
				url = '?' + 'foo=%20&bar=%2B&blah%3Dblah=1'
				history.replaceState(_state, null, url)
				expect(_.url.getParam('foo')).to.equal(' ')
				expect(_.url.getParam('bar')).to.equal('+')
				expect(_.url.getParam('blah=blah')).to.equal('1')
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
