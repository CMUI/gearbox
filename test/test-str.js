describe('String', function () {
	describe('Shortcuts', function () {
		describe('RegExp', function () {
			describe('_.str.RE_EMAIL', function () {
				var CHAR_AT = '@'	// to avoid email crawler and spammer
				it('matches email', function () {
					var arg
					// normal email addr
					arg = 'dev' + CHAR_AT + 'cmui.net'
					expect(_.str.RE_EMAIL.test(arg)).to.be.true
					// domain can be any level
					arg = 'dev' + CHAR_AT + 'gearbox.by.cmui.net'
					expect(_.str.RE_EMAIL.test(arg)).to.be.true
					// future proof for unknown domain suffix
					arg = 'dev' + CHAR_AT + 'gearbox.rocks'
					expect(_.str.RE_EMAIL.test(arg)).to.be.true
					// username can be numbers
					arg = '007' + CHAR_AT + 'cmui.net'
					expect(_.str.RE_EMAIL.test(arg)).to.be.true
					// domain name can be numbers
					arg = 'username' + CHAR_AT + '126.com'
					expect(_.str.RE_EMAIL.test(arg)).to.be.true
					// email can be in upper case
					arg = 'DEV' + CHAR_AT + 'CMUI.NET'
					expect(_.str.RE_EMAIL.test(arg)).to.be.true
				})
				it('recognizes bad value', function () {
					var arg
					// domain suffix need at least 2 letters
					arg = 'a' + CHAR_AT + 'a.a'
					expect(_.str.RE_EMAIL.test(arg)).to.be.false
					// domain suffix cannot be numbers
					arg = '007' + CHAR_AT + '007.007'
					expect(_.str.RE_EMAIL.test(arg)).to.be.false
					// domain cannot be ip addr
					arg = 'a' + CHAR_AT + '192.168.10.10'
					expect(_.str.RE_EMAIL.test(arg)).to.be.false
				})
			})
			describe('_.str.RE_MOBILE', function () {
				it('matches mobile number', function () {
					var arg
					arg = '13000000000'
					expect(_.str.RE_MOBILE.test(arg)).to.be.true
					arg = '13322558899'
					expect(_.str.RE_MOBILE.test(arg)).to.be.true
					arg = '15966558877'
					expect(_.str.RE_MOBILE.test(arg)).to.be.true
					arg = '18055668899'
					expect(_.str.RE_MOBILE.test(arg)).to.be.true
					arg = 18978963214
					expect(_.str.RE_MOBILE.test(arg)).to.be.true
				})
				it('recognizes bad value', function () {
					var arg
					arg = '12000000000'
					expect(_.str.RE_MOBILE.test(arg)).to.be.false
					arg = '1332255889'
					expect(_.str.RE_MOBILE.test(arg)).to.be.false
					arg = '133-2255-8899'
					expect(_.str.RE_MOBILE.test(arg)).to.be.false
					arg = 'foobar'
					expect(_.str.RE_MOBILE.test(arg)).to.be.false
				})
			})
			describe('_.str.RE_POSTCODE', function () {
				it('matches postcode', function () {
					var arg
					arg = '000000'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.true
					arg = '001100'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.true
					arg = '220000'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.true
					arg = '000022'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.true
					arg = '336699'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.true
					arg = 114477
					expect(_.str.RE_POSTCODE.test(arg)).to.be.true
				})
				it('recognizes bad value', function () {
					var arg
					arg = '11111'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.false
					arg = '5555555'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.false
					arg = '22-55-66'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.false
					arg = 077777
					expect(_.str.RE_POSTCODE.test(arg)).to.be.false
					arg = 'foobar'
					expect(_.str.RE_POSTCODE.test(arg)).to.be.false
				})
			})
		})
		describe('Special Characters', function () {
			describe('_.str.CNY', function () {
				it('(dummy test)', function () {})
				it('has an alias `_.str.RMB`', function () {
					expect(_.str.CNY).to.equal(_.str.RMB)
				})
			})
			describe('_.str.FULL_WIDTH_CNY', function () {
				it('(dummy test)', function () {})
				it('has an alias `_.str.FULL_WIDTH_RMB`', function () {
					expect(_.str.FULL_WIDTH_CNY).to.equal(_.str.FULL_WIDTH_RMB)
				})
			})
		})

	})

	describe('Hash Handling', function () {
		describe('_.str.isHash()', function () {
			it('returns `true` if a string starts with `#`', function () {
				var arg
				arg = 'foo'
				expect(_.str.isHash(arg)).to.be.false
				arg = '#foo'
				expect(_.str.isHash(arg)).to.be.true
				arg = '###bar'
				expect(_.str.isHash(arg)).to.be.true
				arg = '#!foobar'
				expect(_.str.isHash(arg)).to.be.true
			})
			it('ignores initial spaces', function () {
				var arg
				arg = '  foo  '
				expect(_.str.isHash(arg)).to.be.false
				arg = '  #foo  '
				expect(_.str.isHash(arg)).to.be.true
				arg = '  ###bar  '
				expect(_.str.isHash(arg)).to.be.true
				arg = '  #!foobar  '
				expect(_.str.isHash(arg)).to.be.true
			})
			it('returns `false` if bad type of param', function () {
				var arg
				arg = undefined
				expect(_.str.isHash(arg)).to.be.false
				arg = null
				expect(_.str.isHash(arg)).to.be.false
				arg = 0
				expect(_.str.isHash(arg)).to.be.false
				arg = true
				expect(_.str.isHash(arg)).to.be.false
				arg = {}
				expect(_.str.isHash(arg)).to.be.false
				arg = []
				expect(_.str.isHash(arg)).to.be.false
				arg = function () {}
				expect(_.str.isHash(arg)).to.be.false
			})
		})
		describe('_.str.stripHash()', function () {
			it('removes all initial `#` characters', function () {
				var arg
				arg = '#foo'
				expect(_.str.stripHash(arg)).to.equal('foo')
				arg = '###bar'
				expect(_.str.stripHash(arg)).to.equal('bar')
				arg = '###foo#bar'
				expect(_.str.stripHash(arg)).to.equal('foo#bar')
			})
			it('removes first `!` characters after all initial `#` characters', function () {
				var arg
				arg = '#!foobar'
				expect(_.str.stripHash(arg)).to.equal('foobar')
				arg = '#!foo!bar'
				expect(_.str.stripHash(arg)).to.equal('foo!bar')
			})
			it('returns directly if initial character is not `#`', function () {
				var arg
				arg = 'foobar'
				expect(_.str.stripHash(arg)).to.equal(arg)
			})
			it('ignores initial and ending spaces', function () {
				var arg
				arg = '  foo  '
				expect(_.str.stripHash(arg)).to.equal('foo')
				arg = '  #foo  '
				expect(_.str.stripHash(arg)).to.equal('foo')
				arg = '  ###bar  '
				expect(_.str.stripHash(arg)).to.equal('bar')
				arg = '  #!foobar  '
				expect(_.str.stripHash(arg)).to.equal('foobar')
			})
		})
	})

	describe('String Array', function () {
		describe('_.str.uniq()', function () {
			it('(dummy test)', function () {})
		})
	})

	describe('To Number', function () {
		describe('_.str.toFloat()', function () {
			it('does basic functionality', function () {
				expect(_.str.toFloat('0')).to.equal(0)
				expect(_.str.toFloat('1.77')).to.equal(1.77)
				expect(_.str.toFloat('-1.77')).to.equal(-1.77)
				expect(_.str.toFloat('2.3.6')).to.equal(2.3)
				expect(_.str.toFloat('-2.3.6')).to.equal(-2.3)
				expect(_.str.toFloat('2e3')).to.equal(2000)
				expect(_.str.toFloat('-2e3')).to.equal(-2000)
				expect(_.str.toFloat('1.23foo')).to.equal(1.23)
				expect(_.str.toFloat('-1.23foo')).to.equal(-1.23)
				expect(isNaN(_.str.toFloat('foo123'))).to.be.true
			})
		})
		describe('_.str.toInt()', function () {
			it('does basic functionality', function () {
				expect(_.str.toInt('0')).to.equal(0)
				expect(_.str.toInt('1.77')).to.equal(1)
				expect(_.str.toInt('-1.77')).to.equal(-1)
				expect(_.str.toInt('2.3.6')).to.equal(2)
				expect(_.str.toInt('-2.3.6')).to.equal(-2)
				expect(_.str.toInt('2e3')).to.equal(2000)
				expect(_.str.toInt('-2e3')).to.equal(-2000)
				expect(_.str.toInt('2e100')).to.equal(2e100)
				expect(_.str.toInt('-2e100')).to.equal(-2e100)
				expect(_.str.toInt('1.23foo')).to.equal(1)
				expect(_.str.toInt('-1.23foo')).to.equal(-1)
				expect(isNaN(_.str.toInt('foo123'))).to.be.true
			})
		})
		describe('_.str.toFixed()', function () {
			it('does basic functionality', function () {
				expect(_.str.toFixed('0')).to.equal(0)
				expect(_.str.toFixed('0', 2)).to.equal(0)
				expect(_.str.toFixed('1.77')).to.equal(2)
				expect(_.str.toFixed('1.77', 1)).to.equal(1.8)
				expect(_.str.toFixed('-1.77', 1)).to.equal(-1.8)
				expect(_.str.toFixed('2.3.6', 2)).to.equal(2.3)
				expect(_.str.toFixed('-2.3.6', 2)).to.equal(-2.3)
				expect(_.str.toFixed('2e3', 3)).to.equal(2000)
				expect(_.str.toFixed('-2e3', 3)).to.equal(-2000)
				expect(_.str.toFixed('1.23foo', 1)).to.equal(1.2)
				expect(_.str.toFixed('-1.23foo', 1)).to.equal(-1.2)
				expect(isNaN(_.str.toFixed('foo123'))).to.be.true
			})
		})
	})


})
