<?php
$str = get_include_content('./vars.php');

function get_include_content($filename) {
    if (is_file($filename)) {
        ob_start();
        include $filename;
        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }
    return false;
}
echo "hello: ".$str;