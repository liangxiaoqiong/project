<?php

$mode = defined('MODE') ? MODE : 'common';
return array(
    // ==========================================    通用设置    ========================================================
    /* 默认设定 */
    'DEFAULT_MODULE' => 'Wap',  // 默认模块
    'DEFAULT_FILTER' => 'trim',  // 默认参数过滤方法 用于I函数...

    /*数据库设置*/
    'DB_PARAMS' => array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL),

    /* 错误设置 */
    'ERROR_MESSAGE' => '页面错误！请稍后再试～',  //错误显示信息,非调试模式有效
    'ERROR_PAGE' => '',  // 错误定向页面

    /* SESSION设置 */
    'SESSION_AUTO_START' => true,    // 是否自动开启Session
    'SESSION_OPTIONS' => [
        'expire' => 3600 * 24 * 30,
    ],

    /* URL设置 */
    'URL_CASE_INSENSITIVE' => false,  // 默认false 表示URL区分大小写 true则表示不区分大小写
    'URL_MODEL' => 0,  // URL访问模式,可选参数0、1、2、3,代表以下四种模式 0 (普通模式); 1 (PATHINFO 模式); 2 (REWRITE  模式); 3 (兼容模式)  默认为PATHINFO 模式

    /*语言包*/
    'LANG_SWITCH_ON' => true, // 开启语言包功能
    'LANG_AUTO_DETECT' => true, // 自动侦测语言 开启多语言功能后有效
    'LANG_LIST' => 'zh-cn,en-us', // 允许切换的语言列表 用逗号分隔
    'VAR_LANGUAGE' => 'l', // 默认语言切换变量

    /*模版替换*/
    'TMPL_PARSE_STRING' => array(
        '__COMMON_IMG__' => '/Public/common/img',
        '__COMMON_CSS__' => '/Public/common/css',
        '__COMMON_JS__' => '/Public/common/js',
        '__COMMON_ICON__' => '/Public/common/icon',
        '__WAPCSS__' => '/Public/wap/css',
        '__WAPIMG__' => '/Public/wap/img',
        '__WAPJS__' => '/Public/wap/js',
        '__STYLE__' => '/Public/wap/css/common/style.css',
        '__MCSS__' => '/Public/mcss',
        '__MIMG__' => '/Public/mimages',
        '__MJS__' => '/Public/mjs',
        '__ADMIN_CSS__' => '/Public/admin/css',
        '__ADMIN_IMG__' => '/Public/admin/img',
        '__ADMIN_JS__' => '/Public/admin/js',
        '__ADMIN_EXT__' => '/Public/admin/ext',
        '__ADMIN__' => '/Public/admin',
        // plug-in
        '__JQUERY__' => '/Public/common/js/plug-in/jquery/jquery-3.2.1.min.js',
        '__JQUERYUI_CSS__' => '/Public/common/js/plug-in/jquery-ui/jquery-ui.min.css',
        '__JQUERYUI_JS__' => '/Public/common/js/plug-in/jquery-ui/jquery-ui.min.js',
        '__ELEMENTUI_CSS__' => '/Public/common/js/plug-in/element-ui/2.4.3/lib/theme-chalk/index.css',
        '__ELEMENTUI_JS__' => '/Public/common/js/plug-in/element-ui/2.4.3/lib/index.js',
        //element-ui最新版本
        '__ELEMENTUI_CSS_NEWEST__' => '/Public/common/js/plug-in/element-ui/2.13.2/theme-chalk/index.css',
        '__ELEMENTUI_JS_NEWEST__' => '/Public/common/js/plug-in/element-ui/2.13.2/index.js',
        '__LAYUIJS__' => '/Public/common/js/plug-in/layui/layui.js',
        '__LAYUICSS__' => '/Public/common/js/plug-in/layui/css/layui.css',
        '__VUE_NEWEST__' => '/Public/common/js/plug-in/vue-2.x/vue-2.6.11.js?v=' . EXTRA_VERSION,
        '__SWIPERJS__' => '/Public/common/js/plug-in/swiper/swiper.min.js',
        '__SWIPERCSS__' => '/Public/common/js/plug-in/swiper/swiper-3.4.2.min.css',
        '__LAYER_JS__' => '/Public/common/js/plug-in/layer/layer.js',
        '__APP_UTIL__' => '/Public/common/js/plug-in/vjdutil-1.0/AppUtil.js?v=' . EXTRA_VERSION,
        '__V_CLOAK__' => '/Public/common/css/v-cloak.css',
        '__LAY_DATE__' => '/Public/common/js/plug-in/laydate/laydate.js',
        '__UE-EDITOR__' => '/Public/common/js/plug-in/ueditor/ueditor.all.min.js',
        '__UE-EDITOR-CONFIG__' => '/Public/common/js/plug-in/ueditor/ueditor.config.js',
        '__VEE-VALIDATE__' => 'https://unpkg.com/vee-validate@2.0.0-rc.7/dist/vee-validate.min.js',
        '__PUBLIC_WAP__' => '/Public/wap/js/common/publicWap.js?v=' . EXTRA_VERSION,
        '__CUSTOMER_MSG__' => '/Public/common/customerMsg',
        '__DIY_CSS__' => '/Public/admin/css/Diy/diy.css?v=' . EXTRA_VERSION,
        '__VANT_CSS__' => '/Public/common/js/plug-in/vant/2.12/lib/index.css',
        '__VANT_JS__' => '/Public/common/js/plug-in/vant/2.12/lib/vant.min.js',
        '__VANT_JS_EN-US__' => '/Public/common/js/plug-in/vant/2.12/lib/vant_en-us.min.js',
    ),

    /*缓存设置*/
    'DATA_CACHE_TIME' => 0, // 缓存30分钟

    /*上传设置*/
    'IMG_ROOT_PATH' => './images/',
    'upload_type' => 'local',
    'up_bucket' => '',
    'up_form_api_secret' => '',
    'up_username' => '',
    'up_password' => '',
    'up_domainname' => '',
    'up_exts' => 'jpeg,jpg,png,mp3',
    'up_size' => '20480',
    'up_path' => './data/upload',
    'connectnum' => '系统维护中',

    /*定时任务执行时间设置*/
    'TASK_INTERVAL' => [
        'collect_img' => 1800,
        'refresh_goods' => 50,
        'clear_coupons_center_today_num' => 24 * 3600 - 50,
        'clear_coupons_channel_today_num' => 24 * 3600 - 50,
        'clear_today_service_num' => 24 * 3600 - 50,
        'message_tip' => 50,
        'set_mj_flag' => 50,
        'add_group_order' => 50,
        'rollback_group_order_goods' => 50,
        'refresh_goods_qianggou' => 3600,
        'refresh_header_status' => 50,
        'add_header_order' => 50,
        'rollback_header_order_goods' => 50,
        'refresh_vip_status' => 50,
        'refresh_group_status' => 50,
        'sync_agent_recommend_record' => 1800,
        'sync_frequently_bought_list' => 50,
        'sync_depot_goods_stock' => 50,
    ],

    /*杂项*/
    'jsver' => 1487139154,
    'DY_PRICE_NUM' => [0, 0, 0, 2, 10, 0, 0], // 自定义价格表的数量 按照套餐等级设置
    'API_SIGN_KEY' => 'vjd8988998', // 接口签名
    'JWT_KEY' => 'wjd', // JWT加密key
    'API_SIGN_TIME' => 60, // 防止重放攻击
    'LAT_LNG_TIME_OUT' => 3600 * 7, // 经纬度失效时间(存在cookie中)
    'DB_CACHE_ON' => false, // 默认开启缓存机制
    'DB_CACHE_MAP_TYPE' => 1, // 数据库缓存的映射的存储类型 0-使用数据库存 1-使用数组存

    'AUTOLOAD_NAMESPACE' => array(
        'JsonSchema' => VENDOR_PATH . 'JsonSchema',
    ),

    // =======================================    根据环境的而不同配置不同的配置    =======================================
    'LOAD_EXT_CONFIG' => "config.change,config.{$mode}", // 加载扩展配置文件
);