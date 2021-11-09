var componentGroup = {
  "code": 200,
  "msg": "所有的的组件类型列表",
  "data": [
    {
      component_name:'基础组件',
      component_list:[
        {
          module_type: 10, // 模块标识 = 商品模块
          module_name: '商品模块', // 模块标识 = 商品模块
          content: {
            goods_source:0,//商品来源（0：商品分类，1：商品标签）
            source_id:'',//商品分类id，商品标签id
            goods_num:6,//显示的商品个数
            list_style:0,//列表样式（0：一行两个，1：一行三个，2：横向滑动）
            show_style:0,//显示样式([0:不留白直角，1:留白圆角](0：一行两个，1：一行三个时状态),2:极简（2：横向滑动时状态）)
            show_goods_name:1,//显示商品名称（0：不显示，1：显示）
            show_goods_price:1,//显示商品价格（0：不显示，1：显示价格[显示原价和现价],2:只显示现价）
            buy_btn_style:1,//购买按钮样式（0：不显示，1：样式1，2：样式3,3：样式3）
            corner_mark_type:0//角标类型（0：不显示，1：新品，2：热卖，3：NEW，4：HOT）
          }
        },
        {
          module_type: 11, // 模块标识 = 图片广告
          module_name: '图片广告', // 模块标识 = 图片广告
          content: {
            selected_img_module: 0,//选择的图片广告模版:(0:轮播海报，1：一行一个)
            img_module: [
              //0:轮播海报
              {
                btn_style: 0,//按钮形状（0：长方形，1：正方形，2：圆形）
                btn_position: 0,//按钮位置(0:按钮居左，1：按钮居中，2：按钮居右)
                btn_color: '#fe3434',//按钮颜色()
              },
              {
                img_gap:0,//图片间隙 (单位：px像素)
              }
            ],
            img_list:[/*{img_url:'',img_size:['50','100'],action:'no_action',action_data:'',sort:0}*/],//图片广告列表[图片url,图片尺寸|单位px:[宽，高],跳转参数,拖拽排序]
          }
        },
        {
          module_type:12,//模块标识
          module_name: '图片魔方', // 模块标识 = 图片魔方
          content:{
            cube_module:0,//选择模板(0:一行2个，1:一行3个，2:一行4个，3：2左2右，4：1左2右，5：1上2下，6：1左3右，7：自定义)
            img_list:[{img_url:'',action:'no_action',action_data:''}],//魔方图片列表[图片url,,跳转参数,拖拽排序]
            img_gap:0,//图片间隙 (单位：px像素)
            cube_density:"4",//魔方密度（4:4*4，5：5*5，6:6*6,7:7*7）//自定义时
            cube_layout:{
              div_id: 1000,// div的唯一标识
              allPickMatrixImg:0,//allPickMatrix里是否有图片[0/1]
              allPickMatrix: [
                {
                  "div_id": 1010,
                  "top": "64px",
                  "left": "128px",
                  "width": "128px",
                  "height": "128px",
                  "top2": "20%",
                  "left2": "40%",
                  "width2": "40%",
                  "height2": "40%",
                  "img_url":"",//图片
                  "action":"",
                  "action_data":"",
                  "text": "300x300像素",
                  "matrix": [{
                    "x": 2,
                    "y": 1,
                    "is_selected": true,
                    "is_selecting": false,
                    "width": "64.0000px",
                    "height": "64.0000px",
                    "width2": "20%",
                    "height2": "20%"
                  }, {
                    "x": 2,
                    "y": 2,
                    "is_selected": true,
                    "is_selecting": false,
                    "width": "64.0000px",
                    "height": "64.0000px",
                    "width2": "20%",
                    "height2": "20%"
                  }, {
                    "x": 3,
                    "y": 1,
                    "is_selected": true,
                    "is_selecting": false,
                    "width": "64.0000px",
                    "height": "64.0000px",
                    "width2": "20%",
                    "height2": "20%"
                  }, {
                    "x": 3,
                    "y": 2,
                    "is_selected": true,
                    "is_selecting": false,
                    "width": "64.0000px",
                    "height": "64.0000px",
                    "width2": "20%",
                    "height2": "20%"
                  }],
                }
              ], // 所有选中的矩阵
              matrix:{}, // 界面显示的矩阵
            }//布局
          }

        },
        {
          module_type:13, //模块标识 = 按钮导航
          module_name:'按钮导航',
          content: {
            btn_num:4,//按钮数量(4:四个按钮,5:五个按钮)
            bg_color:'#fefefe',//背景颜色
            text_color:'#323232',//文字颜色
            btn_list:[/*{img_url:'',btn_text:'按钮',action:'no_action',action_data:'',sort:0}*/],
          }
        },
        {
          module_type:14,//商品分组
          module_name:'商品分组',
          content:{
            menu_style:0,//菜单样式(0：样式1，1：样式2，2：样式3)
            menu_type:0,//菜单类型(0：固定2组，1：固定3组，2：固定4组，3：滑动式)
            menu_list:[
           /* {
              menu_name:'分组',//菜单名称
              goods_source:0,//商品来源（0：商品分类，1：商品标签）
              source_id:'',//商品分类id，商品标签id
              goods_num:6//显示的商品个数
              }*/
            ],
            list_style:0,//列表样式（0：一行两个，1：一行三个，2：横向滑动）
            show_style:0,//显示样式([0:不留白，1:留白](0：一行两个，1：一行三个时状态),2:极简（2：横向滑动时状态）)
            show_goods_name:1,//显示商品名称（0：不显示，1：显示）
            show_goods_price:1,//显示商品价格（0：不显示，1：显示）
            buy_btn_style:1,//购买按钮样式（0：不显示，1：样式1，2：样式3,3：样式3）
            corner_mark_type:0//角标类型（0：不显示，1：新品，2：热卖，3：NEW，4：HOT）
          }
        }
      ]
    },
    {
      component_name:'营销组件',
      component_list:[
        {
          module_type:15, //优惠券
          module_name:'优惠券',
          content: {
            coupon_style:0,//样式（0：样式1，1：样式2,2：样式3）
            coupon_color:0,//券颜色:（0[#e02f25],1[#f9454e],2[#fff9ed],3[#e84604],4[#02b363]）
            bg_color:'#f7f7f7',//背景颜色
            more_set:["0"],//更多设置([0]0:隐藏抢完的券)
          }
        },
        {
          module_type:16, //限时抢购
          module_name:'限时抢购',
          content: {
            goods_num:6 //显示商品个数
          }
        },
        {
          module_type:17, //团购
          module_name:'团购',
          content: {
            goods_num:6 //显示商品个数
          }
        },
        {
          module_type:18, //新品推荐
          module_name:'新品推荐',
          content: {
            title_name:'',//标题名称
            goods_num:2 //显示商品个数
          }
        }
      ]
    },
    {
      component_name:'其他',
      component_list:[
        {
          module_type:19, //搜索框
          module_name:'搜索框',
          content: {
            search_style:0//搜索样式（0：灰底白框，1：白底灰框）
          }
        },
        {
          module_type:20, //公告
          module_name:'公告',
          content: {
            btn_type:0,//按钮类型（0：极简式，1：独立式）
            bg_color:'#fefefe',//背景颜色
            text_color:'#323232',//文字颜色
            icon_color:'#fe7e7e'//图标颜色
          }
        },
        {
          module_type:21, //辅助线
          module_name:'辅助线',
          content: {
            line_color:'#e5e5e5',//颜色
            line_margin:0,//边距(0：无边距,1：左右留白)
            line_style:0,//样式(0：实线,1：虚线)
          }
        },
        {
          module_type:22, //辅助空白
          module_name:'辅助空白',
          content: {
            blank_color:'#f2f2f2',//颜色
            blank_height:10,//空白高度
          }
        },
        {
          "module_type":23,
          "module_name":"在线客服",
          "content": {
            "module_text":"在线客服",//文案
          }
        },
        {
          module_type:24, //自定义模块||暂时不需要
          module_name:'自定义模块',
          content: {
            custom_module_id:[]
          }
        }
      ]
    }
  ]
}
//同componentGroup一样，只是多了【module_id，sort】
var previewController = {
  "code": 200,
  "msg": "左侧展示的数据列",
  "customer_msg":{
    "btn_text":'在线客服',//文案（显示在线客服按钮文字）
    "is_add":0,//是否已添加在线客服[0/1]
  },
  "data": {
    //同componentGroup大致一样，只是多了【module_id，sort】
    st_content: [{
      module_id: 1,//模块id
      sort: 1// 排序 保证在最后面
    }],
  }
}
//select (同专题页一致)
var select = {
  tag_goods: [],
    class_goods: []
}
//linkOption获取跳转链接数据===admin.php?c=System&a=ajaxGetAdLinkOption
var linkOption = {}