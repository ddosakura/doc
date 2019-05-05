# HTTP

## Link

### Resource

+ [Archive of Website](http://web.archive.org/)
+ [http2](https://http2.github.io/)

### Related

+ [IP](../../Network/IP/README.md)
+ [TCP](../../Transport/TCP/README.md)
+ [DNS](../DNS/README.md)

### Example

+ [Playground](https://github.com/ddosakura/NPE/http)
+ [Old Note](./http-proxy)

## Document

### Version

|Version |RFC    |revise |revise |
|--------|-------|-------|-------|
|HTTP/1.0|RFC1945|||
|HTTP/1.1|RFC2068|RFC2616|RFC7230-7235|
|HTTP/2.0|RFC7540-7541|||

+ HTTP/1.0
    + RFC 1945 Hypertext Transfer Protocol -- HTTP/1.0
+ HTTP/1.1 Main
    + RFC 7230 Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing
    + RFC 7231 Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
    + RFC 7232 Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests
    + RFC 7233 Hypertext Transfer Protocol (HTTP/1.1): Range Requests
    + RFC 7234 Hypertext Transfer Protocol (HTTP/1.1): Caching
    + RFC 7235 Hypertext Transfer Protocol (HTTP/1.1): Authentication
+ HTTP/1.1 Other
    + RFC 2817 Upgrading to TLS Within HTTP/1.1
+ HTTP/2.0 Main
    + RFC 7540 Hypertext Transfer Protocol Version 2 (HTTP/2)
    + RFC 7541 HPACK: Header Compression for HTTP/2
+ HTTP/2.0 Other
    + RFC 8164 Opportunistic Security for HTTP/2
    + RFC 8336 The ORIGIN HTTP/2 Frame
    + RFC 8441 Bootstrapping WebSockets with HTTP/2

### Related

|Content|RFC|revise |
|---|---|---|
|URI|RFC2396|[RFC3986](https://www.rfc-editor.org/rfc/rfc3986.txt)|

## Note

+ [URI、URL、URN](./URI.md)
+ [HTTP1.1](./HTTP1.md)
+ [HTTP2.0](./HTTP2.md)

### About HTTP/1.0 & HTTP/1.1

| Method |1.0|1.1|
|--------|---|---|
|GET     | o | o |
|POST    | o | o |
|PUT     | o | o |
|DELETE  | o | o |
|HEAD    | o | o |
|OPTIONS |   | o |
|CONNECT |   | o |
|TRACE   |   | o |
|LINK    | o |   |
|UNLINK  | o |   |
