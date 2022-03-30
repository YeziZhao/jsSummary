## 1.html
实测很好用： https://blog.csdn.net/cityhunter_y/article/details/94438440

```html
<!-- 要复制的内容 -->
<input type="text" name="username" id="username" value="user1">
<!-- 复制按钮,点击复制按钮触发copyText()方法 -->
<button id="copyButton" class="btn" οnclick="copyText()"></buttton>
```

## JS
```javascript
$(function() {
 
});
// 点击复制按钮触发的方法
function copyText() {
    // 获得到要复制的文本内容
    var copyText = $("#username").val();
    // 判断是否为ie浏览器，此方法只对IE浏览器有用
    if (window.clipboardData) {
       // 清除原有剪切板的数据
       window.clipboardData.clearData();
       // 将内容复制到剪切板
       window.clipboardData.setData("Text", copyText);
       alert("已成功复制！");	  
    // 其它浏览器,用别的方法
    } else {
       // 创建一个input对象
       var oInput = document.createElement('input');
       // 赋值
       oInput.value = copyText;
       // 添加到页面的body下
       document.body.appendChild(oInput);
       // 选择对象
       oInput.select();
       // 执行浏览器复制命令  
       document.execCommand("Copy");
       // 隐藏内容 
       oInput.className = 'oInput';
       oInput.style.display = 'none'; 
   }

// jquery version
if (window.clipboardData) {
   window.clipboardData.clearData();
   window.clipboardData.setData("Text", copyText);
} else {
   var oInput = document.getElementById('oInput');
   if (!oInput) {
         oInput = $('<input id="oInput" value="'+ copyText  +'"/>');
         $('body').append(oInput);
   } else {
         oInput = $(oInput);
   }
   oInput.select();
   document.execCommand("Copy");
   document.activeElement.blur(); // 处理ios keybaord弹出
}
```

https://josephkhan.me/javascript-copy-clipboard-safari/
```javascript
function copyToClipboard(textToCopy) {
  var textArea;

  function isOS() {
    //can use a better detection logic here
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.readOnly = true;
    textArea.contentEditable = true;
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range, selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyTo() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  createTextArea(textToCopy);
  selectText();
  copyTo();
}
```


## 自己版本
```javascript


class CopyUtil {
    private textArea: any = document.createElement('textArea');;

    createTextArea (text: string) {
        this.textArea.readOnly = true;
        this.textArea.contentEditable = 'true';
        this.textArea.value = text;
        this.textArea.setAttribute('style', 'position: fixed;top:0;left:0;');
        document.body.appendChild(this.textArea);
    }

    isOS () {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    selectText () {
        if (this.isOS()) {
            let editable = this.textArea.contentEditable;
            let readOnly = this.textArea.readOnly;
            this.textArea.readOnly = 'false';

            this.textArea.focus();
            this.textArea.select();

            let range = document.createRange();
            range.selectNodeContents(this.textArea);
            let sel: any = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            this.textArea.setSelectionRange(0, 999999);

            this.textArea.contentEditable = editable;
            this.textArea.readOnly = readOnly;
        } else {
            this.textArea.select();
        }
    }

    copyTo () {
        document.execCommand('copy');
        document.body.removeChild(this.textArea);
    }

    copyToClipboard (text: string) {
        try {
            navigator.clipboard.writeText(text).then(() => {
                console.log('navigator.clipboard : copy');
            });
        } catch (error) {
            this.createTextArea(text);
            this.selectText();
            this.copyTo();
            console.log('document.execCommand: copy');
        }
    }

    copy (e: any, text: string) {
        e.preventDefault();
        const clipboardData = this.getClipboardData(e);
        if (clipboardData) {
            clipboardData.clearData();
            clipboardData.setData("Text", text);
        } else {
            this.copyToClipboard(text);
        }
    }

    getClipboardData (e: any) {
        let clipboardData = (window as any).clipboardData;
        if (!clipboardData) {
            clipboardData = e.originalEvent.clipboardData;
        }
        return clipboardData;
    }
}

export default new CopyUtil();

```