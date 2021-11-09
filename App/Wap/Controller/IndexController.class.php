<?php
namespace Wap\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        $this->show('<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} body{ background: #fff; font-family: "微软雅黑"; color: #333;font-size:24px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.8em; font-size: 36px } a,a:hover{color:blue;}</style><div style="padding: 24px 48px;"> <h1>:)</h1><p>欢迎使用 <b>ThinkPHP</b>！</p><br/>版本 V{$Think.version}</div><script type="text/javascript" src="http://ad.topthink.com/Public/static/client.js"></script><thinkad id="ad_55e75dfae343f5a1"></thinkad><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script>','utf-8');
    }
    public function listTime () {
        $this->display('List/queryTime');
    }
    public function jqueryWaterfall () {
        $this->display('WaterfallFlow/jqueryWaterfall/index');
    }
    public function jqueryWaterfall2 () {
        $this->display('WaterfallFlow/jqueryWaterfall/index2');
    }
    public function tabScroll () {
        $this->display('Scroll/tabScroll');
    }

    // region 地图插件
    public function mapBaidu () {
        $this->display('Map/baidu/index');
    }
    public function pickupXX () {
        $this->display('Map/baidu/pickup_xx');
    }
    // 腾讯地图
    public function mapTencent () {
        $this->display('Map/tencent/index');
    }
    public function mapTencent4 () {
        $this->display('Map/tencent/index4');
    }
    // endregion
}