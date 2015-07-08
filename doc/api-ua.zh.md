# API 文档 - `ua` 模块

这个模块在加载时会对当前 UA 进行探测（通过特性检测或 UA 字符串分析等方式），并以变量的方式提供探测结果。

这些探测浏览器内核和类型的接口仅用于底层开发或流量统计，不建议在业务层的常规功能中使用。

## JavaScript 变量<a name="js-var"></a>

### `_.ua.isTouchDevice`<a name="js-var-isTouchDevice"></a>

布尔值。当前 UA 是否为触屏设备。Chrome 开启触摸调试之后也将被视为触屏设备。

此探测基于特性检测。

***

### `_.ua.isSafari`<a name="js-var-isSafari"></a>

布尔值。当前 UA 是否为 Safari 浏览器（包括桌面版与移动版）。

此探测基于 UA 信息。

### `_.ua.isChrome`<a name="js-var-isChrome"></a>

布尔值。当前 UA 是否为 Chrome 浏览器（包括桌面版与移动版）。

此探测基于 UA 信息。

***

### `_.ua.isIOS`<a name="js-var-isIOS"></a>

布尔值。当前操作系统是否为 iOS 系统。

还有以下对 iOS 设备更细节的探测（值为布尔值或 `undefined`）：

* `_.ua.isIPhone` - 当前 UA 是否为 iPhone。
* `_.ua.isIPad` - 当前 UA 是否为 iPad。
* `_.ua.isIPod` - 当前 UA 是否为 iPod touch。

这些探测均基于 UA 信息。

### `_.ua.isAndroid`<a name="js-var-isAndroid"></a>

布尔值。当前 UA 是否为 Android 系统。

此探测基于 UA 信息。

### `_.ua.isMobileDevice`<a name="js-var-isMobileDevice"></a>

布尔值或 `undefined`。当前 UA 是否为移动设备。所有 iOS 和 Android 设备会被识别为移动设备。

此探测基于 UA 信息。

***

### `_.ua.osVersion`<a name="js-var-osVersion"></a>

字符串。当前移动操作系统的版本号，格式为 `{主版本号}.{次版本号}`。仅可识别 iOS 和 Android 系统的版本号，对于非移动操作系统或不可识别的移动操作系统，其值一律为 `'0.0'`。

此探测基于 UA 信息。

#### 示例

* `'7.0'` - 对 iOS 7.0.1 的探测结果。
* `'4.4'` - 对 Android 4.4.4 的探测结果。
* `'0.0'` - 对 Windows、Mac OS、WinPhone 的探测结果。

