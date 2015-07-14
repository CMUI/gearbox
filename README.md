# Gearbox

> Lightweight JavaScript utilities for mobile web, based on Underscore and Zepto.

> 专注移动端的 Javascript 工具库，基于 Underscore 和 Zepto。

## 兼容性

#### 浏览器支持

* 支持以下移动平台的主流浏览器：
    * iOS 5+
    * Android 2.3+

* 同样支持以下桌面浏览器：
    * Firefox (edge)
    * Chrome (edge)
    * Safari (edge)

#### 外部依赖

* Underscore 1.6+
* Zepto 1.1+

## 安装

0. 通过 Bower 安装：
    ```sh
    $ bower install gearbox
    ```

0. 在页面中加载 Gearbox 以及必要的依赖：
    ```html
    <script src="bower_components/underscore/underscore-min.js"></script>
    <script src="bower_components/zepto.js/dist/zepto.min.js"></script>
    <script src="bower_components/gearbox/dist/gearbox.min.js"></script>
    ```

## API 文档

所有文档入口在 [Wiki 页面](https://github.com/CMUI/gearbox/wiki)，快去看吧！

## 谁在用？

移动 UI 框架 [CMUI](https://github.com/CMUI/CMUI) 采用 Gearbox 作为全局的工具库，因此所有 CMUI 用户都在使用它：

* [百姓网 - 手机版](http://m.baixing.com/)
* [薇姿官方电子商城 - 手机版](http://m.vichy.com.cn/)
* [优e网 - 手机版](http://m.uemall.com/)

***

## 参与开发

#### 功能模块

Gearbox 的部分功能模块已经分离出去，成为独立项目。这些模块以开发依赖的方式引入，并打包到发布文件中。因此，参与这些独立项目的开发即可修改这些模块。

* `_.action` - [Action](https://github.com/cssmagic/action)
* `_.template` - [Underscore-template](https://github.com/cssmagic/underscore-template)

#### 构建

0. 把本项目的代码 fork 并 clone 到本地。
0. 在项目根目录执行 `npm install`，安装必要的依赖。
0. 在项目根目录执行 `npm run dist`，运行构建脚本。
0. 构建生成的发布文件将存放在 `/dist` 目录下。

#### 单元测试

0. 把本项目的代码 fork 并 clone 到本地。
0. 在项目根目录执行 `bower install`，安装必要的依赖。
0. 在浏览器中打开以下文件即可运行单元测试：
	* `test/test-dev.html` - 测试源码
	* `test/test-dist-trad.html` - 测试发布文件

***

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
