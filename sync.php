<?php

// 检测PHP环境
if (version_compare(PHP_VERSION, '5.3.0', '<')) {
	die('require PHP > 5.3.0 !');
}

require 'GLOBAL/global.php';

define('BIND_MODULE', 'Api');
require THINK_PATH . 'ThinkPHP.php'; //加载ThinkPHP框架
