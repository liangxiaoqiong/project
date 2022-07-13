<?php
namespace Wap\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
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

    public function diyTheme () {
        $this->display('Theme/index');

    }
    public function diyTheme2 () {
        $this->display('Theme/index2');
    }
}