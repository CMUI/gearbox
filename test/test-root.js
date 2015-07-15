describe('(Root)', function () {
	describe('_.isPlainObject()', function () {
		it('is an alias of $\'s same api', function () {
			expect($.isPlainObject === _.isPlainObject).to.be.true
		})
		it('does basic functionality', function () {
			var arg
			arg = {}
			expect(_.isPlainObject(arg)).to.be.true
			arg = {foo: 1, bar: 2}
			expect(_.isPlainObject(arg)).to.be.true
			arg = new Object()
			expect(_.isPlainObject(arg)).to.be.true
			arg = /foobar/i
			expect(_.isPlainObject(arg)).to.be.false
			arg = new Date()
			expect(_.isPlainObject(arg)).to.be.false
			arg = new String('foobar')
			expect(_.isPlainObject(arg)).to.be.false
			arg = window
			expect(_.isPlainObject(arg)).to.be.false
			arg = document.documentElement
			expect(_.isPlainObject(arg)).to.be.false
		})
		it('returns `false` if input other types', function () {
			var arg
			arg = undefined
			expect(_.isPlainObject(arg)).to.be.false
			arg = null
			expect(_.isPlainObject(arg)).to.be.false
			arg = 0
			expect(_.isPlainObject(arg)).to.be.false
			arg = 'foobar'
			expect(_.isPlainObject(arg)).to.be.false
			arg = true
			expect(_.isPlainObject(arg)).to.be.false
			arg = []
			expect(_.isPlainObject(arg)).to.be.false
			arg = it
			expect(_.isPlainObject(arg)).to.be.false
			arg = String
			expect(_.isPlainObject(arg)).to.be.false
			arg = Date
			expect(_.isPlainObject(arg)).to.be.false
		})
	})

	describe('_.$()', function () {
		it('does basic functionality same as $()', function () {
			var elem = document.getElementById('mocha')
			var obj = _.$(elem)
			expect(obj).to.deep.equal($(elem))
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
