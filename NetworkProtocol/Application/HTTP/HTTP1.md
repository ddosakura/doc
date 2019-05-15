### HTTP/1.1

Example:
```
$ curl -v baidu.com
*   Trying 123.125.114.144...
* TCP_NODELAY set
* Connected to baidu.com (123.125.114.144) port 80 (#0)
> GET / HTTP/1.1
> Host: baidu.com
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< Date: Mon, 29 Apr 2019 12:55:00 GMT
< Server: Apache
< Last-Modified: Tue, 12 Jan 2010 13:48:00 GMT
< ETag: "51-47cf7e6ee8400"
< Accept-Ranges: bytes
< Content-Length: 81
< Cache-Control: max-age=86400
< Expires: Tue, 30 Apr 2019 12:55:00 GMT
< Connection: Keep-Alive
< Content-Type: text/html
< 
<html>
<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">
</html>
* Connection #0 to host baidu.com left intact
* Closing connection 0
```

#### About Method

1. OPTIONS 请求时可用 `*` 代替 URI
    > ```
    > OPTIONS * HTTP/1.1
    > Host: baidu.com
    > Accept: */*
    > ```
    > An OPTIONS request with an asterisk (`*`) as the request-target
    > (Section 5.3 of [RFC7230]) applies to the server in general rather
    > than to a specific resource.  Since a server's communication options
    > typically depend on the resource, the `*` request is only useful as a
    > "ping" or "no-op" type of method; it does nothing beyond allowing the
    > client to test the capabilities of the server.  For example, this can
    > be used to test a proxy for HTTP/1.1 conformance (or lack thereof).
    > 
    > If the request-target is not an asterisk, the OPTIONS request applies
    > to the options that are available when communicating with the target
    > resource.

2. TRACE 仅用于调试，容易引发 XST(Cross-Site Tracing, 跨站追踪) 攻击
    > XST 攻击是利用服务器的调试方法 Trace 进行用户信息收集的一种攻击，因为 Trace 方法是会导致服务器原样返回客户端发送的内容（Cookie，HTTP 认证信息等）。

3. CONNECT 隧道
    + [参考](https://imququ.com/post/web-proxy.html)
    + HTTP 默认走普通代理 `RFC 7230 - HTTP/1.1: Message Syntax and Routing`
    + HTTPS 走隧道代理 `RFC 7231 - HTTP/1.1: Semantics and Content`
    + 请求样例
    > the request-target
    > consists of only the host name and port number of the tunnel
    > destination, separated by a colon.
    > ```
    > CONNECT server.example.com:80 HTTP/1.1
    > Host: server.example.com:80
    > ```
    + 关于返回码
    > CONNECT is intended only for use in requests to a proxy.  An origin
    > server that receives a CONNECT request for itself MAY respond with a
    > 2xx (Successful) status code to indicate that a connection is
    > established.
    + 关于响应头
    > A server MUST NOT send any Transfer-Encoding or Content-Length header
    > fields in a 2xx (Successful) response to CONNECT.  A client MUST
    > ignore any Content-Length or Transfer-Encoding header fields received
    > in a successful response to CONNECT.
    + 禁止缓存
    > Responses to the CONNECT method are not cacheable.

#### Keep-Alive & Pipelining (持久连接 & 管线化/流水线技术)

+ 早期版本：一次 HTTP 请求断开一次 TCP
+ HTTP/1.1 默认 Keep-Alive (请求与响应复用 TCP 连接) 
    > // TODO: CHECK  
    > 关于 TCP 四次挥手时 HTTP 请求与响应的猜想  
    > HTTP 一次请求一次响应，四次挥手间应该没有数据传输  
    > (不包括 WebSocket)
+ Pipelining (`请求II`不等待`响应I`)

// TODO: [ ] Play

#### Cookie/Session

+ 初次响应头 `Set-Cookie: sid=xxx; path=/`
+ 二次请求头 `Cookie: sid=xxx`

#### HTTP Packet (报文)

+ 首部
    + 请求行/状态行
    + 首部字段
        + 请求/响应 首部字段
        + 通用 首部字段
        + 实体 首部字段
+ `\r\n` (CR LF) [`0x0d` `0x0a`]
+ 主体(可选)

##### Header

Go 中 Header 的定义:

```go
// A Header represents the key-value pairs in an HTTP header.
//
// The keys should be in canonical form, as returned by
// CanonicalHeaderKey.
type Header map[string][]string
```

+ 值是一个数组，// TODO: 疑似使用 `;` 分隔
    > e.g `Set-Cookie: sid=xxx; path=/`

##### Encoding (编码)

+ [参考链接](https://blog.csdn.net/u014569188/article/details/78912469)
+ // TODO: [ ] Play

###### Content-Encoding (内容编码)

+ 通常用于对实体内容进行压缩编码，目的是优化传输
+ jpg / png 这类文件一般不开启，因为图片格式已经是高度压缩过的，再压一遍没什么效果不说还浪费 CPU

| 编码 | 描述 |
|---|---|
|   gzip   | GNU ZIP |
| compress | UNIX 系统标准 |
| deflate  | zlib |
| identity | 不进行编码 |

###### Transfer-Encoding (传输编码)

+ `Transfer-Encoding: chunked` -> 分块传输
+ 此时不再使用 `Content-Length`

```js
require('net').createServer(function(sock) {
    sock.on('data', function(data) {
        sock.write('HTTP/1.1 200 OK\r\n');
        sock.write('Transfer-Encoding: chunked\r\n');
        sock.write('\r\n');

        // 块 I
        sock.write('b\r\n'); // Size-of-Block (十六进制)
        sock.write('01234567890\r\n');

        // 块 II
        sock.write('5\r\n');
        sock.write('12345\r\n');

        // 块 III
        sock.write('0\r\n');
        sock.write('\r\n');
    });
}).listen(9090, '127.0.0.1');
```

##### MIME 机制

+ // TODO: [ ] Play

###### Multipart 多部分对象集合 [// TODO: READ RFC 2046]

分类:

+ `multipart/form-data` -> 表单文件上传   {Request}
+ `multipart/byteranges` -> Code=206时  {Response} -> 见范围请求-多重范围

> + 每部分有各自的首部
> + 可嵌套使用
> + 使用 `boundary` 字符串划分部分
>
> Example:
>
>
> Content-Type: multipart/...; boundary=xxx  
> `\r\n`  
> --xxx  
> 首部  
> `\r\n`  
> 可选主体  
> --xxx  
> 首部  
> `\r\n`  
> 可选主体  
> --xxx-- # 最后有额外的 `--`  

##### Range Requests (范围请求)

    // TODO: 用途：下载时的可恢复机制 => 断点续传

+ 请求
    + 首部字段
        > ```
        > Range: bytes=5001-10000
        > Range: bytes=5001-                # 一直到结束
        > Range: bytes=-3000, 5000-7000     # 多重范围
        > ```
+ 响应
    + 状态码
        + 正常时: 206
        + 无法响应时: 200 -> 此时传完整的实体内容
    + 首部字段
        + `Content-Range: bytes 500-999/8000`
        + 多重范围时 `Content-Type: multipart/byteranges` (每部分单独使用 `Content-Range`)

##### Accept (内容协商)

    判断基准-请求首部字段

    + Accept
    + Accept-Charset
    + Accept-Encoding
    + Accept-Language
    + Content-Language

三种内容协商手段
+ 服务器端驱动 (自动)
+ 客户端驱动 (手动选择)
+ 透明协商 (混合 C&S 驱动)

#### Status Code (状态码)

|Code|Type|说明|
|---|---|---|
|   1xx   | Informational | 消息(处理中) |
|   2xx   | Success       | 成功(正常处理完毕) |
|   3xx   | Redirection   | 重定向(需要附加操作) |
|   4xx   | Client Error  | 请求错误(无法处理请求) |
| 5xx/6xx | Server Error  | 服务器错误(处理请求出错) |

// TODO: 以下列表中列入常用状态码、专项说明(e.g. WebDAV)的状态码需要逐步移除

+ 100 Continue
+ 101 Switching Protocols
+ 102 Processing

+ 201 Created
+ 202 Accepted
+ 203 Non-Authoritative Information
+ 205 Reset Content
+ 207 Multi-Status

+ 300 Multiple Choices
+ 305 Use Proxy
+ ~~306 Switch Proxy~~ (废弃)

+ 402 Payment Required
+ 405 Method Not Allowed
+ 406 Not Acceptable
+ 407 Proxy Authentication Required
+ 408 Request Timeout
+ 409 Conflict
+ 410 Gone
+ 411 Length Required
+ 412 Precondition Failed
+ 413 Request Entity Too Large
+ 414 Request-URI Too Long
+ 415 Unsupported Media Type
+ 416 Requested Range Not Satisfiable
+ 417 Expectation Failed
+ 418 I'm a teapot
+ 421 Too Many Connections
+ 422 Unprocessable Entity
+ 423 Locked
+ 424 Failed Dependency
+ 425 Unordered Collection
+ 426 Upgrade Required
+ 449 Retry With
+ 451 Unavailable For Legal Reasons

+ 501 Not Implemented
+ 502 Bad Gateway
+ 504 Gateway Timeout
+ 505 HTTP Version Not Supported
+ 506 Variant Also Negotiates
+ 507 Insufficient Storage
+ 509 Bandwidth Limit Exceeded
+ 510 Not Extended
+ 600 Unparseable Response Headers

##### 常用状态码

+ 1xx
+ 2xx
    + 200 OK
        1. 已正常处理
        1. `CONNECT 隧道` 建立完成
    + 204 No Content
        + 返回报文**不含**实体主体
        + *(浏览器显示页面不更新)*
    + 206 Partial Content
        + 见范围请求
+ 3xx
    > 重定向相关Header
    >
    > `Location: <URI>`
    + 301 Moved Permanently
        + 永久重定向
        + *(若存在该URI的书签，浏览器重新保存该书签)*
        + 常见重定向: `http://.../a -> http://.../a/`
        + *(标准上不改请求方法)*
    + 302 Move Temporarily
        + 临时重定向
        + *(标准上不改请求方法)*
        + *(浏览器可能将 302 视为 303)*
    + 303 See Other
        + 临时重定向
        + 使用 `GET` 向新 URI 发起请求
    + 304 Not Modified
        + 对象: 含 `If-*` 这类 Header 的 GET 请求
        + 返回报文**不含**主体
    + 307 Temporary Redirect
        + 临时重定向
        + 严格按照浏览器标准，不会从 POST 变为 GET
+ 4xx
    + 400 Bad Request
        + 请求报文中含有语法错误
        + *(浏览器按 200 OK 时一样对待该状态)*
    + 401 Unauthorized
        + 未认证/认证失败(BASIC/DIGEST)
        + 响应应包含 `WWW-Authenticate` 头
    + 403 Forbidden
        + 拒绝访问(原因不必要说明)
        + 常见于权限拦截
    + 404 Not Found
        + 找不到资源
+ 5xx
    + 500 Internal Server Error
        + 执行请求时发生了错误
        + 常见于 bug
    + 503 Service Unavailable
        + 服务不可用
        + 常见于服务器负载过大/正在维护
        > 相关Header
        >
        > `Retry-After: <http-date>`  
        > `Retry-After: <delay-seconds>`  

#### Header 首部字段
