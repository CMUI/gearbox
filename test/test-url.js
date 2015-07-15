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
				var url = '?' + 'foo=%20&bar=%2B&blah%3Dblah=1'
				history.replaceState(_state, null, url)
				expect(_.url.getParam('foo')).to.equal(' ')
				expect(_.url.getParam('bar')).to.equal('+')
				expect(_.url.getParam('blah=blah')).to.equal('1')
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
