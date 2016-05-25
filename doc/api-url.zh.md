# API 文档 - `url` 模块

## 术语 <a name="term">&nbsp;</a>

#### Query String

举例来说，`http://domain.com/path/file?foo&bar=2` 中的 `foo&bar=2` 部分即为 query string。

Query String 的本质是对一些名值对进行编码和序列化之后的结果。而 query string 的解析就是一个反序列化和解码的过程。

#### URL 参数

Query String 所保存的这些名值对即称作 “URL 参数”。


## JavaScript 接口 <a name="js-api">&nbsp;</a>

### `.parseQuery(queryString)` <a name="js-api--parseQuery">&nbsp;</a>

把 query string 解析为以对象的方式保存的名值对。

#### 参数

* `queryString` -- 字符串。需要解析的 query string。

#### 返回值

对象。解析结果，以名值对的方式保存。

#### 示例

```js
gearbox.url.parseQuery('foo=1&bar=2')  // => {foo: '1', bar: '2'}
gearbox.url.parseQuery('foo=&bar=2')  // => {foo: '', bar: '2'}
gearbox.url.parseQuery('foo&bar=2')  // => {foo: '', bar: '2'}
gearbox.url.parseQuery('')  // => {}
```

#### 注意事项

* 传入不合法的参数，则一律返回空对象（`{}`）。
* Query string 中的所有 key 都会被转换为小写。
* Query string 的格式为 `foo=1&bar=true`，不包含问号。如果此接口接收的参数以问号开头，则会被视为第一个 URL 参数的一部分，因为 `?foo` 是一个合法的 URL 参数名。
* Query string 中多个连续的 `&` 字符会被视为一个。
* 解析结果中的值如果为 `true`、`false`、`null`、`undefined` 或数字时，总是以字符串的方式保存，不会自动转换数据类型。
* 当 query string 中出现某个 key 但没有对应的值时（比如 `foo&bar=2` 或 `foo=&bar=2` 中的 `foo`），其值将解析为空字符串。

#### 已知问题

* 重复出现的 key 将只解析最后一次出现的值，不会把所有值加入到一个数组中。
* 不处理复杂模式的 key，比如 `foo[]` 或 `foo[bar]` 都不会被视为特殊含义，只会视为普通的 key。

***

### `.getParam(key)` <a name="js-api--getParam">&nbsp;</a>

获取当前页面 URL 的某个 URL 参数的值。

#### 参数

* `key` -- 字符串。需要获取的 URL 参数名，忽略大小写。

#### 返回值

字符串或 `undefined`。对应 URL 参数的值。

#### 示例

假设当前页面的 URL 为 `http://domain.com/path/file?foo&bar=2`，此时：

```js
gearbox.url.parseQuery('foo')  // => ''
gearbox.url.parseQuery('bar')  // => '2'
gearbox.url.parseQuery('absentKey')  // => undefined
```

#### 注意事项

* Query string 的解析方式参见 `.parseQuery()` 方法。
* 当页面 URL 发生变化时（比如调用 `history.pushState()` 等方法时），返回结果总是当前的。

***

### `.appendParam(url, param)` <a name="js-api--appendParam">&nbsp;</a>

为给定的 URL 附加新的参数。

#### 参数

* `url` -- 字符串。待处理的 URL。
* `param` -- 对象。需要附加的 URL 参数（名值对）。

#### 返回值

字符串。已附加 URL 参数的新的 URL。

#### 示例

```js
var url = 'http://domain.com/path/file'

url = gearbox.url.appendParam(url, {foo: 'bar'})
	// => 'http://domain.com/path/file?foo=bar'

url = gearbox.url.appendParam(url, {test: 1})
	// => 'http://domain.com/path/file?foo=bar&test=1'
```

#### 注意事项

* `param` 参数中的 key 并不会覆盖 `url` 参数中已有的同名 key，只是追加一个同名参数。

***

### `.removeHashFromUrl(url)` <a name="js-api--removeHashFromUrl">&nbsp;</a>

把 URL 中的 hash 部分去除。

#### 参数

* `url` -- 字符串。待处理的 URL，可以是完整的 URL，也可以是相对路径。若传入其它类型的数值，将被转换为字符串。

#### 返回值

字符串。去除 hash 之后的 URL。若未传入参数则返回空字符串。

#### 示例

```js
var url = 'http://domain.com/foo#bar'
gearbox.url.removeHashFromUrl(url)  // => 'http://domain.com/foo'
```

***

### `.getHashFromUrl(url)` <a name="js-api--getHashFromUrl">&nbsp;</a>

获取 URL 中的 hash 部分。获取结果包含开头的 `#` 字符。

如果需要得到当前页面 URL 的 hash 部分，直接使用 `location.hash` 即可。

#### 参数

* `url` -- 字符串。待处理的 URL，可以是完整的 URL，也可以是相对路径。若传入其它类型的数值，将被转换为字符串。

#### 返回值

字符串。若传入的 URL 不包含 hash 部分则返回空字符串；若未传入参数则返回空字符串。

#### 示例

```js
var url = 'http://domain.com/foo#bar'
gearbox.url.getHashFromUrl(url)  // => '#bar'
```


## 别名 <a name="js-api--alias">&nbsp;</a>

### `.isHash()` <a name="js-api--isHash">&nbsp;</a>

`gearbox.str.isHash()` 的别名。

### `.stripHash()` <a name="js-api--stripHash">&nbsp;</a>

`gearbox.str.stripHash()` 的别名。


***
***

## 暂未实现的接口 :warning:

### `.parse(url)` <a name="js-api--parseUrl">&nbsp;</a>

> **别名**： `.parseUrl()`

> 此接口的行为与 Node.js 内置的 [`url` 模块](https://iojs.org/api/url.html) 的 `.parse()` 接口的功能保持基本一致，但仍然有细微差异，详见 “注意事项” 部分。

解析 URL 的各个要素，解析结果以对象的方式输出。举例来说，当传入以下 URL 时：

```
'http://user:pass@domain.com:8080/path/file?query=string#hash'
```

解析结果中各个 key 的含义和值如下：

* **`href`** -- 完整 URL 值。协议名和域名会被转换为全小写。
	值：（同传入的 URL）

* **`protocol`** -- 协议。
	值：`'http:'`

* **`slashes`** -- 布尔值，此协议是否需要双斜杠。
	值：`true`

* **`host`** -- 主机（含端口号）。域名会被转换为全小写。
	值：`'domain.com:8080'`

* **`auth`** -- 身份验证信息。
	值：`'user:pass'`

* **`hostname`** -- 主机名（不含端口号）。域名会被转换为全小写。
	值：`'domain.com'`

* **`port`** -- 端口号。它不会被转换为数字。
	值：`'8080'`

* **`pathname`** -- 路径（含文件名）。
	值：`'/path/file'`

* **`search`** -- query string 部分（含开头的 `?` 字符）。参数名和值不会被解码。
	值：`'?query=string'`

* **`path`** -- 路径加上 query string 部分。参数名和值不会被解码。
	值：`'/path/file?query=string'`

* **`query`** -- query string 部分（不含开头的 `?` 字符）。
	值：`'query=string'`

* **`hash`** -- hash 部分（含开头的 `#` 字符）。
	值：`'query=string'`

可以看出它们涵盖了 `location` 对象的各个 key，且含义相同。

#### 参数

* `url` -- 字符串。需要解析的 URL。

#### 返回值

对象。整个 URL 的解析结果，URL 的各个要素部分以名值对的方式保存。

当参数不合法时，返回空对象（`{}`）。

#### 注意事项

* 此接口的实现依赖 DOM，无法用于 Worker。
* 若传入的 URL 不完整，则视为相对路径，以当前页面为基准进行解析。这也意味着 `//foo/bar` 将会被视为 “`foo` 主机下的 `/bar` 路径”。
* 当 URL 中的某些部分不存在时，解析结果中对应的 key 也将不存在。

***

### `.format(parts)` <a name="js-api--composeUrl">&nbsp;</a>

> **别名**： `.composeUrl()`

> 此接口的行为与 Node.js 内置的 `url` 模块的 `.format()` 接口的功能保持基本一致。

根据提供的 URL 各个要素，构造完整的 URL。URL 各个组成部分的名称及含义同 `.parse()` 接口的描述。

#### 参数

* `parts` -- 对象。URL 的各个要素的名值对。

#### 返回值

字符串。构造出的完整 URL。

当参数不合法时，返回空字符串。

#### 示例

```js
var urlParts = {
    protocol: 'http:',
    host: 'domain.com',
    pathname: '/foo/bar'
}
gearbox.url.format(urlParts)  // => 'http://domain.com/foo/bar'
```

#### 注意事项

* 此接口的实现依赖 DOM，无法用于 Worker。
* `href` 字段将被忽略。
* `path` 字段将被忽略。
* `protocol` 字段如果没有用冒号结尾，则会自动补上。对于这些协议（`http`、`https`、`ftp`、`gopher`、`file`），还会自动补上双斜杠。
* 可以额外使用 `slashes` 字段来强制自动补上双斜杠。
* 如果提供了 `auth` 字段，则会被使用。
* 当存在 `host` 时，将忽略 `hostname` 和 `port` 字段。
* 当存在 `search` 时，将忽略 `query` 字段。
* `pathname` 应以 `/` 开头；不以 `/` 开头则会自动补上。
* `search` 应以 `?` 开头；不以 `?` 开头则会自动补上。
* `hash` 应以 `#` 开头；不以 `#` 开头则会自动补上。
* `host`、`hostname`、`pathname` 中的 `?` 和 `#` 字符会被编码；`search` 中的 `#` 字符会被编码。
* `port` 值在经过 `parseInt(port, 10)` 转换后必须为 `0` 或正整数，否则均视为 `0`。
* URL 的各个要素并不都是必选的。各字段省略时的行为如下（注意，字段值为空字符串并不表示省略）：
	* `protocol` -- 若省略则取当前页面的 `location.protocol`。
	* `auth` -- 若省略则不输出。
	* `host` -- 若省略则取 `hostname` 和 `port`。
	* `hostname` -- 若省略则取当前页面的 `location.hostname`。
	* `port` -- 若省略则不输出。
	* `pathname` -- 若省略则取根目录（`/`）。
	* `search` -- 若省略则取 `query`。
	* `query` -- 若省略则不输出。
	* `hash` -- 若省略则不输出。
