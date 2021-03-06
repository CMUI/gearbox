# Gearbox

> Lightweight JavaScript utilities for web development, based on `_` (Underscore) and `$` (jQuery/Zepto).

> 为 Web 开发打造的轻量级 Javascript 工具库，基于 `_`（Underscore）和 `$`（jQuery/Zepto）。

## 兼容性

#### 浏览器支持

* 支持以下移动平台的主流浏览器：
	* iOS 7+
	* Android 4+

* 同样支持以下桌面浏览器：
	* Firefox (Latest)
	* Chrome (Latest)
	* Safari (Latest)
	* IE 8+（需要 jQuery 1.x）

#### 外部依赖

* `_`（Underscore 1.6+）
* `$`（Zepto 1.1+ 或 jQuery）

## 安装

0. 通过 npm 3 安装：

	```sh
	$ npm install cmui-gearbox
	```

0. 在页面中加载 Gearbox 以及必要的依赖：

	```html
	<script src="node_modules/underscore/underscore-min.js"></script>
	<script src="node_modules/zepto.js/dist/zepto.min.js"></script>
	<script src="node_modules/cmui-gearbox/dist/gearbox.min.js"></script>
	```

## API 文档

所有文档入口在 [Wiki 页面](https://github.com/CMUI/gearbox/wiki)，快去看吧！

## 谁在用？

移动 UI 框架 [CMUI](https://github.com/CMUI/CMUI) 采用 Gearbox 作为全局的工具库，因此所有 CMUI 用户都在使用它：

* [百姓网 - 手机版](http://m.baixing.com/)
* ~~优e网 - 手机版 (m.uemall.com)~~（已下线）
* ~~薇姿官方电子商城 - 手机版 (m.vichy.com.cn)~~（已改版）

以下桌面网站也在用 Gearbox：

* [百姓网 - 桌面版](http://www.baixing.com/)

***

## 参与开发

#### 功能模块

Gearbox 的部分功能模块已经分离出去，成为独立项目。这些模块以开发依赖的方式引入，并打包到发布文件中。因此，参与这些独立项目的开发即可修改这些模块。

* `gearbox.action` - [Action](https://github.com/cssmagic/action)
* `gearbox.template` - [Underscore-template](https://github.com/cssmagic/underscore-template)

#### 构建

0. 把本项目的代码 fork 并 clone 到本地。
0. 在项目根目录执行 `npm install`，安装必要的依赖。
0. 在项目根目录执行 `npm run dist`，运行构建脚本。
0. 构建生成的发布文件将存放在 `/dist` 目录下。

#### 单元测试

0. 把本项目的代码 fork 并 clone 到本地。
0. 在项目根目录执行 `bower install`，安装必要的依赖。
0. 在浏览器中打开以下文件即可运行单元测试：
	* `test/test-dev.html` - 测试源码（用于开发阶段的测试）
	* `test/test-dist-trad.html` - 测试发布文件（用于测试 Zepto 的兼容性）
	* `test/test-dist-trad-jquery.html` - 测试发布文件（用于测试 jQuery 的兼容性）

***

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
