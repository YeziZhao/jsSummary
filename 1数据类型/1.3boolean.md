转换规则

boolean是一种原始类型，所有的数据类型可以通过Boolean\(\)函数转换为boolean值。转换规则如下。

| 数据类型 | 转换规则 |
| :--- | :--- |
| boolean | true, false |
| number | Boolean\(0\) =&gt; false, 其他为true |
| NaN | Boolean\(NaN\) =&gt; false |
| string | Boolean\(""\) =&gt; false, 其他为true |
| undefined, null | false |
| object | true |

使用场景

if else 判断语句

boolean值的使用，一般是在if else的判断语句中。非boolean的类型的值在判断语句中会自动转为boolean值（按以上规则）。

短路符号

```
var a = "true";
var b = "false";
var c = a || b;   // true
```



