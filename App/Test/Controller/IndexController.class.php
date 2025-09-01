<?php
namespace Test\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    }
    /*region 定向横向滚动条*/
    public function scroll_x(){
        $this->display('Scroll/scroll_x');
    }

    public function vue_seamless_scroll () {
        $this->display('Scroll/vue_seamless_scroll/index');
    }
    /*endregion*/
    /*region 计算器*/
    public function calculator(){
        $this->display('calculator/vue');
    }
    public function calculator2(){
        $this->display('calculator/vue2');
    }
    public function calculator3(){
        $this->display('calculator/vue3');
    }
    /*endregion*/
}
