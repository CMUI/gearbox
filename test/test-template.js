describe('Template', function () {
	before(function () {
		var _config = {
			interpolate: /<%-([\s\S]+?)%>/g,
			escape:      /<%=([\s\S]+?)%>/g,
			variable: 'data'
		}
		_.extend(_.templateSettings, _config)

		// for source code testing
		if (!_.template.render) _.extend(_.template, template)
	})

	describe('APIs', function () {
		// const
		var TEMPLATE_ELEM_ID_1 = 'elem-paragraph'
		var TEMPLATE_ELEM_ID_2 = 'elem-person'
		var TEMPLATE_CODE_ID_1 = 'code-paragraph'
		var TEMPLATE_CODE_ID_2 = 'code-person'
		var HELLO = 'Hello world!'
		var PREFIX = 'template-'
		var SCRIPT_TYPE = 'text/template'

		// template code
		var templateCode1 = '<p><%= data.text %><p>'
		var templateCode2 = [
			'<ul>',
			'<% _.each(data, function(person) { %>',
			'<li><%= person.name + \': \' + person.age %></li>',
			'<% }) %>',
			'</ul>'
		].join('\n')

		// template data
		var templateData1 = {text: HELLO}
		var templateData2 = [
			{name: 'Peter', age: '31'},
			{name: 'Judy', age: '24'}
		]

		// result
		var result1 = '<p>' + HELLO + '<p>'
		var result2 = [
			'<ul>',
				'<li>Peter: 31</li>',
				'<li>Judy: 24</li>',
			'</ul>'
		].join('\n')

		// test data
		var html1, html2

		describe('_.template.add()', function () {
			it('(this api will be tested in below test cases)', function () {
				//
			})
		})
		describe('_.template.render()', function () {
			// dummy script elements
			var $elem1
			var $elem2

			function prepareDummyScript() {
				var body = document.body
				var script1 = document.createElement('script')
				script1.type = SCRIPT_TYPE
				script1.id = PREFIX + TEMPLATE_ELEM_ID_1
				script1.text = templateCode1
				body.appendChild(script1)

				var script2 = document.createElement('script')
				script2.type = SCRIPT_TYPE
				script2.id = PREFIX + TEMPLATE_ELEM_ID_2
				script2.text = templateCode2
				body.appendChild(script2)
			}

			function destroyDummyScript() {
				$elem1 = $("#" + PREFIX + TEMPLATE_ELEM_ID_1)
				$elem2 = $("#" + PREFIX + TEMPLATE_ELEM_ID_2)
				$elem1.remove()
				$elem2.remove()
			}

			it('gets template from dom, then renders it', function () {
				prepareDummyScript()

				html1 = _.template.render(TEMPLATE_ELEM_ID_1, templateData1)
				expect(html1).to.equal(result1)
				html2 = _.template.render(TEMPLATE_ELEM_ID_2, templateData2)
				// todo: need `_.str.clean()`
				html2 = html2.replace(/\s+/g, ' ')
				result2 = result2.replace(/\s+/g, ' ')
				expect(html2).to.equal(result2)

				destroyDummyScript()
			})
			it('adds template manually, then renders it', function () {
				// use `add()` api to
				_.template.add(TEMPLATE_CODE_ID_1, templateCode1)
				_.template.add(TEMPLATE_CODE_ID_2, templateCode2)

				html1 = _.template.render(TEMPLATE_CODE_ID_1, templateData1)
				expect(html1).to.equal(result1)
				html2 = _.template.render(TEMPLATE_CODE_ID_2, templateData2)
				// todo: need `_.str.clean()`
				html2 = html2.replace(/\s+/g, ' ')
				result2 = result2.replace(/\s+/g, ' ')
				expect(html2).to.equal(result2)
			})
			it('gets template from cache, then renders it', function () {
				// notice: after above testing, there have been 4 templates in cache

				html1 = _.template.render(TEMPLATE_ELEM_ID_1, templateData1)
				expect(html1).to.equal(result1)
				html2 = _.template.render(TEMPLATE_ELEM_ID_2, templateData2)
				// todo: need `_.str.clean()`
				html2 = html2.replace(/\s+/g, ' ')
				result2 = result2.replace(/\s+/g, ' ')
				expect(html2).to.equal(result2)

				html1 = _.template.render(TEMPLATE_CODE_ID_1, templateData1)
				expect(html1).to.equal(result1)
				html2 = _.template.render(TEMPLATE_CODE_ID_2, templateData2)
				// todo: need `_.str.clean()`
				html2 = html2.replace(/\s+/g, ' ')
				result2 = result2.replace(/\s+/g, ' ')
				expect(html2).to.equal(result2)
			})
		})

	})
})
