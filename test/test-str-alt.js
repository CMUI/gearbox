// heavily inspired by [underscore.string](https://github.com/epeli/underscore.string)
describe('String - Alternative to Underscore.string', function () {
	// ref: https://github.com/epeli/underscore.string/blob/master/test/strings.js
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

	describe('_.str.contains()', function () {
		it('does basic functionality', function () {
			expect(_.str.contains('foobar', 'bar')).to.equal(true)
			expect(!_.str.contains('foobar', 'buzz')).to.equal(true)
			expect(_.str.contains(12345, 34)).to.equal(true)
			expect(!_.str.contains(12345, 6)).to.equal(true)
			expect(!_.str.contains('', 34)).to.equal(true)
			expect(!_.str.contains(null, 34)).to.equal(true)
			expect(_.str.contains(null, '')).to.equal(true)
		})
		it('supports additional param - position', function () {
			expect(_.str.contains('foobar', 'bar', 1)).to.equal(true)
			expect(_.str.contains('foobar', 'bar', 2)).to.equal(true)
			expect(_.str.contains('foobar', 'bar', 3)).to.equal(true)
			expect(_.str.contains('foobar', 'bar', 4)).to.equal(false)
		})
	})
	describe('_.str.startsWith()', function () {
		it('does basic functionality', function () {
			expect(_.str.startsWith('foobar', 'foo')).to.equal(true)
			expect(!_.str.startsWith('oobar', 'foo')).to.equal(true)
			expect(_.str.startsWith('oobar', 'o')).to.equal(true)
			expect(_.str.startsWith(12345, 123)).to.equal(true)
			expect(!_.str.startsWith(2345, 123)).to.equal(true)
			expect(_.str.startsWith('', '')).to.equal(true)
			expect(_.str.startsWith(null, '')).to.equal(true)
			expect(!_.str.startsWith(null, 'foo')).to.equal(true)

			expect(_.str.startsWith('-foobar', 'foo', 1)).to.equal(true)
			expect(_.str.startsWith('foobar', 'foo', 0)).to.equal(true)
			expect(!_.str.startsWith('foobar', 'foo', 1)).to.equal(true)

			expect(_.str.startsWith('Äpfel', 'Ä')).to.equal(true)

			expect(_.str.startsWith('hello', 'hell')).to.equal(true)
			expect(_.str.startsWith('HELLO', 'HELL')).to.equal(true)
			expect(_.str.startsWith('HELLO', 'hell')).to.equal(false)
			expect(_.str.startsWith('HELLO', 'hell')).to.equal(false)
			expect(_.str.startsWith('hello', 'hell', 0)).to.equal(true)
			expect(_.str.startsWith('HELLO', 'HELL', 0)).to.equal(true)
			expect(_.str.startsWith('HELLO', 'hell', 0)).to.equal(false)
			expect(_.str.startsWith('HELLO', 'hell', 0)).to.equal(false)
			expect(_.str.startsWith('HELLO')).to.equal(false)
			expect(_.str.startsWith('undefined')).to.equal(true)
			expect(_.str.startsWith('null', null)).to.equal(true)
			expect(_.str.startsWith('hello', 'hell', -20)).to.equal(true)
			expect(_.str.startsWith('hello', 'hell', 1)).to.equal(false)
			expect(_.str.startsWith('hello', 'hell', 2)).to.equal(false)
			expect(_.str.startsWith('hello', 'hell', 3)).to.equal(false)
			expect(_.str.startsWith('hello', 'hell', 4)).to.equal(false)
			expect(_.str.startsWith('hello', 'hell', 5)).to.equal(false)
			expect(_.str.startsWith('hello', 'hell', 20)).to.equal(false)
		});
	})
	describe('_.str.endsWith()', function () {
		it('does basic functionality', function () {
			expect(_.str.endsWith('foobar', 'bar')).to.equal(true)
			expect(_.str.endsWith('foobarfoobar', 'bar')).to.equal(true)
			expect(_.str.endsWith('foo', 'o')).to.equal(true)
			expect(_.str.endsWith('foobar', 'bar')).to.equal(true)
			expect(_.str.endsWith('00018-0000062.Plone.sdh264.1a7264e6912a91aa4a81b64dc5517df7b8875994.mp4', 'mp4')).to.equal(true)
			expect(!_.str.endsWith('fooba', 'bar')).to.equal(true)
			expect(_.str.endsWith(12345, 45)).to.equal(true)
			expect(!_.str.endsWith(12345, 6)).to.equal(true)
			expect(_.str.endsWith('', '')).to.equal(true)
			expect(_.str.endsWith(null, '')).to.equal(true)
			expect(!_.str.endsWith(null, 'foo')).to.equal(true)

			expect(_.str.endsWith('foobar?', 'bar', 6)).to.equal(true)
			expect(_.str.endsWith(12345, 34, 4)).to.equal(true)
			expect(!_.str.endsWith(12345, 45, 4)).to.equal(true)

			expect(_.str.endsWith('foobä', 'ä')).to.equal(true)

			expect(_.str.endsWith('vader', 'der')).to.equal(true)
			expect(_.str.endsWith('VADER', 'DER')).to.equal(true)
			expect(_.str.endsWith('VADER', 'der')).to.equal(false)
			expect(_.str.endsWith('VADER', 'DeR')).to.equal(false)
			expect(_.str.endsWith('VADER')).to.equal(false)
			expect(_.str.endsWith('undefined')).to.equal(true)
			expect(_.str.endsWith('null', null)).to.equal(true)
			expect(_.str.endsWith('vader', 'der', 5)).to.equal(true)
			expect(_.str.endsWith('VADER', 'DER', 5)).to.equal(true)
			expect(_.str.endsWith('VADER', 'der', 5)).to.equal(false)
			expect(_.str.endsWith('VADER', 'DER', 5)).to.equal(true)
			expect(_.str.endsWith('VADER', 'der', 5)).to.equal(false)
			expect(_.str.endsWith('vader', 'der', -20)).to.equal(false)
			expect(_.str.endsWith('vader', 'der', 0)).to.equal(false)
			expect(_.str.endsWith('vader', 'der', 1)).to.equal(false)
			expect(_.str.endsWith('vader', 'der', 2)).to.equal(false)
			expect(_.str.endsWith('vader', 'der', 3)).to.equal(false)
			expect(_.str.endsWith('vader', 'der', 4)).to.equal(false)
		});
	})

})


