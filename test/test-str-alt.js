// heavily inspired by [underscore.string](https://github.com/epeli/underscore.string)
describe('String - Alternative to Underscore.string', function () {
	//ref: https://github.com/epeli/underscore.string/blob/master/test/strings.js
	describe('_.str.trim()', function () {
		it('does basic functionality', function () {
			expect(_.str.trim(123)).to.equal('123')
			expect(_.str.trim(' foo')).to.equal('foo')
			expect(_.str.trim('foo ')).to.equal('foo')
			expect(_.str.trim(' foo ')).to.equal('foo')
			expect(_.str.trim('    foo    ')).to.equal('foo')
			expect(_.str.trim('    foo    ', ' ')).to.equal('foo')
			expect(_.str.trim('\t   foo \t  ', /\s/)).to.equal('foo')

			expect(_.str.trim('ffoo', 'f')).to.equal('oo')
			expect(_.str.trim('ooff', 'f')).to.equal('oo')
			expect(_.str.trim('ffooff', 'f')).to.equal('oo')

			expect(_.str.trim('_-foobar-_', '_-')).to.equal('foobar')

			expect(_.str.trim('http://foo/', '/')).to.equal('http://foo')
			expect(_.str.trim('c:\\', '\\')).to.equal('c:')

			expect(_.str.trim(123)).to.equal('123')
			expect(_.str.trim(123, 3)).to.equal('12')
			expect(_.str.trim('')).to.equal('')
			expect(_.str.trim(null)).to.equal('')
			expect(_.str.trim(undefined)).to.equal('')
		})
		it('doesn\'t remove inner spaces', function () {
			expect(_.str.trim('   foo   bar   ')).to.equal('foo   bar')
		})
	})
	describe('_.str.ltrim()', function () {
		it('does basic functionality', function () {
			expect(_.str.ltrim(' foo')).to.equal('foo')
			expect(_.str.ltrim(' foo')).to.equal('foo')
			expect(_.str.ltrim('foo ')).to.equal('foo ')
			expect(_.str.ltrim(' foo ')).to.equal('foo ')
			expect(_.str.ltrim('')).to.equal('')
			expect(_.str.ltrim(null)).to.equal('')
			expect(_.str.ltrim(undefined)).to.equal('')
			expect(_.str.ltrim('ffoo', 'f'), 'oo')
			expect(_.str.ltrim('ooff', 'f'), 'ooff')
			expect(_.str.ltrim('ffooff', 'f'), 'ooff')
			expect(_.str.ltrim('_-foobar-_', '_-'), 'foobar-_')
			expect(_.str.ltrim(123, 1), '23')
		})
		it('doesn\'t remove inner spaces', function () {
			expect(_.str.ltrim('   foo   bar   ')).to.equal('foo   bar   ')
		})
	})
	describe('_.str.rtrim()', function () {
		it('does basic functionality', function () {
			expect(_.str.rtrim('http://foo/', '/'), 'http://foo')
			expect(_.str.rtrim(' foo')).to.equal(' foo')
			expect(_.str.rtrim('foo ')).to.equal('foo')
			expect(_.str.rtrim('foo ')).to.equal('foo')
			expect(_.str.rtrim('foo bar ')).to.equal('foo bar')
			expect(_.str.rtrim(' foo ')).to.equal(' foo')
			expect(_.str.rtrim('ffoo', 'f'), 'ffoo')
			expect(_.str.rtrim('ooff', 'f'), 'oo')
			expect(_.str.rtrim('ffooff', 'f'), 'ffoo')
			expect(_.str.rtrim('_-foobar-_', '_-'), '_-foobar')
			expect(_.str.rtrim(123, 3), '12')
			expect(_.str.rtrim('')).to.equal('')
			expect(_.str.rtrim(null)).to.equal('')
		})
		it('doesn\'t remove inner spaces', function () {
			expect(_.str.rtrim('   foo   bar   ')).to.equal('   foo   bar')
		})
	})
})


