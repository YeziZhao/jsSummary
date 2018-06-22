var net = require('net');
var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
// 定义发布对象和订阅对象
channel.clients = {};
channel.subscriptions = {};

// 定义join事件发射器：保存用户的client对象，以便程序将数据发送给用户
channel.on('join', function(id, client) {
    console.log('join', id, client);
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message) {
        console.log('broadcast', senderId, message);
        if(id != senderId) {
            this.clients[id].write(message);
        }
    };
    // 添加一个专门正对当前用用户的broadcast事件监听器
    this.on('broadcast', this.subscriptions[id]);
});
channel.on('leave', function(id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcaset', id, id + 'has left the chat.');
});

// 当有用户连接服务器的时候发出一个join事件，指明用户id和client对象 
var server = net.createServer(function(client) {
    var id = client.remoteAddress + ":" + client.remotePort;

    console.log('连接触发');
    channel.emit('join', id, client);
    
    // 当用户发送消息数据时，发出一个平道broadcaset事件，指明用户ID和消息
    client.on('data', function(data) {
        console.log('data触发', data);
        channel.emit('broadcaset', id, data.toString());
    });
    client.on('close', function() {
        console.log('leave触发');
        channel.emit('leave', id);
    });
});
server.listen(3000);