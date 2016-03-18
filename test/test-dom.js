describe('DOM', function () {
	describe('Shortcuts', function () {
		describe('_.dom.$win', function () {
			it('is $collection of `window` object', function () {
				expect(_.dom.is$Element(_.dom.$win)).to.equal(true)
				expect(_.dom.$win[0]).to.equal(window)
			})
		})
		describe('_.dom.$root', function () {
			it('is a $collection of `document.documentElement` object', function () {
				expect(_.dom.is$Element(_.dom.$root)).to.equal(true)
				expect(_.dom.$root[0]).to.equal(document.documentElement)
				expect(_.dom.$root[0].tagName.toUpperCase()).to.equal('HTML')
			})
		})
		describe('_.dom.$body', function () {
			it('is a $collection of `document.body` object', function () {
				expect(_.dom.is$Element(_.dom.$body)).to.equal(true)
				expect(_.dom.$body[0]).to.equal(document.body)
			})
		})
	})

	describe('Methods', function () {
		describe('_.dom.is$Element', function () {
			it('checks if it\'s $collection', function () {
				var arg
				arg = $()
				expect(_.dom.is$Element(arg)).to.equal(true)
				arg = $(window)
				expect(_.dom.is$Element(arg)).to.equal(true)
			})
			it('returns `false` if bad type of param', function () {
				var arg
				arg = undefined
				expect(_.dom.is$Element(arg)).to.equal(false)
				arg = null
				expect(_.dom.is$Element(arg)).to.equal(false)
				arg = 0
				expect(_.dom.is$Element(arg)).to.equal(false)
				arg = true
				expect(_.dom.is$Element(arg)).to.equal(false)
				arg = {}
				expect(_.dom.is$Element(arg)).to.equal(false)
				arg = []
				expect(_.dom.is$Element(arg)).to.equal(false)
				arg = document.documentElement
				expect(_.dom.is$Element(arg)).to.equal(false)
			})
		})
	})

})

