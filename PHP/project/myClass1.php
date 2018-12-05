<?php
$var1 = [1,2,3];
$var2 = & $var1;
$var2[0] = 20;
var_dump($var1);