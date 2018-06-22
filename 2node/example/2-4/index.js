var events = require('events');
var util = require('util'); // Node的内置模块
var fs = require('fs');
var watchDir = '../2-3';
var progressDir = '../2-1';

// 类的构造器
function Watcher(watchDir, progressDir) {
    this.watchDir = watchDir;
    this.progressDir = progressDir;
}
// 继承事件发射器：等价于Watcher.prototype = new events.EventEmitter();
util.inherits(Watcher, events.EventEmitter);

// 添加拓展方法
// watch: 循环遍历目录，处理其中的所有文件
Watcher.prototype.watch = function() {
    console.log('watch');
    var watcher = this;
    fs.readdir(watchDir,"utf8",  function(error, files) {
        console.log(files);
        if (error) throw error;
        for(var index in files) {
            console.log(files[index]);
            watcher.emit('process', files[index]);
        }
    } );
};
// start: 启动对目录的监控，监控用到了Node的fs.watchFile方法（当监控的目录中有事情发生时，watch就会被触发，循环遍历受监控的目录，并对其每一个文件发出progress事件）
Watcher.prototype.start = function() {
    var watcher = this;
    fs.watchFile(watchDir, function() {
        console.log("-----");
        watcher.watch();
    });
}

// 创建一个Watcher对象
var watcher = new Watcher(watchDir, progressDir);
// 添加watcher的progress发射器处理事件
watcher.on('process', function(file) {
    // 获取完整目录
    var watchFile = this.watchDir + '/' + file;
    var progressFile = this.progressDir + '/' + file.toLowerCase();
    console.log(progressFile);
    fs.rename(watchFile, progressFile, function(err) {
        if (err) throw err
    });
});
watcher.start();