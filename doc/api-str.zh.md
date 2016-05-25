# API 文档 - `str` 模块

## JavaScript 变量 <a name="js-var">&nbsp;</a>

以下预定义的变量在业务层可以直接使用。

### `.RE_EMAIL` <a name="js-var--RE_EMAIL">&nbsp;</a>

校验电子邮箱的正则表达式。

#### 示例

```js
gearbox.str.RE_EMAIL.test('foo@bar.com')  // => true
gearbox.str.RE_EMAIL.test('foo@bar')  // => false
gearbox.str.RE_EMAIL.test('foo.bar.cn')  // => false
```

### `.RE_MOBILE` <a name="js-var--RE_MOBILE">&nbsp;</a>

校验手机号的正则表达式。

手机号必须是中国大陆的手机号，11 位数字，不可包含空格、横杠等特殊字符。

#### 示例

```js
gearbox.str.RE_MOBILE.test('13355668899')  // => true
gearbox.str.RE_MOBILE.test('021-55668899')  // => false
gearbox.str.RE_MOBILE.test('10086')  // => false
```

### `.RE_POSTCODE` <a name="js-var--RE_POSTCODE">&nbsp;</a>

校验邮政编码的正则表达式。

邮政编码必须是中国大陆的邮政编码，6 位数字，不可包含空格、横杠等特殊字符。

#### 示例

```js
gearbox.str.RE_POSTCODE.test('200030')  // => true
gearbox.str.RE_POSTCODE.test('4008517517')  // => false
gearbox.str.RE_POSTCODE.test('1234')  // => false
```

***

### `.CNY` <a name="js-var--CNY">&nbsp;</a>

> **别名**： `.RMB`

人民币符号 `¥`。

### `.FULL_WIDTH_CNY` <a name="js-var--FULL_WIDTH_CNY">&nbsp;</a>

> **别名**： `.FULL_WIDTH_RMB`

全角的人民币符号 `￥`。

#### 示例

```js
// 将所有全角的人民币符号替换为半角
var text = '￥1000 - ￥2000'
text.split(gearbox.str.FULL_WIDTH_CNY).join(gearbox.str.CNY)  // => '¥1000 - ¥2000'
```


## JavaScript 接口 <a name="js-api">&nbsp;</a>

### `.isHash(string)` <a name="js-api--isHash">&nbsp;</a>

判断是否为 hash 字符串。

Hash 字符串以 `#` 开头，比如 `#foo` 就是一个 hash 字符串。这种字符串通常出现于链接锚点（`<a href="#anchor">bar</a>`）、ID 选择符（`$('#id')`）、Twitter 标签或 `location.hash` 的值等等。

字符串开头的空白符将被忽略，不影响判断结果。

#### 参数

* `string` -- 字符串。需要判断的字符串。

#### 返回值

布尔值。判断结果。

#### 示例

```js
gearbox.str.isHash('#foo')  // => true
gearbox.str.isHash('bar')  // => false
gearbox.str.isHash('  #foo-bar')  // => true
```

***

### `.stripHash(string)` <a name="js-api--stripHash">&nbsp;</a>

去除 hash 字符串开头的 `#` 字符。

字符串头尾的空白符也将被去除。

#### 参数

* `string` -- 字符串（非字符串会被强制转换为字符串）。需要处理的字符串。

#### 返回值

字符串。处理结果。

#### 示例

```js
gearbox.str.stripHash('#foo')  // => 'foo'
gearbox.str.stripHash('bar')  // => 'bar'
gearbox.str.stripHash('  #foo-bar')  // => 'foo-bar'
```

***

### `.uniq(array)` <a name="js-api--uniq">&nbsp;</a>

从字符串数组中去除重复的项。

#### 注意事项

* 非字符串的值会被转换为字符串后进行比对，即 `null` 和 `'null'` 会被视为重复。
* 去重后的各个字符串在数组中的排序无法保证。

#### 参数

* `array` -- 字符串数组。

#### 返回值

数组。去重之后的结果。

#### 示例

```js
gearbox.str.uniq(['foo', 'foo', 'bar'])  // => ['foo', 'bar']
```

***

### `.toFloat(string)` <a name="js-api--toFloat">&nbsp;</a>

转换为浮点数。

可以视为 `parseFloat()` 的别名。

#### 参数

* `string` -- 字符串。

#### 返回值

数字。转换结果。

#### 示例

```js
gearbox.str.toFloat('0')  // => 0
gearbox.str.toFloat('1.77')  // => 1.77
gearbox.str.toFloat('2.3.6')  // => 2.3
gearbox.str.toFloat('2e3')  // => 2000
gearbox.str.toFloat('1.23foo')  // => 1.23
gearbox.str.toFloat('foo123')  // => NaN
```

***

### `.toInt(string)` <a name="js-api--toInt">&nbsp;</a>

转换为整数。

可以视为 `parseInt(string, 10)` 的别名。直接取整，不做舍入。

#### 参数

* `string` -- 字符串。

#### 返回值

数字。转换结果。

#### 示例

```js
gearbox.str.toInt('0')  // => 0
gearbox.str.toInt('1.77')  // => 1
gearbox.str.toInt('2.3.6')  // => 2
gearbox.str.toInt('2e3')  // => 2000
gearbox.str.toInt('1.23foo')  // => 1
gearbox.str.toInt('foo123')  // => NaN
```

***

### `.toFixed(string, [i])` <a name="js-api--toFixed">&nbsp;</a>

转换为固定位数的小数。会做舍入。

与 `Number.prototype.toFixed()` 的功能类似，但此接口接收字符串，输出数字。

#### 参数

* `string` -- 字符串。
* `i` -- 可选。整数。保留的位数。默认值为 `0`。

#### 返回值

数字。转换结果。

#### 示例

```js
gearbox.str.toFixed('0')  // => 0
gearbox.str.toFixed('0', 2)  // => 0
gearbox.str.toFixed('1.77')  // => 2
gearbox.str.toFixed('1.77', 1)  // => 1.8
gearbox.str.toFixed('2.3.6', 2)  // => 2.3
gearbox.str.toFixed('2e3', 3)  // => 2000
gearbox.str.toFixed('1.23foo', 1)  // => 1.2
gearbox.str.toFixed('foo123')  // => NaN
```


## Underscore.string 同名接口 <a name="js-api--underscore.string">&nbsp;</a>

`str` 模块提供的部分接口与 Underscore.string 类库的同名接口完全一致。这些接口的源码均引用了 Underscore.string 的实现，并存放在 `src/str-backup.js` 文件中。

### 字符串裁剪

* `.trim(string, [characters])` <a name="js-api--trim">&nbsp;</a>

	请参考 Underscore.string 的文档： [`trim`](https://epeli.github.io/underscore.string/#trim-string-characters-gt-string)

* `.ltrim(string, [characters])` <a name="js-api--trim">&nbsp;</a>

	请参考 Underscore.string 的文档： [`ltrim`](https://epeli.github.io/underscore.string/#ltrim-string-characters-gt-string)

* `.rtrim(string, [characters])` <a name="js-api--trim">&nbsp;</a>

	请参考 Underscore.string 的文档： [`rtrim`](https://epeli.github.io/underscore.string/#rtrim-string-characters-gt-string)

### 字符串包含关系

* `.includes(string, substring)` <a name="js-api--contains">&nbsp;</a>

	> **别名**： `.contains()`

	请参考 Underscore.string 的文档： [`include`](https://epeli.github.io/underscore.string/#include-string-substring-gt-boolean)

	**注意**：从 Gearbox v0.6 开始，`.include()` 已弃用，已改名为 `.includes()`。

* `.startsWith(string, starts, [position])` <a name="js-api--include">&nbsp;</a>

	请参考 Underscore.string 的文档： [`startsWith`](https://epeli.github.io/underscore.string/#startswith-string-starts-position-gt-boolean)

* `.endsWith(string, ends, [position])` <a name="js-api--include">&nbsp;</a>

	请参考 Underscore.string 的文档： [`endsWith`](https://epeli.github.io/underscore.string/#endswith-string-ends-position-gt-boolean)
