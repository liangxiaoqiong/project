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
    /*endregion*/
}
