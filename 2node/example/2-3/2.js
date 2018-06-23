var net = require('net');
var fs = require('fs');
var server = net.createServer(function(client) {
    client.on('data', function(data) {
        fs.writeFile('./a.txt', data, 'utf-8',function(err) {
            if (err) {
                console.log('err', err);
            };
            console.log('success');
        });
    });
    client.on('close', function() {
        console.log('leave触发');
    });
});
server.listen(3000);