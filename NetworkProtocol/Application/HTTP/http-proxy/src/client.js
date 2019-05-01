var http = require('http');

var options2 = {
    hostname : '127.0.0.1',
    port     : 8888,
    path     : 'studyzy.cnblogs.com:80',
    method     : 'CONNECT'
};

var options3 = {
    hostname : '127.0.0.1',
    port     : 8889,
    path     : 'studyzy.cnblogs.com:80',
    method     : 'CONNECT'
};

var options = {
    hostname : '127.0.0.1',
    port     : 8888,
    path     : '127.0.0.1:8889',
    method     : 'CONNECT'
};

var req = http.request(options);

req.on('connect', function(res, socket) {
    socket.write('CONNECT studyzy.cnblogs.com:80 HTTP/1.1\r\n' +
                 'Host: 127.0.0.1:8889\r\n' +
                 'Connection: Close\r\n' +
                 '\r\n');
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: studyzy.cnblogs.com\r\n' +
                 'Connection: Close\r\n' +
                 '\r\n');

    socket.on('data', function(chunk) {
        console.log(chunk.toString());
    });

    socket.on('end', function() {
        console.log('socket end.');
    });
});

req.end();