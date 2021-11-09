<?php
// 定义状态码
define('CODE_SUCCESS', 200); // 请求成功
define('CODE_LOGIN_SUCCESS', 201); // 登录成功后跳转
define('CODE_PASSWORD_SUCCESS', 202); // 跳转到输入密码页面
define('CODE_REDIRECT', 301); // 请求后直接重定向
define('CODE_ERROR', 406); // 请求失败
define('CODE_LOGOUT', -999); // 登录过期 提示过期后会重定向
define('CODE_NOT_FOUND', 404); // 不存在
define('CODE_SQL_ERROR', 500); // 数据库错误
/**
 * 获取默认数据
 * @param string $relativePath
 * @param string $ext
 * @return array
 * User: hjun
 * Date: 2018-09-12 09:30:31
 * Update: 2018-09-12 09:30:31
 * Version: 1.00
 */
function getDefaultData($relativePath = '', $ext = 'json')
{
    $rootPath = realpath(COMMON_PATH . '/Default/') . '/';
    $path = "{$rootPath}$relativePath.{$ext}";
    $data = file_get_contents($path);
    if ($ext === 'json') {
        $data = jsonDecodeToArr($data);
    } elseif ($ext === 'php') {
        $data = unserialize($data);
    }
    return $data;
}

/**
 * 将数据解析成数组
 * @param string $data
 * @return array
 * User: hjun
 * Date: 2018-05-03 10:32:45
 * Update: 2018-05-03 10:32:45
 * Version: 1.00
 */
function jsonDecodeToArr($data = '')
{
    $data = json_decode($data, 1);
    return empty($data) ? [] : $data;
}