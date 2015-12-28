describe('UA', function () {

	var _detect = _.ua.__detect
	var _trimVersion = _.ua.__trimVersion

	describe('Util', function () {
		if (!_trimVersion) {
			it('(Skipped)', function () {})
			return
		}
		describe('_trimVersion()', function () {
			it('does basic functionality', function () {
				var ver
				ver = '1.2.3'
				expect(_trimVersion(ver, 1)).to.equal('1')
				expect(_trimVersion(ver, 2)).to.equal('1.2')
				expect(_trimVersion(ver, 3)).to.equal('1.2.3')
				ver = 'x.y.z'
				expect(_trimVersion(ver, 1)).to.equal('x')
				expect(_trimVersion(ver, 2)).to.equal('x.y')
				expect(_trimVersion(ver, 3)).to.equal('x.y.z')
				ver = '0.0'
				expect(_trimVersion(ver, 1)).to.equal('0')
				expect(_trimVersion(ver, 2)).to.equal('0.0')
				expect(_trimVersion(ver, 3)).to.equal('0.0')
				ver = '0'
				expect(_trimVersion(ver, 1)).to.equal('0')
				expect(_trimVersion(ver, 2)).to.equal('0')
				expect(_trimVersion(ver, 3)).to.equal('0')
			})
			it('trim version string to 2 segments by default', function () {
				var ver
				ver = '1.2.3'
				expect(_trimVersion(ver)).to.equal(_trimVersion(ver, 2))
				ver = 'x.y.z'
				expect(_trimVersion(ver)).to.equal(_trimVersion(ver, 2))
				ver = '0.0'
				expect(_trimVersion(ver)).to.equal(_trimVersion(ver, 2))
				ver = '0'
				expect(_trimVersion(ver)).to.equal(_trimVersion(ver, 2))
			})
		})
	})

	describe('Detect Feature', function () {
		describe('_.ua.isTouchDevice', function () {
			it('means element has `touch-` event', function () {
				// this test case is based on the idea of feature detection.
				if (_.ua.isTouchDevice) {
					expect('TouchEvent' in window).to.be.true
					expect('ontouchstart' in window).to.be.true
					expect('ontouchmove' in window).to.be.true
					expect('ontouchend' in window).to.be.true
				}
			})
		})
	})

	describe('Detect UA String', function () {
		if (!_detect) {
			it('(Skipped)', function () {})
			return
		}
		// ios safari
		var iphone_ios_40 = {str: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.05 Mobile/8A293 Safari/6531.22.7'}
		var ipod_ios_30 = {str: 'Mozilla/5.0 (iPod; U; CPU iPhone OS 3_0 like Mac OS X; zh-cn) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16'}
		var ipad_ios_322 = {str: 'Mozilla/5.0 (iPad; U; CPU OS_3_2_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B500 Safari/531.21.10'}
		var iphone_ios_60 = {str: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25'}
		var iphone_ios_00 = {str: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS x_x_x like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.05 Mobile/8A293 Safari/6531.22.7'}
		var ipod_ios_99900 = {str: 'Mozilla/5.0 (iPod; U; CPU iPhone OS_999 like Mac OS X; zh-cn) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16'}
		var ipad_ios_00 = {str: 'Mozilla/5.0 (iPad; U; CPU OS ?_?_? like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B500 Safari/531.21.10'}
		// ios uc
		var uc_ios_421 = {str: 'IUC(U;iOS 4.2.1;Zh-cn;320*480;)/UCWEB8.1.2.111/41/800'}
		var uc_ios_501 = {str: 'IUC(U;iOS 5.0.1;Zh-cn;320*480;)/UCWEB8.4.1.169/42/997'}
		// ios qq
		var qq_ios_511 = {str: 'MQQBrowser/34 Mozilla/5.0 (iPhone 4; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 Safari/7534.48.3'}
		// ios chrome
		var gc_ios_511 = {str: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 7_0_1 like Mac OS X; zh-cn) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3'}

		describe('iOS Safari', function () {
			it('recognizes iphone_ios_40', function () {
				var ua = _detect(iphone_ios_40)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.true
				expect(!!ua.isAndroid).to.be.false
				expect(!!ua.isIPhone).to.be.true
				expect(!!ua.isIPod).to.be.false
				expect(!!ua.isIPad).to.be.false
				expect(ua.osVersion).to.equal('4.0')
				//expect(ua.browser).to.equal('safari')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('532.9')
			})
			it('recognizes ipod_ios_30', function () {
				var ua = _detect(ipod_ios_30)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.true
				expect(!!ua.isAndroid).to.be.false
				expect(!!ua.isIPhone).to.be.false
				expect(!!ua.isIPod).to.be.true
				expect(!!ua.isIPad).to.be.false
				expect(ua.osVersion).to.equal('3.0')
				//expect(ua.browser).to.equal('safari')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('528.18')
			})
			it('recognizes ipad_ios_322', function () {
				var ua = _detect(ipad_ios_322)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.true
				expect(!!ua.isAndroid).to.be.false
				expect(!!ua.isIPhone).to.be.false
				expect(!!ua.isIPod).to.be.false
				expect(!!ua.isIPad).to.be.true
				expect(ua.osVersion).to.equal('3.2')
				//expect(ua.browser).to.equal('safari')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('531.21')
			})
			it('recognizes iphone_ios_60', function () {
				var ua = _detect(iphone_ios_60)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.true
				expect(!!ua.isAndroid).to.be.false
				expect(!!ua.isIPhone).to.be.true
				expect(!!ua.isIPod).to.be.false
				expect(!!ua.isIPad).to.be.false
				expect(ua.osVersion).to.equal('6.0')
				//expect(ua.browser).to.equal('safari')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('536.26')
			})
			it('recognizes iphone_ios_00', function () {
				var ua = _detect(iphone_ios_00)
				expect(ua.osVersion).to.equal('')
			})
			it('recognizes ipod_ios_99900', function () {
				var ua = _detect(ipod_ios_99900)
				expect(ua.osVersion).to.equal('999.0')
			})
			it('recognizes ipad_ios_00', function () {
				var ua = _detect(ipad_ios_00)
				expect(ua.osVersion).to.equal('')
			})
		})
		describe('iOS Third-Party Browser', function () {
			it('recognizes uc_ios_421', function () {
				var ua = _detect(uc_ios_421)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.true
				expect(!!ua.isAndroid).to.be.false
				expect(ua.osVersion).to.equal('4.2')
				expect(ua.browser).to.equal('uc')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('')
			})
			it('recognizes uc_ios_501', function () {
				var ua = _detect(uc_ios_501)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.true
				expect(!!ua.isAndroid).to.be.false
				expect(ua.osVersion).to.equal('5.0')
				expect(ua.browser).to.equal('uc')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('')
			})
			it('recognizes qq_ios_511', function () {
				var ua = _detect(qq_ios_511)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.true
				expect(!!ua.isAndroid).to.be.false
				expect(!!ua.isIPhone).to.be.true
				expect(!!ua.isIPod).to.be.false
				expect(!!ua.isIPad).to.be.false
				expect(ua.osVersion).to.equal('5.1')
				expect(ua.browser).to.equal('mqq')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('534.46')
			})
			it('recognizes gc_ios_511', function () {
				var ua = _detect(gc_ios_511)
				expect(!!ua.isChrome).to.be.true
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.true
				expect(!!ua.isAndroid).to.be.false
				expect(!!ua.isIPhone).to.be.true
				expect(!!ua.isIPod).to.be.false
				expect(!!ua.isIPad).to.be.false
				expect(ua.osVersion).to.equal('7.0')
				expect(ua.browser).to.equal('chrome')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('534.46')
			})
		})

		// android
		var adr_21 = {str: 'Mozilla/5.0 (Linux; U; Android 2.1-update1; zh-cn; SCH-i909 Build/ECLAIR) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17'}
		var adr_22 = {str: 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'}
		var adr_234 = {str: 'Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; Nexus S Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'}
		var adr_403 = {str: 'sprd-SunupG20/1.0 Linux/2.6.35.7 Android/Android4.0.3 Release/08.16.2012 Browser/AppleWebKit533.1 (KHTML, like Gecko) Mozilla/5.0 Mobile'}
		// android gc
		var gc_adr_404 = {str: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19'}
		// android uc
		var uc_adr_233 = {str: 'ucweb/2.0 (linux; u; adr 2.3.3; zh-cn; htc incredible s) u2/1.0.0 ucbrowser/9.0.1.294 u2/1.0.0 mobile'}
		var uc_adr_234 = {str: 'juc(linux;u;2.3.4;zh_cn;adr6400l;480*800;)ucweb7.8.1.96/139/800'}
		var uc_adr_404 = {str: 'juc (linux; u; 4.0.4; zh-cn; adr6400l; 480*800) ucweb7.9.1.100/139/800'}
		var uc_adr_00 = {str: 'Mozilla/5.0 (Linux; U; Android VillainROM7.0.0; zh-cn; HTC Hero Build/ERE27) UC AppleWebKit/530+ (KHTML, like Gecko) Mobile Safari/530'}
		// android qq
		var qq_adr_422 = {str: 'mqqbrowser/3.6/adr (linux; u; 4.2.2; zh-cn; t9508 build/t9508_v2.00;480*854)'}
		// android firefox
		var ff_adr_00 = {str: 'Mozilla/5.0 (Android; Linux armv7l; rv:10.0.2) Gecko/20120215 Firefox/10.0.2 Fennec/10.0.2'}
		// android opera
		var op_adr_404 = {str: 'opera/9.80 (android 4.0.4; linux; opera mobi/oupenghd-1.6/adr-1301101034) presto/2.11.355 version/12.10'}
		// android other
		var xx_adr_235 = {str: 'coolpad8070_cmcc_td/1.08 linux/2.6.35 android/2.3.5 release/03.29.2012 mozilla/5.0 applewebkit/533.1 version/4.0 mobile safari/533.1 parameters/{scr=533_320,cm=1,ql=l} tiantian(securitypay) tiantian(tenpay)'}
		var xx_adr_22 = {str: 'coship_coship t71_td/1.0 android_os/2.2 marvell_pxa918/beta10 release/7.11.2011 browser/skybrowser1.0.6 profile/midp-2.0 configuration/cldc-1.1 parameters/{scr=480_320,cm=1,ql=l} tiantian(securitypay)'}

		describe('Android Browser', function () {
			it('recognizes adr_21', function () {
				var ua = _detect(adr_21)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('2.1')
				expect(ua.browser).to.equal('')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('530.17')
			})
			it('recognizes adr_22', function () {
				var ua = _detect(adr_22)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('2.2')
				expect(ua.browser).to.equal('')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('533.1')
			})
			it('recognizes adr_234', function () {
				var ua = _detect(adr_234)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('2.3')
				expect(ua.browser).to.equal('')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('533.1')
			})
			it('recognizes adr_403', function () {
				var ua = _detect(adr_403)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('4.0')
				expect(ua.browser).to.equal('')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('533.1')
			})

			it('recognizes gc_adr_404', function () {
				var ua = _detect(gc_adr_404)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('4.0')
				expect(ua.browser).to.equal('chrome')
				expect(ua.engine).to.equal('chrome')
				expect(ua.engineVersion).to.equal('18.0')
			})
		})

		describe('Android Third-Party Browser', function () {
			it('recognizes uc_adr_233', function () {
				var ua = _detect(uc_adr_233)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('2.3')
				expect(ua.browser).to.equal('uc')
				expect(ua.engine).to.equal('')
				expect(ua.engineVersion).to.equal('')
			})
			it('recognizes uc_adr_234', function () {
				var ua = _detect(uc_adr_234)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('2.3')
				expect(ua.browser).to.equal('uc')
				expect(ua.engine).to.equal('')
				expect(ua.engineVersion).to.equal('')
			})
			it('recognizes uc_adr_404', function () {
				var ua = _detect(uc_adr_404)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('4.0')
				expect(ua.browser).to.equal('uc')
				expect(ua.engine).to.equal('')
				expect(ua.engineVersion).to.equal('')
			})
			it('recognizes uc_adr_00', function () {
				var ua = _detect(uc_adr_00)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('')
				expect(ua.browser).to.equal('uc')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('530')
			})

			it('recognizes qq_adr_422', function () {
				var ua = _detect(qq_adr_422)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('4.2')
				expect(ua.browser).to.equal('mqq')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('')
			})

			it('recognizes ff_adr_00', function () {
				var ua = _detect(ff_adr_00)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('')
				expect(ua.browser).to.equal('firefox')
				expect(ua.engine).to.equal('gecko')
				expect(ua.engineVersion).to.equal('')
			})

			it('recognizes op_adr_404', function () {
				var ua = _detect(op_adr_404)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('4.0')
				expect(ua.browser).to.equal('opera')
				expect(ua.engine).to.equal('presto')
				expect(ua.engineVersion).to.equal('')
			})

			it('recognizes xx_adr_235', function () {
				var ua = _detect(xx_adr_235)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('2.3')
				expect(ua.browser).to.equal('')
				expect(ua.engine).to.equal('webkit')
				expect(ua.engineVersion).to.equal('533.1')
			})
			it('recognizes xx_adr_22', function () {
				var ua = _detect(xx_adr_22)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('2.2')
				expect(ua.browser).to.equal('')
				expect(ua.engine).to.equal('')
				expect(ua.engineVersion).to.equal('')
			})
		})

		// webview
		var wv_adr_511 = {str: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36'}
		describe('Android Chrome WebView', function () {
			it('recognizes wv_adr_511', function () {
				var ua = _detect(wv_adr_511)
				expect(!!ua.isMobileDevice).to.be.true
				expect(!!ua.isIOS).to.be.false
				expect(!!ua.isAndroid).to.be.true
				expect(ua.osVersion).to.equal('5.1')
				expect(ua.browser).to.equal('chrome-webview')
				expect(ua.engine).to.equal('chrome')
				expect(ua.engineVersion).to.equal('43.0')
			})
		})
	})
})

