var fs = require('fs');
var AFileName = '../../1.node初识.txt', BFileName = '../../2.Node编程基础-模块.txt', CFileName = '../../1.node初识.txt';
// 定义next函数
function next(err, result) {
    if (err) throw err;
    var currentTask = tasks.shift();
    if(currentTask) {
        currentTask(result);
    } else {
        console.log(result);
    }
}

function readA() {
    fs.exists(AfileName, function(exists) {
        if (!exists) {
            return next(new Error( AFileName + 'not exist'));
        }
        next(null, BFileName);
    })
}
function readB(BFileName) {
    fs.exists(BFileName, function(exists) {
        if (!exists) {
            return next(new Error( BFileName + 'not exist'));
        }
        next(null, CFileName);
    })
}
function readB(CFileName) {
    fs.exists(CFileName, function(exists) {
        if (!exists) {
            return next(new Error( CFileName + 'not exist'));
        }
        next(null, 'success');
    })
}

var tasks = [readA, readB, readC];
next();