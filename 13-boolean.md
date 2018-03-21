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



