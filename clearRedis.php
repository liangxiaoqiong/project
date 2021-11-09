<?php

if (version_compare(PHP_VERSION, '5.3.0', '<')) {
    die('require PHP > 5.3.0 !');
}

function GupdateVersion()
{
    $path = __DIR__ . '/GLOBAL/global.php';
    $content = file_get_contents($path);
    preg_match_all('/define.*[\'"](\w+)[\'"].*((?<=[\'"]).+(?=[\'"])|true|false)/im',$content,$matches,PREG_SET_ORDER);
    foreach ($matches as $data) {
        if ($data[1] === 'EXTRA_VERSION') {
            $version = $data[2];
            $newVersion = $version + 0.01;
            $content = str_replace("define('EXTRA_VERSION', '{$version}')", "define('EXTRA_VERSION', '{$newVersion}')", $content);
            file_put_contents($path, $content);
            break;
        }
    }
}
GupdateVersion();

require 'GLOBAL/global.php';

define('BIND_MODULE', 'Super');
define('BIND_CONTROLLER', 'Test');
define('BIND_ACTION', 'clearCache');
defined('APP_PATH') or define('APP_PATH', "./App/");

//require 'vendor/autoload.php';
require THINK_PATH . 'ThinkPHP.php';
