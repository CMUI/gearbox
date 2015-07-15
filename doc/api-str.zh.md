# API 文档 - `str` 模块

## JavaScript 变量<a name="js-var"></a>

以下预定义的变量在业务层可以直接使用。

### `_.str.RE_EMAIL`<a name="js-var-RE_EMAIL"></a>

校验电子邮箱的正则表达式。

#### 示例

```js
_.str.RE_EMAIL.test('foo@bar.com')  // => true
_.str.RE_EMAIL.test('foo@bar')  // => false
_.str.RE_EMAIL.test('foo.bar.cn')  // => false
```

### `_.str.RE_MOBILE`<a name="js-var-RE_MOBILE"></a>

校验手机号的正则表达式。

手机号必须是中国大陆的手机号，11 位数字，不可包含空格、横杠等特殊字符。

#### 示例

```js
_.str.RE_MOBILE.test('13355668899')  // => true
_.str.RE_MOBILE.test('021-55668899')  // => false
_.str.RE_MOBILE.test('10086')  // => false
```

### `_.str.RE_POSTCODE`<a name="js-var-RE_POSTCODE"></a>

校验邮政编码的正则表达式。

邮政编码必须是中国大陆的邮政编码，6 位数字，不可包含空格、横杠等特殊字符。

#### 示例

```js
_.str.RE_POSTCODE.test('200030')  // => true
_.str.RE_POSTCODE.test('4008517517')  // => false
_.str.RE_POSTCODE.test('1234')  // => false
```

***

### `_.str.CNY`<a name="js-var-CNY"></a>

> **别名**： `_.str.RMB`

人民币符号 `¥`。

### `_.str.FULL_WIDTH_CNY`<a name="js-var-FULL_WIDTH_CNY"></a>

> **别名**： `_.str.FULL_WIDTH_RMB`

全角的人民币符号 `￥`。

#### 示例

```js
// 将所有全角的人民币符号替换为半角
var text = '￥1000 - ￥2000'
text.split(_.str.FULL_WIDTH_CNY).join(_.str.CNY)  // => '¥1000 - ¥2000'
```


## JavaScript 接口<a name="js-api"></a>

### `_.str.isHash(string)`<a name="js-api-isHash"></a>

判断是否为 hash 字符串。

Hash 字符串以 `#` 开头，比如 `#foo` 就是一个 hash 字符串。这种字符串通常出现于链接锚点（`<a href="#anchor">bar</a>`）、ID 选择符（`$('#id')`）、Twitter 标签或 `location.hash` 的值等等。

字符串开头的空白符将被忽略，不影响判断结果。

#### 参数

* `string` -- 字符串。需要判断的字符串。

#### 返回值

布尔值。判断结果。

#### 示例

```js
_.str.isHash('#foo')  // => true
_.str.isHash('bar')  // => false
_.str.isHash('  #foo-bar')  // => true
```

***

### `_.str.stripHash(string)`<a name="js-api-stripHash"></a>

去除 hash 字符串开头的 `#` 字符。

字符串头尾的空白符也将被去除。

#### 参数

* `string` -- 字符串（非字符串会被强制转换为字符串）。需要处理的字符串。

#### 返回值

字符串。处理结果。

#### 示例

```js
_.str.stripHash('#foo')  // => 'foo'
_.str.stripHash('bar')  // => 'bar'
_.str.stripHash('  #foo-bar')  // => 'foo-bar'
```

***

### `_.str.uniq(array)`<a name="js-api-uniq"></a>

从字符串数组中去除重复的项。

#### 注意事项

* 非字符串的值会被转换为字符串后进行比对，即 `null` 和 `'null'` 会被视为重复。
* 去重后的各个字符串在数组中的排序无法保证。

#### 参数

* `array` -- 字符串数组。

#### 返回值

数组。去重结果。

#### 示例

```js
_.str.uniq(['foo', 'foo', 'bar'])  // => ['foo', 'bar']
```

***

### `_.str.toFloat(string)`<a name="js-api-toFloat"></a>

转换为浮点数。

可以视为 `parseFloat()` 的别名。

#### 参数

* `string` -- 字符串。

#### 返回值

数字。转换结果。

#### 示例

```js
_.str.toFloat('0')  // => 0
_.str.toFloat('1.77')  // => 1.77
_.str.toFloat('2.3.6')  // => 2.3
_.str.toFloat('2e3')  // => 2000
_.str.toFloat('1.23foo')  // => 1.23
_.str.toFloat('foo123')  // => NaN
```

***

### `_.str.toInt(string)`<a name="js-api-toInt"></a>

转换为整数。

可以视为 `parseInt(string, 10)` 的别名。直接取整，不做舍入。

#### 参数

* `string` -- 字符串。

#### 返回值

数字。转换结果。

#### 示例

```js
_.str.toInt('0')  // => 0
_.str.toInt('1.77')  // => 1
_.str.toInt('2.3.6')  // => 2
_.str.toInt('2e3')  // => 2000
_.str.toInt('1.23foo')  // => 1
_.str.toInt('foo123')  // => NaN
```

***

### `_.str.toFixed(string, [i])`<a name="js-api-toFixed"></a>

转换为固定位数的小数。会做舍入。

与 `Number.prototype.toFixed()` 的功能类似，但此接口接收字符串，输出数字。

#### 参数

* `string` -- 字符串。
* `i` -- 可选。整数。保留的位数。默认值为 `0`。

#### 返回值

数字。转换结果。

#### 示例

```js
_.str.toFixed('0')  // => 0
_.str.toFixed('0', 2)  // => 0
_.str.toFixed('1.77')  // => 2
_.str.toFixed('1.77', 1)  // => 1.8
_.str.toFixed('2.3.6', 2)  // => 2.3
_.str.toFixed('2e3', 3)  // => 2000
_.str.toFixed('1.23foo', 1)  // => 1.2
_.str.toFixed('foo123')  // => NaN
```


## Underscore.string 同名接口<a name="js-api-underscore.string"></a>

`str` 模块提供的部分接口与 Underscore.string 类库的同名接口完全一致。这些接口的源码均引用了 Underscore.string 的实现，并存放在 `src/str-backup.js` 文件中。

如果你的项目已经加载了 Underscore.string 类库，则可以自行构建一个不包含这部分源码的 Gearbox 包；此时使用完整的 Gearbox 包也没有关系，因为它会自动跳过这些同名接口的加载。

### 字符串裁剪

* `_.str.trim(string, [characters])`<a name="js-api-trim"></a>

	请参考 Underscore.string 的文档： [`trim`](https://epeli.github.io/underscore.string/#trim-string-characters-gt-string)

* `_.str.ltrim(string, [characters])`<a name="js-api-trim"></a>

	请参考 Underscore.string 的文档： [`ltrim`](https://epeli.github.io/underscore.string/#ltrim-string-characters-gt-string)

* `_.str.rtrim(string, [characters])`<a name="js-api-trim"></a>

	请参考 Underscore.string 的文档： [`rtrim`](https://epeli.github.io/underscore.string/#rtrim-string-characters-gt-string)

### 字符串包含关系

* `_.str.contains(string, substring)`<a name="js-api-contains"></a>

	> **别名**： `_.str.include()`

	请参考 Underscore.string 的文档： [`include`](https://epeli.github.io/underscore.string/#include-string-substring-gt-boolean)

* `_.str.startsWith(string, starts, [position])`<a name="js-api-include"></a>

	请参考 Underscore.string 的文档： [`startsWith`](https://epeli.github.io/underscore.string/#startswith-string-starts-position-gt-boolean)

* `_.str.endsWith(string, ends, [position])`<a name="js-api-include"></a>

	请参考 Underscore.string 的文档： [`endsWith`](https://epeli.github.io/underscore.string/#endswith-string-ends-position-gt-boolean)
