# API 文档 - `dom` 模块

## JavaScript 变量<a name="js-var"></a>

为减少业务层对常用 DOM 元素的重复获取和包装，`dom` 模块预先缓存了这些元素的 Zepto 包装对象。在业务层可以直接使用。

### `_.dom.$win`<a name="js-var-$win"></a>

`window` 对象的 Zepto 包装对象。

#### 示例

监听 `resize` 事件：

```js
_.dom.$win.on('resize', function (ev) {
    //...
})
```

### `_.dom.$root`<a name="js-var-$root"></a>

`document.documentElement` 对象（即 `<html>` 元素）的 Zepto 包装对象。

### `_.dom.$body`<a name="js-var-$body"></a>

`document.body` 对象（即 `<body>` 元素）的 Zepto 包装对象。

#### 注意事项

为确保对 `document.body` 对象的正确获取，加载 Gearbox 的脚本标签须放置在页面的 `<body>` 标签内。当然，根据前端性能的最佳实践，所有外链脚本也确实应该放置在页面的最底部：

```html
<html>
<head>...</head>
<body>
    ...
    <script src="..."></script>
</body>
</html>
```

## JavaScript 接口<a name="js-api"></a>

### `_.dom.is$Element(obj)`<a name="js-api-is$Element"></a>

判断是否为 Zepto 包装对象（或 Zepto 集合）。

如果外部环境没有加载 Zepto 但有 jQuery，则理论上此方法也可以判断 jQuery 包装对象（或 jQuery 集合）。

#### 参数

* `obj` -- 任意类型。需要判断的对象。

#### 返回值

布尔值。判断结果。

#### 示例

```js
_.dom.is$Element(_.dom.$win)  // => true
```
