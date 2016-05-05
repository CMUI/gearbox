describe('(Root)', function () {
	describe('gearbox.isPlainObject()', function () {
		it('is an alias of $\'s same api', function () {
			expect($.isPlainObject === gearbox.isPlainObject).to.equal(true)
		})
		it('does basic functionality', function () {
			var arg
			arg = {}
			expect(gearbox.isPlainObject(arg)).to.equal(true)
			arg = {foo: 1, bar: 2}
			expect(gearbox.isPlainObject(arg)).to.equal(true)
			arg = new Object()
			expect(gearbox.isPlainObject(arg)).to.equal(true)
			arg = /foobar/i
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = new Date()
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = new String('foobar')
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = window
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = document.documentElement
			expect(gearbox.isPlainObject(arg)).to.equal(false)
		})
		it('returns `false` if input other types', function () {
			var arg
			arg = undefined
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = null
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = 0
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = 'foobar'
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = true
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = []
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = it
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = String
			expect(gearbox.isPlainObject(arg)).to.equal(false)
			arg = Date
			expect(gearbox.isPlainObject(arg)).to.equal(false)
		})
	})

	describe('gearbox.$()', function () {
		it('does basic functionality same as $()', function () {
			var elem = document.getElementById('mocha')
			var obj = gearbox.$(elem)
			expect(obj).to.eql($(elem))
		})
		it('returns directly if already $collection', function () {
			var obj = $('#mocha')
			expect(gearbox.$(obj)).to.equal(obj)
		})
		it('doesn\'t generate multiple $collections for same dom element', function () {
			var obj = document.getElementById('mocha')
			var $a = gearbox.$(obj)
			var $b = gearbox.$(obj)
			expect($a).to.equal($b)
		})
	})

})
