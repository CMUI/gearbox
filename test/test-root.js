describe('(Root)', function () {
	describe('_.isPlainObject()', function () {
		it('is an alias of $\'s same api', function () {
			expect($.isPlainObject === _.isPlainObject).to.equal(true)
		})
		it('does basic functionality', function () {
			var arg
			arg = {}
			expect(_.isPlainObject(arg)).to.equal(true)
			arg = {foo: 1, bar: 2}
			expect(_.isPlainObject(arg)).to.equal(true)
			arg = new Object()
			expect(_.isPlainObject(arg)).to.equal(true)
			arg = /foobar/i
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = new Date()
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = new String('foobar')
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = window
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = document.documentElement
			expect(_.isPlainObject(arg)).to.equal(false)
		})
		it('returns `false` if input other types', function () {
			var arg
			arg = undefined
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = null
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = 0
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = 'foobar'
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = true
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = []
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = it
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = String
			expect(_.isPlainObject(arg)).to.equal(false)
			arg = Date
			expect(_.isPlainObject(arg)).to.equal(false)
		})
	})

	describe('_.$()', function () {
		it('does basic functionality same as $()', function () {
			var elem = document.getElementById('mocha')
			var obj = _.$(elem)
			expect(obj).to.eql($(elem))
		})
		it('returns directly if already $collection', function () {
			var obj = $('#mocha')
			expect(_.$(obj)).to.equal(obj)
		})
		it('doesn\'t generate multiple $collections for same dom element', function () {
			var obj = document.getElementById('mocha')
			var $a = _.$(obj)
			var $b = _.$(obj)
			expect($a).to.equal($b)
		})
	})

})
