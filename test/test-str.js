describe('String', function () {
	// heavily inspired by [underscore.string](https://github.com/epeli/underscore.string)
	describe('Alternative to Underscore.string', function () {
		// ref: https://github.com/epeli/underscore.string/blob/master/test/strings.js
		describe('gearbox.str.trim()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.trim(123)).to.equal('123')
				expect(gearbox.str.trim(' foo')).to.equal('foo')
				expect(gearbox.str.trim('foo ')).to.equal('foo')
				expect(gearbox.str.trim(' foo ')).to.equal('foo')
				expect(gearbox.str.trim('    foo    ')).to.equal('foo')
				expect(gearbox.str.trim('    foo    ', ' ')).to.equal('foo')
				expect(gearbox.str.trim('\t   foo \t  ', /\s/)).to.equal('foo')

				expect(gearbox.str.trim('ffoo', 'f')).to.equal('oo')
				expect(gearbox.str.trim('ooff', 'f')).to.equal('oo')
				expect(gearbox.str.trim('ffooff', 'f')).to.equal('oo')

				expect(gearbox.str.trim('_-foobar-_', '_-')).to.equal('foobar')

				expect(gearbox.str.trim('http://foo/', '/')).to.equal('http://foo')
				expect(gearbox.str.trim('c:\\', '\\')).to.equal('c:')

				expect(gearbox.str.trim(123)).to.equal('123')
				expect(gearbox.str.trim(123, 3)).to.equal('12')
				expect(gearbox.str.trim('')).to.equal('')
				expect(gearbox.str.trim(null)).to.equal('')
				expect(gearbox.str.trim(undefined)).to.equal('')
			})
			it('doesn\'t remove inner spaces', function () {
				expect(gearbox.str.trim('   foo   bar   ')).to.equal('foo   bar')
			})
		})
		describe('gearbox.str.ltrim()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.ltrim(' foo')).to.equal('foo')
				expect(gearbox.str.ltrim(' foo')).to.equal('foo')
				expect(gearbox.str.ltrim('foo ')).to.equal('foo ')
				expect(gearbox.str.ltrim(' foo ')).to.equal('foo ')
				expect(gearbox.str.ltrim('')).to.equal('')
				expect(gearbox.str.ltrim(null)).to.equal('')
				expect(gearbox.str.ltrim(undefined)).to.equal('')

				expect(gearbox.str.ltrim('ffoo', 'f'), 'oo')
				expect(gearbox.str.ltrim('ooff', 'f'), 'ooff')
				expect(gearbox.str.ltrim('ffooff', 'f'), 'ooff')

				expect(gearbox.str.ltrim('_-foobar-_', '_-'), 'foobar-_')

				expect(gearbox.str.ltrim(123, 1), '23')
			})
			it('doesn\'t remove inner spaces', function () {
				expect(gearbox.str.ltrim('   foo   bar   ')).to.equal('foo   bar   ')
			})
		})
		describe('gearbox.str.rtrim()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.rtrim('http://foo/', '/'), 'http://foo')
				expect(gearbox.str.rtrim(' foo')).to.equal(' foo')
				expect(gearbox.str.rtrim('foo ')).to.equal('foo')
				expect(gearbox.str.rtrim('foo ')).to.equal('foo')
				expect(gearbox.str.rtrim('foo bar ')).to.equal('foo bar')
				expect(gearbox.str.rtrim(' foo ')).to.equal(' foo')

				expect(gearbox.str.rtrim('ffoo', 'f'), 'ffoo')
				expect(gearbox.str.rtrim('ooff', 'f'), 'oo')
				expect(gearbox.str.rtrim('ffooff', 'f'), 'ffoo')

				expect(gearbox.str.rtrim('_-foobar-_', '_-'), '_-foobar')

				expect(gearbox.str.rtrim(123, 3), '12')
				expect(gearbox.str.rtrim('')).to.equal('')
				expect(gearbox.str.rtrim(null)).to.equal('')
			})
			it('doesn\'t remove inner spaces', function () {
				expect(gearbox.str.rtrim('   foo   bar   ')).to.equal('   foo   bar')
			})
		})

		describe('gearbox.str.includes()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.includes('foobar', 'bar')).to.equal(true)
				expect(!gearbox.str.includes('foobar', 'buzz')).to.equal(true)
				expect(gearbox.str.includes(12345, 34)).to.equal(true)
				expect(!gearbox.str.includes(12345, 6)).to.equal(true)
				expect(!gearbox.str.includes('', 34)).to.equal(true)
				expect(!gearbox.str.includes(null, 34)).to.equal(true)
				expect(gearbox.str.includes(null, '')).to.equal(true)
			})
			it('supports additional param - position', function () {
				expect(gearbox.str.includes('foobar', 'bar', 1)).to.equal(true)
				expect(gearbox.str.includes('foobar', 'bar', 2)).to.equal(true)
				expect(gearbox.str.includes('foobar', 'bar', 3)).to.equal(true)
				expect(gearbox.str.includes('foobar', 'bar', 4)).to.equal(false)
			})
		})
		describe('gearbox.str.startsWith()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.startsWith('foobar', 'foo')).to.equal(true)
				expect(!gearbox.str.startsWith('oobar', 'foo')).to.equal(true)
				expect(gearbox.str.startsWith('oobar', 'o')).to.equal(true)
				expect(gearbox.str.startsWith(12345, 123)).to.equal(true)
				expect(!gearbox.str.startsWith(2345, 123)).to.equal(true)
				expect(gearbox.str.startsWith('', '')).to.equal(true)
				expect(gearbox.str.startsWith(null, '')).to.equal(true)
				expect(!gearbox.str.startsWith(null, 'foo')).to.equal(true)

				expect(gearbox.str.startsWith('-foobar', 'foo', 1)).to.equal(true)
				expect(gearbox.str.startsWith('foobar', 'foo', 0)).to.equal(true)
				expect(!gearbox.str.startsWith('foobar', 'foo', 1)).to.equal(true)

				expect(gearbox.str.startsWith('Äpfel', 'Ä')).to.equal(true)

				expect(gearbox.str.startsWith('hello', 'hell')).to.equal(true)
				expect(gearbox.str.startsWith('HELLO', 'HELL')).to.equal(true)
				expect(gearbox.str.startsWith('HELLO', 'hell')).to.equal(false)
				expect(gearbox.str.startsWith('HELLO', 'hell')).to.equal(false)
				expect(gearbox.str.startsWith('hello', 'hell', 0)).to.equal(true)
				expect(gearbox.str.startsWith('HELLO', 'HELL', 0)).to.equal(true)
				expect(gearbox.str.startsWith('HELLO', 'hell', 0)).to.equal(false)
				expect(gearbox.str.startsWith('HELLO', 'hell', 0)).to.equal(false)
				expect(gearbox.str.startsWith('HELLO')).to.equal(false)
				expect(gearbox.str.startsWith('undefined')).to.equal(true)
				expect(gearbox.str.startsWith('null', null)).to.equal(true)
				expect(gearbox.str.startsWith('hello', 'hell', -20)).to.equal(true)
				expect(gearbox.str.startsWith('hello', 'hell', 1)).to.equal(false)
				expect(gearbox.str.startsWith('hello', 'hell', 2)).to.equal(false)
				expect(gearbox.str.startsWith('hello', 'hell', 3)).to.equal(false)
				expect(gearbox.str.startsWith('hello', 'hell', 4)).to.equal(false)
				expect(gearbox.str.startsWith('hello', 'hell', 5)).to.equal(false)
				expect(gearbox.str.startsWith('hello', 'hell', 20)).to.equal(false)
			});
		})
		describe('gearbox.str.endsWith()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.endsWith('foobar', 'bar')).to.equal(true)
				expect(gearbox.str.endsWith('foobarfoobar', 'bar')).to.equal(true)
				expect(gearbox.str.endsWith('foo', 'o')).to.equal(true)
				expect(gearbox.str.endsWith('foobar', 'bar')).to.equal(true)
				expect(gearbox.str.endsWith('00018-0000062.Plone.sdh264.1a7264e6912a91aa4a81b64dc5517df7b8875994.mp4', 'mp4')).to.equal(true)
				expect(!gearbox.str.endsWith('fooba', 'bar')).to.equal(true)
				expect(gearbox.str.endsWith(12345, 45)).to.equal(true)
				expect(!gearbox.str.endsWith(12345, 6)).to.equal(true)
				expect(gearbox.str.endsWith('', '')).to.equal(true)
				expect(gearbox.str.endsWith(null, '')).to.equal(true)
				expect(!gearbox.str.endsWith(null, 'foo')).to.equal(true)

				expect(gearbox.str.endsWith('foobar?', 'bar', 6)).to.equal(true)
				expect(gearbox.str.endsWith(12345, 34, 4)).to.equal(true)
				expect(!gearbox.str.endsWith(12345, 45, 4)).to.equal(true)

				expect(gearbox.str.endsWith('foobä', 'ä')).to.equal(true)

				expect(gearbox.str.endsWith('vader', 'der')).to.equal(true)
				expect(gearbox.str.endsWith('VADER', 'DER')).to.equal(true)
				expect(gearbox.str.endsWith('VADER', 'der')).to.equal(false)
				expect(gearbox.str.endsWith('VADER', 'DeR')).to.equal(false)
				expect(gearbox.str.endsWith('VADER')).to.equal(false)
				expect(gearbox.str.endsWith('undefined')).to.equal(true)
				expect(gearbox.str.endsWith('null', null)).to.equal(true)
				expect(gearbox.str.endsWith('vader', 'der', 5)).to.equal(true)
				expect(gearbox.str.endsWith('VADER', 'DER', 5)).to.equal(true)
				expect(gearbox.str.endsWith('VADER', 'der', 5)).to.equal(false)
				expect(gearbox.str.endsWith('VADER', 'DER', 5)).to.equal(true)
				expect(gearbox.str.endsWith('VADER', 'der', 5)).to.equal(false)
				expect(gearbox.str.endsWith('vader', 'der', -20)).to.equal(false)
				expect(gearbox.str.endsWith('vader', 'der', 0)).to.equal(false)
				expect(gearbox.str.endsWith('vader', 'der', 1)).to.equal(false)
				expect(gearbox.str.endsWith('vader', 'der', 2)).to.equal(false)
				expect(gearbox.str.endsWith('vader', 'der', 3)).to.equal(false)
				expect(gearbox.str.endsWith('vader', 'der', 4)).to.equal(false)
			});
		})

	})

	describe('Shortcuts', function () {
		describe('RegExp', function () {
			describe('gearbox.str.RE_EMAIL', function () {
				var CHAR_AT = '@'	// to avoid email crawler and spammer
				it('matches email', function () {
					var arg
					// normal email addr
					arg = 'dev' + CHAR_AT + 'cmui.net'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(true)
					// domain can be any level
					arg = 'dev' + CHAR_AT + 'gearbox.by.cmui.net'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(true)
					// future proof for unknown domain suffix
					arg = 'dev' + CHAR_AT + 'gearbox.rocks'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(true)
					// username can be numbers
					arg = '007' + CHAR_AT + 'cmui.net'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(true)
					// domain name can be numbers
					arg = 'username' + CHAR_AT + '126.com'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(true)
					// email can be in upper case
					arg = 'DEV' + CHAR_AT + 'CMUI.NET'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(true)
				})
				it('recognizes bad value', function () {
					var arg
					// domain suffix need at least 2 letters
					arg = 'a' + CHAR_AT + 'a.a'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(false)
					// domain suffix cannot be numbers
					arg = '007' + CHAR_AT + '007.007'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(false)
					// domain cannot be ip addr
					arg = 'a' + CHAR_AT + '192.168.10.10'
					expect(gearbox.str.RE_EMAIL.test(arg)).to.equal(false)
				})
			})
			describe('gearbox.str.RE_MOBILE', function () {
				it('matches mobile number', function () {
					var arg
					arg = '13000000000'
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(true)
					arg = '13322558899'
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(true)
					arg = '15966558877'
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(true)
					arg = '18055668899'
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(true)
					arg = 18978963214
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(true)
				})
				it('recognizes bad value', function () {
					var arg
					arg = '12000000000'
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(false)
					arg = '1332255889'
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(false)
					arg = '133-2255-8899'
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(false)
					arg = 'foobar'
					expect(gearbox.str.RE_MOBILE.test(arg)).to.equal(false)
				})
			})
			describe('gearbox.str.RE_POSTCODE', function () {
				it('matches postcode', function () {
					var arg
					arg = '000000'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(true)
					arg = '001100'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(true)
					arg = '220000'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(true)
					arg = '000022'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(true)
					arg = '336699'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(true)
					arg = 114477
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(true)
				})
				it('recognizes bad value', function () {
					var arg
					arg = '11111'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(false)
					arg = '5555555'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(false)
					arg = '22-55-66'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(false)
					arg = 'foobar'
					expect(gearbox.str.RE_POSTCODE.test(arg)).to.equal(false)
				})
			})
		})
		describe('Special Characters', function () {
			describe('gearbox.str.CNY', function () {
				it('(dummy test)', function () {})
				it('has an alias `gearbox.str.RMB`', function () {
					expect(gearbox.str.CNY).to.equal(gearbox.str.RMB)
				})
			})
			describe('gearbox.str.FULL_WIDTH_CNY', function () {
				it('(dummy test)', function () {})
				it('has an alias `gearbox.str.FULL_WIDTH_RMB`', function () {
					expect(gearbox.str.FULL_WIDTH_CNY).to.equal(gearbox.str.FULL_WIDTH_RMB)
				})
			})
		})

	})

	describe('Hash Handling', function () {
		describe('gearbox.str.isHash()', function () {
			it('returns `true` if a string starts with `#`', function () {
				var arg
				arg = 'foo'
				expect(gearbox.str.isHash(arg)).to.equal(false)
				arg = '#foo'
				expect(gearbox.str.isHash(arg)).to.equal(true)
				arg = '###bar'
				expect(gearbox.str.isHash(arg)).to.equal(true)
				arg = '#!foobar'
				expect(gearbox.str.isHash(arg)).to.equal(true)
			})
			it('ignores initial spaces', function () {
				var arg
				arg = '  foo  '
				expect(gearbox.str.isHash(arg)).to.equal(false)
				arg = '  #foo  '
				expect(gearbox.str.isHash(arg)).to.equal(true)
				arg = '  ###bar  '
				expect(gearbox.str.isHash(arg)).to.equal(true)
				arg = '  #!foobar  '
				expect(gearbox.str.isHash(arg)).to.equal(true)
			})
			it('returns `false` if bad type of param', function () {
				var arg
				arg = undefined
				expect(gearbox.str.isHash(arg)).to.equal(false)
				arg = null
				expect(gearbox.str.isHash(arg)).to.equal(false)
				arg = 0
				expect(gearbox.str.isHash(arg)).to.equal(false)
				arg = true
				expect(gearbox.str.isHash(arg)).to.equal(false)
				arg = {}
				expect(gearbox.str.isHash(arg)).to.equal(false)
				arg = []
				expect(gearbox.str.isHash(arg)).to.equal(false)
				arg = function () {}
				expect(gearbox.str.isHash(arg)).to.equal(false)
			})
		})
		describe('gearbox.str.stripHash()', function () {
			it('removes all initial `#` characters', function () {
				var arg
				arg = '#foo'
				expect(gearbox.str.stripHash(arg)).to.equal('foo')
				arg = '###bar'
				expect(gearbox.str.stripHash(arg)).to.equal('bar')
				arg = '###foo#bar'
				expect(gearbox.str.stripHash(arg)).to.equal('foo#bar')
			})
			it('removes first `!` characters after all initial `#` characters', function () {
				var arg
				arg = '#!foobar'
				expect(gearbox.str.stripHash(arg)).to.equal('foobar')
				arg = '#!foo!bar'
				expect(gearbox.str.stripHash(arg)).to.equal('foo!bar')
			})
			it('returns directly if initial character is not `#`', function () {
				var arg
				arg = 'foobar'
				expect(gearbox.str.stripHash(arg)).to.equal(arg)
			})
			it('ignores initial and ending spaces', function () {
				var arg
				arg = '  foo  '
				expect(gearbox.str.stripHash(arg)).to.equal('foo')
				arg = '  #foo  '
				expect(gearbox.str.stripHash(arg)).to.equal('foo')
				arg = '  ###bar  '
				expect(gearbox.str.stripHash(arg)).to.equal('bar')
				arg = '  #!foobar  '
				expect(gearbox.str.stripHash(arg)).to.equal('foobar')
			})
		})
	})

	describe('To Number', function () {
		describe('gearbox.str.toFloat()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.toFloat('0')).to.equal(0)
				expect(gearbox.str.toFloat('1.77')).to.equal(1.77)
				expect(gearbox.str.toFloat('-1.77')).to.equal(-1.77)
				expect(gearbox.str.toFloat('2.3.6')).to.equal(2.3)
				expect(gearbox.str.toFloat('-2.3.6')).to.equal(-2.3)
				expect(gearbox.str.toFloat('2e3')).to.equal(2000)
				expect(gearbox.str.toFloat('-2e3')).to.equal(-2000)
				expect(gearbox.str.toFloat('1.23foo')).to.equal(1.23)
				expect(gearbox.str.toFloat('-1.23foo')).to.equal(-1.23)
				expect(isNaN(gearbox.str.toFloat('foo123'))).to.equal(true)
			})
		})
		describe('gearbox.str.toInt()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.toInt('0')).to.equal(0)
				expect(gearbox.str.toInt('1.77')).to.equal(1)
				expect(gearbox.str.toInt('-1.77')).to.equal(-1)
				expect(gearbox.str.toInt('2.3.6')).to.equal(2)
				expect(gearbox.str.toInt('-2.3.6')).to.equal(-2)
				expect(gearbox.str.toInt('2e3')).to.equal(2000)
				expect(gearbox.str.toInt('-2e3')).to.equal(-2000)
				expect(gearbox.str.toInt('2e100')).to.equal(2e100)
				expect(gearbox.str.toInt('-2e100')).to.equal(-2e100)
				expect(gearbox.str.toInt('1.23foo')).to.equal(1)
				expect(gearbox.str.toInt('-1.23foo')).to.equal(-1)
				expect(isNaN(gearbox.str.toInt('foo123'))).to.equal(true)
			})
		})
		describe('gearbox.str.toFixed()', function () {
			it('does basic functionality', function () {
				expect(gearbox.str.toFixed('0')).to.equal(0)
				expect(gearbox.str.toFixed('0', 2)).to.equal(0)
				expect(gearbox.str.toFixed('1.77')).to.equal(2)
				expect(gearbox.str.toFixed('1.77', 1)).to.equal(1.8)
				expect(gearbox.str.toFixed('-1.77', 1)).to.equal(-1.8)
				expect(gearbox.str.toFixed('2.3.6', 2)).to.equal(2.3)
				expect(gearbox.str.toFixed('-2.3.6', 2)).to.equal(-2.3)
				expect(gearbox.str.toFixed('2e3', 3)).to.equal(2000)
				expect(gearbox.str.toFixed('-2e3', 3)).to.equal(-2000)
				expect(gearbox.str.toFixed('1.23foo', 1)).to.equal(1.2)
				expect(gearbox.str.toFixed('-1.23foo', 1)).to.equal(-1.2)
				expect(isNaN(gearbox.str.toFixed('foo123'))).to.equal(true)
			})
		})
	})


})
