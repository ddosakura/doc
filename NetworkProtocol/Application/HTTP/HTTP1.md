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
```
OPTIONS * HTTP/1.1
Host: baidu.com
Accept: */*
```

2. TRACE 仅用于调试，容易引发 XST(Cross-Site Tracing, 跨站追踪) 攻击
    > XST 攻击是利用服务器的调试方法 Trace 进行用户信息收集的一种攻击，因为 Trace 方法是会导致服务器原样返回客户端发送的内容（Cookie，HTTP 认证信息等）。

3. CONNECT 隧道
    + [参考](https://imququ.com/post/web-proxy.html)
    + HTTP 默认走普通代理 `RFC 7230 - HTTP/1.1: Message Syntax and Routing`
    + HTTPS 走隧道代理 `RFC 7231 - HTTP/1.1: Semantics and Content`
    + 请求样例
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
