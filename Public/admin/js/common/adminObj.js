/**
 * @author   liangxiaoqiong
 * @version  1.0
 * @date 2021/3/25
 */
/*适用于pc后台公共函数*/
var adminObj = new Object({

  getAdminUrl: function (c, a) {
    return '/admin.php?c=' + c + '&a=' + a;
  },
  /*region 顶部iframe tab*/
  //子页面更改顶部iframe文字
  modifyTabTitle: function (text, layId) {
    window.parent.$('#layui-tab-list').find('li[lay-id="' + layId + '"]').find('font').html(text)
  },
  //点击左侧菜单刷新当前页路径
  clickMenuRefresh: function (menu_type, config) {
    window.parent.$('[title="' + menu_type + '"]').click(function (event) {
      var url;
      if (config && typeof config.url !== 'undefined') {
        url = config.url
      } else {
        url = $(this).find('a').attr('data-url');
      }
      var _iframe = window.parent.$('.beg-layout-body').find('iframe[src="' + url + '"]')
      var urlNew = url;
      if (config && typeof config.param !== 'undefined') {
        urlNew += config.param;
      }
      _iframe.attr('src', urlNew)
      var title = $(this).find('a cite').text()
      adminObj.modifyTabTitle(title, url)
    });
  },

  // 获取指定iframe的window对象
  getIframeWindow: function (menu_type) {
    // 获取最顶层的window对象
    var top = window.top ? window.top : window;
    var jq = top.$;
    if (jq) {
      var iframe = jq.find("iframe[data-menu-type='" + menu_type + "']")[0];
      if (iframe) {
        return iframe.contentWindow;
      }
    }
    return null;
  },

  getIframeWindowVue: function (menu_type) {
    var iframeWindow = this.getIframeWindow(menu_type);
    if (iframeWindow) {
      return iframeWindow.vm;
    }
    return null;
  },

  // 切换tab[左侧有菜单，直接点击，无:顶部tab切换]
  locationToIframe: function (menu_type) {
    var top = window.top ? window.top : window;
    var jq = top.$;
    if (jq) {
      var hasMenu = false; // 该tab菜单是否属于左侧菜单一员
      jq('.layui-nav-tree li').each(function () {
        var $this = $(this);
        if($this.find('dl').length > 0) {
          $this.find('dd').each(function() {
            var type = $(this).attr('title');
            if (type === menu_type) {
              hasMenu = true;
            }
          })
        }
      })
      if (hasMenu) {
        jq("[title='"+menu_type+"']").click();
      } else {
        var playui = window.parent.layui;
        var tab = playui.tab({
          elem: window.parent.$('.layout-nav-card'), //设置选项卡容器
          contextMenu: true
        });
        tab.changeTab(menu_type);
      }
    }
  },

  // iframe里 新开顶部tab窗口
  addLayuiTab: function (config) {
    if(window.top!=window.self) {
      //在Iframe中
      var playui = window.parent.layui;
      var tab = playui.tab({
        elem: window.parent.$('.layout-nav-card'), //设置选项卡容器
        contextMenu: true
      });
      tab.tabAdd({
        title: config.title,
        href: config.url,
        menu_type: config.menu_type,
        // 顶部tab对应的左侧菜单选中的menu_type【主要用于新开的tab(新增、编辑页)】
        parent_menu_type: config.parent_menu_type,
      });
    } else {
      window.open(config.url);
    }
  },
  // 更改当前顶部layid【主要用于新增后新开的tab链接转编辑】
  modifyThisTab: function (config) {
    $(window.parent.$("#layui-tab-list")).find("li").each(function (i, e) {
      var isActive = $(this).hasClass('layui-this');
      if (isActive) {
        $(this).attr('lay-id', config.url)
        $(this).find('font').html(config.title)
        $(this).find('cite').text(config.menu_type)
      }
    })
    adminObj.getThisTabData().iframe.attr('data-menu-type', config.menu_type)
  },
  // 移除当前的tab窗口
  delThisTab: function () {
    var playui = window.parent.layui;
    var tab = playui.tab({
      elem: window.parent.$('.layout-nav-card'), //设置选项卡容器
      contextMenu: true
    });
    var tabIndex = adminObj.getThisTabData().tabIndex;
    if (tabIndex !== -1) {
      tab.deleteTab(tabIndex);
    }
  },

  // 获取当前tab的数据
  getThisTabData: function () {
    var tabIndex = -1;
    var menu_type = '';
    $(window.parent.$("#layui-tab-list")).find("li").each(function (i, e) {
      var isActive = $(this).hasClass('layui-this');
      if (isActive) {
        tabIndex = $(this).attr('lay-id')
        menu_type = $(this).find('cite').text();
      }
    })
    // 当前iframe
    var iframe;
    $(window.parent.$(".layui-tab-content")).find(".layui-tab-item").each(function (i, e) {
      var isActive = $(this).hasClass('layui-show');
      if (isActive) {
        iframe = $(this).find("iframe");
      }
    })
    return {
      tabIndex: tabIndex,
      menu_type: menu_type,
      iframe: iframe
    }
  },


  // 判断某个tab是否被打开
  isOpenLayuiTab: function (menu_type) {
    var isOpen = false;
    $(window.parent.$("#layui-tab-list")).find("li").each(function (i, e) {
      var type = $(this).find('cite').text();
      if (type === menu_type) {
        isOpen = true;
      }
    })
    return isOpen;
  },

  // 移除某个tab窗口
  delLayuiTab: function (menu_type) {
    if(window.top!=window.self) {
      var layid = '';
      $(window.parent.$("#layui-tab-list")).find("li").each(function (i, e) {
        var type = $(this).find('cite').text();
        if (type === menu_type) {
          layid = $(this).attr('lay-id');
        }
      })
      var playui = window.parent.layui;
      var tab = playui.tab({
        elem: window.parent.$('.layout-nav-card'), //设置选项卡容器
        contextMenu: true
      });
      if (layid !== '') {
        tab.deleteTab(layid);
      }
    } else {
      window.close();
    }
  },

  // 编辑||查看tab页，保存提交后刷新列表页&&关闭当前tab
  /*
  * title: 'tab title',
    menu_type: '',
    c: '',
    a: '',
    param: '&',
    old_menu_type: '',
    getDataFun: '更新列表的函数方法'
    getDataFunParam: '更新列表的函数方法 所带的参数'*/
  infoTabSubmit: function (config) {
    config.param = config.param || '';
    var isModifyTab = config.isModifyTab || true; // 当未打开目标tab页时，是否在当前tab页更改要刷新的目标tab页
    if(window.top!=window.self) {
      // 判断是否打开了列表tab页
      if (adminObj.isOpenLayuiTab(config.menu_type) || !isModifyTab) {
        config.getDataFun = config.getDataFun || 'getTableData';
        // 刷新列表页
        var vm = adminObj.getIframeWindowVue(config.menu_type);
        if (vm && typeof vm[config.getDataFun] === "function") {
          vm[config.getDataFun](config.getDataFunParam);
        }
        // 跳到列表页
        adminObj.locationToIframe(config.menu_type);
        // 关闭新增、详情页
        adminObj.delLayuiTab(config.old_menu_type);
      } else {
        // 更改顶部tab
        var reloadUrl = AppUtil.getTPUrl(config.c, config.a) + '' + config.param;
        var reloadUrlTab = adminObj.getAdminUrl(config.c, config.a) + '' + config.param;
        adminObj.modifyThisTab({
          title: config.title,
          url: reloadUrlTab,
          menu_type: config.menu_type,
          old_menu_type: config.old_menu_type
        });
        window.location.replace(reloadUrl);
      }
    } else {
      window.location.replace(AppUtil.getTPUrl(config.c, config.a) + '' + config.param);
    }
  },
  /*endregion*/

  /**region layer 弹框*/
  /*region 显示layer 弹框
  *
   参数解释config：
   type==1,div层 ；==2：iframe
   title  标题
   url    请求的url,div el*/
  layerDialog: function (config, callback) {
    config.area = config.area || ['700px', '90%']
    if (config.title == null || config.title == '') {
      config.title = false;
    }
    if (+config.type === 2) {
      if (config.content == null || config.content == '') {
        config.content = "404.html";
      }
    }
    config.skin = config.skin || '';
    layer.open({
      type: config.type,
      area: config.area,
      fix: false, //不固定
      title: config.title,
      closeBtn: config.title == null || config.title == '' ? false : true,
      skin: 'layer-dialog' + ' ' + config.skin,
      shadeClose: config.shadeClose || false,
      content: config.content,
      success: function (layero) {
        // layer弹层遮罩挡住窗体解决
        var mask = $(".layui-layer-shade");
        mask.appendTo(layero.parent());
      },
      end: function () {
        //弹框销毁后的回调
        if (typeof callback !== 'undefined') {
          callback();
        }
      }
    });
  },
  /*endregion*/

  /*region 关闭弹出框口 ifream*/
  layerFrameClose: function () {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
  },
  /*endregion*/

  /**region echart*/
  chartOptions: {
    title: {
      textStyle: {
        fontSize: 16
      },
      subtextStyle: {
        color: '#B0B0B0'
      }
    },
    "color": [
      "#003cff",
      "#FFA200",
      "#91cc75",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc"
    ],
    // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具
    toolbox: {
      show: false,
      right: '2%',
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          zoom: '区域缩放',
          back: '区域缩放还原',
        },
        dataView: {
          readOnly: false,
          title: '数据视图',
          lang: ['数据视图', '关闭', '刷新']
        },
        magicType: {
          type: ['line', 'bar'],
          title: {
            line: '切换为折线图',
            bar: '切换为柱状图',
          }
        },
        restore: {
          title: '还原'
        },
        saveAsImage: {
          name: '保存为图片'
        }
      }
    },
    // 图例组件
    legend: {
      right: '2%'
    },
    grid: {
      x: '3%',
      width: '94%',
      y: '14%',
      height: '80%'
    },
    // 提示框组件。
    tooltip: {
      backgroundColor: 'rgba(0,0,0,.6)',
      textStyle: {
        color: '#ffffff',
        fontSize: '12',
        fontWeight: 'normal',
      },
    },
  },
  // 折线图
  echartLine: function (elName, optionData) {
    var self = this;
    var myChart = echarts.init(document.getElementById(elName));
    var optionsInit = JSON.parse(JSON.stringify(self.chartOptions));
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,.6)',
        textStyle: {
          color: '#ffffff',
          fontSize: '12',
          fontWeight: 'normal',
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#f0f0f0'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            "color": "#666666"
          }
        },
        axisTick: {
          show: false,
        },
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'line',
        "lineStyle": {
          "width": "4"
        },
        "symbolSize": "10",
        "symbol": "emptyCircle",
        data: []
      }],
    };
    $.extend(true, option, optionsInit);
    $.extend(true, option, optionData); //合并两对象数据，相同键值swiperData覆盖swiperDefault
    var chart = myChart.setOption(option);
    return chart;
  },
  // 饼图
  echartPie: function (elName, seriesData) {
    var self = this;
    var myChart = echarts.init(document.getElementById(elName));
    var optionsInit = JSON.parse(JSON.stringify(self.chartOptions));
    var option = {
      legend: {
        show: false
      },
      series: [{
        tooltip: {
          formatter: "<div style='min-width: 120px'><p>{b}({d}%)</p><p>￥{c}</p></div>"
        },
        type: 'pie',
        radius: ['55%', '85%'],
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 6,
        },
        label: {show: false},
        data: seriesData
      }],
    };
    $.extend(true, option, optionsInit);
    var chart = myChart.setOption(option);
    return chart;
  },
  //柱状图,elName:样式id
  echartBar: function (elName, optionData) {
    var self = this;
    var myChart = echarts.init(document.getElementById(elName));
    var optionsInit = JSON.parse(JSON.stringify(self.chartOptions));
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,.6)',
        textStyle: {
          color: '#ffffff',
          fontSize: '12',
          fontWeight: 'normal',
        },
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: []
      },
      series: []
    };
    $.extend(true, option, optionsInit);
    $.extend(true, option, optionData); //合并两对象数据，相同键值swiperData覆盖swiperDefault
    var chart = myChart.setOption(option);
    return chart;
  },
  /**endregion*/
  /**endregion*/
})
