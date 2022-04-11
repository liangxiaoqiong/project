<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index()
    {
        $menu_list = Array(
            [
                'action'=>'',
                'id'=>'0',
            ]
        );
        $this->assign('menu', $menu_list);//顶部一级菜单，该项目未显示一级菜单
        $this->display();
    }
    public function getMenu($pid = 0)
    {
        $menu_list = getDefaultData('json/menu/admin');//左侧二级菜单
        $menu_json = json_encode($menu_list);
        exit($menu_json);
    }

    // 修改密码
    public function editPassword () {
        $this->display('User/editPassword');
    }

    // 组件说明
    public function component () {
        $this->display('Explain/component');
    }
    public function color () {
        $this->display('Component/color');
    }
    public function font () {
        $this->display('Component/font');
    }
    public function icon () {
        $this->display('Component/icon');
    }
    public function pagination () {
        $this->display('Component/pagination');
    }
    public function filters () {
        $this->display('Component/filters');
    }
    public function copy () {
        $this->display('Component/copy');
    }
    public function tableLoadEmpty () {
        $this->display('Component/tableLoadEmpty');
    }
    public function searchDemo () {
        $this->display('Component/searchDemo');
    }
    public function listRowUl () {
        $this->display('Component/listRowUl');
    }
    public function tipBox () {
        $this->display('Component/tipBox');
    }

    // region 表单Form
    public function input () {
        $this->display('Form/baseComponent/input');
    }
    public function textarea () {
        $this->display('Form/baseComponent/textarea');
    }
    public function button () {
        $this->display('Form/baseComponent/button');
    }
    public function radio () {
        $this->display('Form/baseComponent/radio');
    }
    public function checkbox () {
        $this->display('Form/baseComponent/checkbox');
    }
    public function select () {
        $this->display('Select/index');
    }
    public function selectText1 () {
        $this->display('Select/text/disabledFake');
    }
    public function switch () {
        $this->display('Form/baseComponent/switch');
    }
    public function cascader () {
        $this->display('Form/baseComponent/cascader');
    }
    public function cascaderIndex () {
        $this->display('Cascader/index');
    }
    // region 日期
    public function date () {
        $this->display('Date/index');
    }
    public function dateGranularity () {
        $this->display('Date/dateGranularity');
    }
    // endregion

    // region 区域地址
    public function region () {
        $this->display('Region/index');
    }
    // endregion
    public function upload () {
        $this->display('Form/baseComponent/upload');
    }
    public function colorPicker () {
        $this->display('Form/baseComponent/colorPicker');
    }
    public function slider () {
        $this->display('Form/baseComponent/slider');
    }
    public function basicDl () {
        $this->display('Form/baseComponent/basicDl');
    }
    public function formRow () {
        $this->display('Form/baseComponent/formRow');
    }
    // endregion

    // 弹框 Layer
    public function contentPopover () {
        $this->display('Layer/baseComponent/contentPopover');
    }
    public function imgPopover () {
        $this->display('Layer/baseComponent/imgPopover');
    }
    public function dialog () {
        $this->display('Layer/baseComponent/dialog');
    }
    public function messageBox () {
        $this->display('Layer/baseComponent/messageBox');
    }
    public function message () {
        $this->display('Layer/baseComponent/message');
    }
    // endregion

    // region 地图[百度地图、谷歌地图]
    public function mapIndex () {
        $this->display('Map/index');
    }
    // endregion

    // region 图表[echart、进度条]
    public function progressIndex () {
        $this->display('Progress/index');
    }
    // endregion

    public function tabNav () {
        $this->display('Nav/tabNav');
    }
    public function tabBox () {
        $this->display('Nav/tabBox');
    }
    // region 表格
    public function tableDefault () {
        $this->display('Table/tableDefault');
    }
    public function tableDefaultPage () {
        $this->display('Table/tableDefaultPage');
    }
    public function tableDefaultPageSearch () {
        $this->display('Table/tableDefaultPageSearch');
    }
    public function tableElDiy () {
        $this->display('Table/elTable/index');
    }
    // 自定义合并列样式
    public function tableElMergeColumns () {
        $this->display('Table/elTable/index_merge_columns');
    }
    // endregion

    // region 编辑器[富文本编辑器、自定义diy编辑器]
    public function ueditorDemo () {
        $this->display('Editor/ueditorDemo');
    }
    public function ueditorDemo2 () {
        $this->display('Editor/ueditorDemo2');
    }
    public function printTplList () {
        $this->display('PrintTpl/printTplList');
    }
    public function printTplInfo () {
        $req = I('GET.');
        $this->assign('req', $req);
        $this->display('PrintTpl/printTplInfo');
    }
    public function printTplPrint () {
        $req = I('GET.');
        $this->assign('req', $req);
        $this->display('PrintTpl/print');
    }
    // endregion

    public function diyTheme () {
        $this->display('Theme/index');

    }
    public function diyTheme2 () {
        $this->display('Theme/index2');
    }

    public function addTab () {
        $this->display('Component/addTab');
    }
    public function changeHash () {
        $this->display('Href/change_hash');
    }
}