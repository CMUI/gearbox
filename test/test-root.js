describe('(Root)', function () {
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
