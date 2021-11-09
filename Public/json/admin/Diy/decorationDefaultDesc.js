var decoration={
    //轮播|图片广告
    ad_img:{
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
    },
    //按钮导航
    btn_nav:{
      bg_color:'#fefefe',//背景颜色
      text_color:'#323232',//文字颜色
      btn_list:[/*{img_url:'',btn_text:'按钮',action:'no_action',action_data:'',sort:0}*/],
    },
    //优惠券
    coupon:{show:true},//||false:是否显示||隐藏
    //团购
    group_buying:{show:true},//||false:是否显示||隐藏
    //限时抢购
    limit_time:{show:true},//||false:是否显示||隐藏
    //中间通栏广告
    ad_center:{
      "max_id":3,//最大的楼层横幅ID
      "img_list":[
      {
        id:1,//楼层横幅ID
        "advertise_name":"领券中心",//广告标识
        img_url:'',//横幅图片
        show:true,//是否开启显示||隐藏
        action:'no_action',action_data:''
      },
      {
        id:3,//楼层横幅ID
        "advertise_name":"领券中心",//广告标识
        img_url:'',//横幅图片
        show:true,//是否开启显示||隐藏
        action:'no_action',action_data:''
      }
      ]
    },
    //格子广告
    ad_theme:{
      "max_id":2,//table主题格子列表 最大id
      theme_list:[//table主题格子列表
        {
          max_id:55555,//主题格子模块最大id
          title:'',//主题名称
          "sort":1,//排序
          show:true,
          list_title:{
            module_id: 11111, // 模块标识
            module_type: 1, // 模块类型 1-主题名称
            module_name: '', // 模块名称 预留属性 暂时没用到
            status: 1, // 1-显示 2-隐藏 主题名称、轮播广告有用到
            sort: -9999999, // 排序 越小越靠前 保证在最前面
            content: { // 模块内容
              dataset: [ // 数据集
                {
                  type: 0, // 跳转类型
                  title: '', // 名称
                  img_url: '', // 图片url[原本imgurl]
                  action_data: '', // 跳转参数,[原本weburl]
                  action: 'no_action'
                }
              ]
            },
            dom_item: ''
          },//主题名称
          list_ad:{
            module_id: 55555, // 模块标识
            module_type: 5, // 模块类型 1-轮播广告图
            module_name: '', // 模块名称 预留属性 暂时没用到
            status: 1, // 1-显示 2-隐藏 主题名称、轮播广告有用到
            sort: -9999999, // 排序 越小越靠前 保证在最前面
            content: { // 模块内容
              dataset: [ // 数据集
                {
                  type: 0, // 跳转类型
                  title: '', // 名称
                  img_url: '', // 图片url[原本imgurl]
                  action_data: '', // 跳转参数,[原本weburl]
                  action: 'no_action'
                }
              ]
            },
            dom_item: ''
          },//轮播广告图

          list_content:
            [//主题格子详情模块列表(可拖动块)
            {
              module_id: 222222, // 模块标识
              module_type: 2, // 模块类型  2-两列 3-三列 4-四列 6-单列-7商品模块
              module_name: '', // 模块名称 预留属性 暂时没用到
              status: 1, // 1-显示 2-隐藏 主题名称、轮播广告有用到
              sort: -9999999, // 排序 越小越靠前 保证在最前面
              content: { // 模块内容
                dataset: [ // 数据集
                  {
                    type: 0, // 跳转类型
                    title: '', // 名称
                    img_url: '', // 图片url[原本imgurl]
                    action_data: '', // 跳转参数,[原本weburl]
                    action: 'no_action'
                  }
                ]
              },
              dom_item: '',
              "goods_data": {
                "goods_source": "0",//商品来源（0：商品分类，1：商品标签）
                "source_id": "0",//商品分类，商品标签id
                "tag_id": "",
                "class_id": "12238|12252|12253",
                "goods_id": [],
                "goods_num": "6",//显示的商品个数
                "list_style": "0",//列表样式（0：横向滑动）
                "show_goods_name": "1",//显示商品名称（0/1）
                "show_goods_price": "1"//显示商品价格（0/1）
              },
            },
          ]}
      ],
    },
    //新品推荐
    new_goods:{show:true}//||false:是否显示||隐藏
}