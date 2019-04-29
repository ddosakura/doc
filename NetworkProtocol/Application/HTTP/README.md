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

## Document

### Version

|Version |RFC    |revise |revise |
|--------|-------|-------|-------|
|HTTP/1.0|RFC1945|||
|HTTP/1.1|RFC2068|RFC2616|RFC7290-7235|
|HTTP/2.0|RFC7540-7541|||

### Related

|Content|RFC|revise |
|---|---|---|
|URI|RFC2396|[RFC3986](https://www.rfc-editor.org/rfc/rfc3986.txt)|

## Note

### URI、URL、URN

+ URN 已成历史
    > The term "Uniform Resource Name" (URN) has been used historically to refer to both URIs under the "urn" scheme [RFC2141], which are required to remain globally unique and persistent even when the resource ceases to exist or becomes unavailable, and to any other URI with the properties of a name.
+ 建议使用通用术语 URI
    > Future specifications and related documentation should
   use the general term "URI" rather than the more restrictive terms
   "URL" and "URN"

+ Syntax Components
```
URI         = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
hier-part   = "//" authority path-abempty
              / path-absolute
              / path-rootless
              / path-empty

# 协议类型
scheme      = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
# 认证(用户、地址、端口)
authority   = [ userinfo "@" ] host [ ":" port ]
# 带层次的文件路径
path        = path-abempty    ; begins with "/" or is empty
            / path-absolute   ; begins with "/" but not "//"
            / path-noscheme   ; begins with a non-colon segment
            / path-rootless   ; begins with a segment
            / path-empty      ; zero characters
# 查询字符串
query       = *( pchar / "/" / "?" )
# 片段标识符
fragment    = *( pchar / "/" / "?" )
```

         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
          |   _____________________|__
         / \ /                        \
         urn:example:animal:ferret:nose

+ [IANA - URI Schemes](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)

+ URI Syntax: `^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?`
    + [Graph](https://regexper.com/#%5E%28%28%5B%5E%3A%2F%3F%23%5D%2B%29%3A%29%3F%28%5C%2F%5C%2F%28%5B%5E%2F%3F%23%5D*%29%29%3F%28%5B%5E%3F%23%5D*%29%28%5C%3F%28%5B%5E%23%5D*%29%29%3F%28%23%28.*%29%29%3F)
    + $1$3$5$6$8
        + $1 = $2:
        + $3 = //$4
        + $6 = ?$7
        + $8 = #$9
    + Meaning
        + scheme    = $2 `([^:/?#]+)`   (Optional)
        + authority = $4 `([^/?#]*)`    (Optional)
        + path      = $5 `([^?#]*)`
        + query     = $7 `([^#]*)`      (Optional)
        + fragment  = $9 `(.*)`         (Optional)

#### IPv6

```
IPv6address =                            6( h16 ":" ) ls32
            /                       "::" 5( h16 ":" ) ls32
            / [               h16 ] "::" 4( h16 ":" ) ls32
            / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
            / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
            / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
            / [ *4( h16 ":" ) h16 ] "::"              ls32
            / [ *5( h16 ":" ) h16 ] "::"              h16
            / [ *6( h16 ":" ) h16 ] "::"
ls32        = ( h16 ":" h16 ) / IPv4address
            ; least-significant 32 bits of address
h16         = 1*4HEXDIG
            ; 16 bits of address represented in hexadecimal
```

+ See more in [Related Link - IP]
