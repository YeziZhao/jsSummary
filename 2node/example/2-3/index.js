var http = require('http');
var url = require('url');
var qs = require('querystring');
var items = []; // 用于存放所有添加的数据
// 处理get请求
function show(res) {
    var content = items.map(function(item, i) {
        return `<li>${item}</li>`;
    }).join('');
    var html = `<html>
        <head>
            <title>todo list</title>
        </head>
        <body>
            <h1>ToDo List</h1>
            <ul>
                ${content}
            </ul>
        </body>
    </html>`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

//  errorDeal
function errorDeal(res, code, text) {
    res.setStatus = code;
    res.setHeader('Content-Type', 'text/plain');
    res.end(text);
}

// add item
function add(req, res) {
    var body = '';
    req.setEncoding('utf-8');
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        var obj = qs.parse(body); 
        console.log('----------', obj);
        items.push(obj.item);
        show(res);
    });
}
var server = http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
     if ('/' === path) {
        switch(req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
           default:
           errorDeal(res, 400, 'Bade Request');
        }
     } else {
        errorDeal(res, 404, 'Not found');
     }
}).listen(3000);
console.log('server start');