var fs = require('fs');
var AFileName = './index.js', BFileName = './template.html', CFileName = './title.json';
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
    fs.exists(AFileName, function(exists) {
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
function readC(CFileName) {
    fs.exists(CFileName, function(exists) {
        if (!exists) {
            return next(new Error( CFileName + 'not exist'));
        }
        next(null, 'success');
    })
}

var tasks = [readA, readB, readC];
next();