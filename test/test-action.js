describe('Action', function () {
	var testKey = ''
	var actionSet = {}
	beforeEach(function () {
		testKey = ''
		actionSet = {}
	})

	// for source code testing
	before(function () {
		if (!gearbox.action) gearbox.action = action
	})

	describe('APIs', function () {
		describe('gearbox.action.add()', function () {
			it('(this api will be tested in below test cases)', function () {
				//
			})
		})
		describe('gearbox.action.trigger()', function () {
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
				gearbox.action.add(actionSet)
				gearbox.action.trigger('foo')
				expect(testKey).to.equal(key1)
				gearbox.action.trigger('bar')
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
				gearbox.action.add(actionSet)
				gearbox.action.trigger('foo', context)
				gearbox.action.trigger('bar', _)
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
			actionName = new Date().getTime().toString(36)
			randomKey = Math.random().toString(36)
		})
		it('gets action name from `href`', function (done) {
			$link.attr('href', '#' + actionName)
			actionSet[actionName] = function () {
				testKey = randomKey
			}
			gearbox.action.add(actionSet)
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
			gearbox.action.add(actionSet)
			$link.click()
		})
		it('gets action name from `data-action`', function (done) {
			$link.attr('href', '#')
			$link.attr('data-action', actionName)
			actionSet[actionName] = function () {
				testKey = randomKey
			}
			gearbox.action.add(actionSet)
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
			gearbox.action.add(actionSet)
			$link.click()
		})
		it('accepts `data-action` value as a hash', function (done) {
			$link.attr('href', '#')
			$link.attr('data-action', '#' + actionName)
			actionSet[actionName] = function () {
				testKey = randomKey
			}
			gearbox.action.add(actionSet)
			$link.click()
			_.delay(function () {
				expect(testKey).to.equal(randomKey)
				done()
			}, 50)
		})
	})

})
