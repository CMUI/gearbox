describe('DOM', function () {
	describe('Shortcuts', function () {
		describe('gearbox.dom.$win', function () {
			it('is $collection of `window` object', function () {
				expect(gearbox.dom.is$Element(gearbox.dom.$win)).to.equal(true)
				expect(gearbox.dom.$win[0]).to.equal(window)
			})
		})
		describe('gearbox.dom.$root', function () {
			it('is a $collection of `document.documentElement` object', function () {
				expect(gearbox.dom.is$Element(gearbox.dom.$root)).to.equal(true)
				expect(gearbox.dom.$root[0]).to.equal(document.documentElement)
				expect(gearbox.dom.$root[0].tagName.toUpperCase()).to.equal('HTML')
			})
		})
		describe('gearbox.dom.$body', function () {
			it('is a $collection of `document.body` object', function () {
				expect(gearbox.dom.is$Element(gearbox.dom.$body)).to.equal(true)
				expect(gearbox.dom.$body[0]).to.equal(document.body)
			})
		})
	})

	describe('Methods', function () {
		describe('gearbox.dom.is$Element', function () {
			it('checks if it\'s $collection', function () {
				var arg
				arg = $()
				expect(gearbox.dom.is$Element(arg)).to.equal(true)
				arg = $(window)
				expect(gearbox.dom.is$Element(arg)).to.equal(true)
			})
			it('returns `false` if bad type of param', function () {
				var arg
				arg = undefined
				expect(gearbox.dom.is$Element(arg)).to.equal(false)
				arg = null
				expect(gearbox.dom.is$Element(arg)).to.equal(false)
				arg = 0
				expect(gearbox.dom.is$Element(arg)).to.equal(false)
				arg = true
				expect(gearbox.dom.is$Element(arg)).to.equal(false)
				arg = {}
				expect(gearbox.dom.is$Element(arg)).to.equal(false)
				arg = []
				expect(gearbox.dom.is$Element(arg)).to.equal(false)
				arg = document.documentElement
				expect(gearbox.dom.is$Element(arg)).to.equal(false)
			})
		})
	})

})

