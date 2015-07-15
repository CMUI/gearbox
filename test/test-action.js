describe('Action', function () {
	var testKey = ''
	var actionSet = {}
	beforeEach(function () {
		testKey = ''
		actionSet = {}
	})

	describe('APIs', function () {
		describe('_.action.add()', function () {
			it('(this api will be tested in below test cases)', function () {
				//
			})
		})
		describe('_.action.trigger()', function () {
			it('does basic functionality', function () {
				var key1 = 'test-foo'
				var key2 = 'test-bar'
				actionSet = {
					foo: function () {
						testKey = key1
					},
					bar: function () {
						testKey = key2
					}
				}
				_.action.add(actionSet)
				_.action.trigger('foo')
				expect(testKey).to.equal(key1)
				_.action.trigger('bar')
				expect(testKey).to.equal(key2)
			})
			it('calls callback on the specified context', function () {
				var context = {}
				actionSet = {
					foo: function () {
						expect(this).to.equal(context)
					},
					bar: function () {
						expect(this).to.equal(_)
					}
				}
				_.action.add(actionSet)
				_.action.trigger('foo', context)
				_.action.trigger('bar', _)
			})
		})
	})
	describe('DOM binding', function () {
		var $wrapper, $link
		var actionName, randomKey
		before(function () {
			$wrapper = $('<div id="test"><a href="#" data-action>test action</a></div>')
				.css({position: 'absolute', top: '-50px'})
				.appendTo('body')
			$link = $wrapper.find('a')
		})
		after(function () {
			$wrapper.remove()
		})
		beforeEach(function () {
			actionName = Date.now().toString(36)
			randomKey = Math.random().toString(36)
		})
		it('gets action name from `href`', function (done) {
			$link.attr('href', '#' + actionName)
			actionSet[actionName] = function () {
				testKey = randomKey
			}
			_.action.add(actionSet)
			$link.click()
			_.delay(function () {
				expect(testKey).to.equal(randomKey)
				done()
			}, 50)
		})
		it('gets action name from `href` - context points to the link', function (done) {
			$link.attr('href', '#' + actionName)
			actionSet[actionName] = function () {
				expect(this).to.equal($link[0])
				done()
			}
			_.action.add(actionSet)
			$link.click()
		})
		it('gets action name from `data-action`', function (done) {
			$link.attr('href', '#')
			$link.attr('data-action', actionName)
			actionSet[actionName] = function () {
				testKey = randomKey
			}
			_.action.add(actionSet)
			$link.click()
			_.delay(function () {
				expect(testKey).to.equal(randomKey)
				done()
			}, 50)
		})
		it('gets action name from `data-action` - context points to the link', function (done) {
			$link.attr('href', '#')
			$link.attr('data-action', actionName)
			actionSet[actionName] = function () {
				expect(this).to.equal($link[0])
				done()
			}
			_.action.add(actionSet)
			$link.click()
		})
		it('accepts `data-action` value as a hash', function (done) {
			$link.attr('href', '#')
			$link.attr('data-action', '#' + actionName)
			actionSet[actionName] = function () {
				testKey = randomKey
			}
			_.action.add(actionSet)
			$link.click()
			_.delay(function () {
				expect(testKey).to.equal(randomKey)
				done()
			}, 50)
		})
	})

})
