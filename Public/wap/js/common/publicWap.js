/**
 * @author   liangxiaoqiong
 * @version  1.0
 * @date 2018-01-02.
 */
var tTD;//用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
var publicWap = new Object({
  bodyScroll: '',

  //判断客户端是android还是ios,
  clientType: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
      if(window.location.href.indexOf("?mobile")<0){
        try{
          if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
            return 'ios';
          }else{
            return 'android';
          }
        }catch(e){}
      }
    }else if( u.indexOf('iPad') > -1){
      return 'ios';
    }else{
      return 'android';
    }
  },

  /**
   * 判断是否是手机
   * @param value
   * @returns {boolean}
   */
  isPhone: function (value) {
    var reg = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
    return reg.test(value);
  },
  isTel: function (value) {
    var reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
    return reg.test(value);
  },

  /**region 复制内容*/
  copyText: function (content) {
    var input = document.createElement("input");
    document.body.appendChild(input);
    input.setAttribute("value", content);
    input.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
    }
    document.body.removeChild(input);
    publicWap.layerMsg('已复制内容到剪贴板', 1)
  },
  /**endregion*/

  /** 通过键值获取数组key*/
  /*config = {
  list: 循环的数据,
  param: 比较的变量名
  value：比例的变量值
  }*/
  getArrayKey: function (config) {
    var activeIndex = -1;
    for (var i = 0; i < config.list.length; i++) {
      if (config.value === config.list[i][config.param]) {
        activeIndex = i;
        break;
      }
    }
    return activeIndex
  },
  /**
   * 添加返回顶部图标（右下角）
   * @param value
   * @returns {}
   */
  toTopHtml: function () {
    $(document).scroll(function () {
      var top = $(document).scrollTop();
      //滚动条距离顶部大于300时显示置顶按钮
      if (top > 300) {
        var toTopHtml = $('#toTopHtml').html();
        var html = '<a href="javascript:publicWap.toTop();" id="toTopHtml"><img src="/Public/wap/img/common/to_top.png"></a>';
        if (toTopHtml === undefined) {
          $('body').append(html);
        }
      }
      else {
        $('#toTopHtml').remove();
      }

    });
  },
  /**
   * 点击右下角返回顶部icon=》滚动条置顶
   * @param value
   * @returns {}
   */
  toTop: function (el) {
    //$('body,html').animate({scrollTop:0},1000);
    if (typeof (el) === 'undefined') {
      if ($('html').scrollTop()) {
        $('html').animate({scrollTop: 0}, 1000);
        return false;
      }
      $('body').animate({scrollTop: 0}, 1000);
      return false;
    } else {
      $(el).animate({scrollTop: 0}, 1000);
    }
  },
  /**
   * 点击分享显示 ：提示右上角去分享
   * */
  shareTip_wap: function () {
    var oldHtml = $('#shareDiv').html();
    var html = '\
      <div id="shareDiv">\
        <img src="/Public/wap/img/common/shareIcon.png">\
        <p class="iconTitle">快喊小伙伴们一起来分享吧！</p>\
        <p class="iconMsg">点击右上角图标进行分享</p>\
        <div class="shareIconBtn">\
          <button onclick="javascript:$(\'#shareDiv\').remove()">我知道了</button>\
        </div>\
      </div>';
    if (oldHtml === undefined) {
      $('body').append(html);
    }
    event.stopPropagation();//阻止冒泡
  },
  /**
   * 点击关注，显示二维码弹框
   * @param value
   * @returns {}
   */
  toSubscribe: function () {
    var h = window.screen.availHeight;
    var w = window.screen.availWidth;
    var mt = (h - Number(w) * 0.9) / 2 - 50;
    $("#layerModel").show();
    $("#subscribeQRCode").css('top', mt).show();
  },
  closeSubscribe: function () {
    $("#layerModel").hide();
    $("#subscribeQRCode").hide();
  },
  /**
   * 质朴长存法 =>不足位步0 by lifesinger
   * @param value
   */
  padNum: function (num, n) {
    var len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  },
  /**
   * 正则，只允许正整数
   * @param value
   * limitVal{
   *  "maxVal":"限制最大数"，"maxMsg":"超过最大数限制说明",
   *  "minVal":"限制最小数"，"minMsg":"超过最小数限制说明"}
   * @returns {number}
   */
  numInt: function (obj, limitVal) {
    if (obj.value.length == 1) {
      obj.value = obj.value.replace(/[^0-9]/g, '')
    } else {
      obj.value = obj.value.replace(/\D/g, '')
    }
    if (typeof (limitVal) !== 'undefined') {
      if (obj.value > +limitVal.maxVal) {
        layer.msg(limitVal.maxMsg);//'该商品最大售量9999件！'
        obj.value = +limitVal.maxVal;
      }
    }
    return obj.value;
  },
  /**
   * 浮点小数(最多精确到2位)
   * @param value
   * limitVal{
   *  "maxVal":"限制最大数"，"maxMsg":"超过最大数限制说明",
   *  "minVal":"限制最小数"，"minMsg":"超过最小数限制说明"}
   * @returns {number}
   */
  numPoint2: function (obj, limitVal) {
    obj.value = obj.value.match(/\d+(\.\d{0,2})?/) ? obj.value.match(/\d+(\.\d{0,2})?/)[0] : '';
    if (typeof (limitVal) !== 'undefined') {
      if (+obj.value > +limitVal.maxVal) {
        layer.msg(limitVal.maxMsg);
        obj.value = +limitVal.maxVal;
      }
    }
    return obj.value;
  },
  /**
   * swiper，左右图片轮播swiper 3
   * @param value
   * elName:'.class'或'#id' //样式名
   */
  swiperOne: function (elName, swiperData) {
    var currentPoint = 1;
    var swiperDefault = {
      pagination: '.swiper-pagination',//分页器
      paginationType: 'bullets',//圆点式分页器
      speed: 350,//速度
      autoplay: 1800,//自动播放
      paginationClickable: true, //点击分页器的指示点分页器会控制Swiper切换
      autoplayDisableOnInteraction: false,
      //针对vue
      // //https://segmentfault.com/a/1190000002962202

      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      //设置自定义分页器的内容
      paginationCustomRender: function (swiper, current, total) {
        currentPoint = current;
      }
    };
    $.extend(true, swiperDefault, swiperData); //合并两对象数据，相同键值swiperData覆盖swiperDefault
    var swiper_ = new Swiper(elName, swiperDefault);
    return swiper_;
  },
  /**
   * 加入\减购物车特效 jquery-fly
   * type:add,minus(加、减)
   * position_:{
   *  startLeft：抛物体起点横坐标,
   *  startTop：抛物体起点纵坐标,
   *  endLeft：抛物体终点横坐标,
   *  endTop：抛物体终点纵坐标,
   *  flyImg：抛物体图标
   * }
   * */
  jqueryFly: function (type, position_) {
    //var divScroTop = $(document).scrollTop();
    //var windowHeight = $(window).height();  //计算窗口高度
    if (type === 'add') {
      var flyer = $('<img class="flyer-add-img" src="' + position_.flyImg + '">'); //抛物体对象
    } else {
      var flyer = $('<span class="flyer-minus-style"></span>');
    }
    flyer.fly({
      start: {
        left: position_.startLeft,  //抛物体起点横坐标 加--向x轴正方向
        top: position_.startTop, //抛物体起点纵坐标 加--向y轴负方向
      },
      end: {
        left: position_.endLeft,  //抛物体终点横坐标 加--向x轴正方向
        top: position_.endTop, //抛物体终点纵坐标 加--向y轴负方向
        width: 0,//到终点宽高为0，
        height: 0,
      },
      onEnd: function () {
        this.destory(); //销毁抛物体
      }
    });
  },
  /**
   * 秒=>天，时，分，秒
   * toType='day','hour','min','sec'
   * time=单位s
   */
  timeTo_: function (toType, time) {
    switch (toType) {
      case 'day':
        var value_ = Math.floor((time / 3600) / 24);        //计算天
        //value_=(Array(2).join(0) + value_).slice(-2);
        break;
      case 'hour':
        var value_ = Math.floor((time / 3600) % 24);      //计算小时
        value_ = (Array(2).join(0) + value_).slice(-2);
        break;
      case 'min':
        var value_ = Math.floor((time / 60) % 60);      //计算分
        value_ = (Array(2).join(0) + value_).slice(-2);
        break;
      case 'sec':
        var value_ = Math.floor(time % 60);             // 计算秒
        value_ = (Array(2).join(0) + value_).slice(-2);
        break;
      default:
        break;
    }
    return value_;
  },
  /********************************
   * 重置layer.msg样式【wap、pc】
   * content:msg内容
   * msgType:msg类型{0：失败(默认)，1：成功,2：警告提示}
   * config{
   *   skin:
   *   icon：
   * }
   *
   * */
  layerMsg: function (content, msgType, callback) {
    var className = ''
    var iconName = ''
    var msgType_ = 0;
    if (typeof msgType !== 'undefined') {
      msgType_ = msgType;
    }
    switch (+msgType_) {
      case 1:
        iconName = 'myicon-success-white'
        className = 'layer-msg-success'
        break
      default:
        iconName = 'myicon-fail-white'
        className = 'layer-msg-fail'
        break
    }
    var html = '<div class="'+className+'"><i class="' + iconName + '"></i><div class="display-align">' + content + '</div></div>';
    layer.msg(html,{offset: ['40%', '']}, function () {
      if (typeof callback !== 'undefined') {
        callback()
      }
    });
    $('[class^="layer-msg-"]').parents('.layui-layer').css({'background': 'none'});
  },


  /**显示自定义弹框（服务说明）
   * contentLayer:'.class,#id'//弹框内容class、id
   * type==1:show,0:hide
   *  */
  customLayer: function (type, contentLayer) {
    if(type === 'show'){
      publicWap.bodyFixed(true)
      $('#layerModel,'+contentLayer+'').show();
    }else{
      publicWap.bodyFixed(false)
      $('#layerModel,'+contentLayer+'').hide();
    }
  },
  //弹框显示，底部body无法滑动
  bodyFixed: function(isShow){
    if(isShow){
      var scrollTop = $(document).scrollTop();//获取body滚动条位置
      publicWap.bodyScroll = scrollTop;
      $('body').addClass('body-fixed');
      $('body').css('top', '-'+scrollTop+'px');
    } else {
      $('body').removeClass('body-fixed');
      $('body').css('top', 0);
      window.scrollTo(0,publicWap.bodyScroll);
    }
  },
  /**
   * 右侧滑出/关闭弹框
   * */
  slideRight: function (type, contentLayer) {
    if (type === 'show') {
      var scrollTop = $(document).scrollTop();//获取body滚动条位置
      publicWap.bodyScroll = scrollTop;
      $('body').addClass('body-fixed');
      $('body').css('top', '-'+scrollTop+'px');
      $("#layerModel").show();
      $(contentLayer).show("drop", {direction: 'right'}, 400);
    } else {
      $('body').removeClass('body-fixed');
      $('body').css('top', 0);
      window.scrollTo(0,publicWap.bodyScroll);
      $("#layerModel").hide();
      $(contentLayer).hide("drop", {direction: 'right'}, 400);
    }
  },
  /**
   * //毫秒转时间2017-08-20 12:12:12*/
  dateTime_Str: function (time_, timeType) {
    var Y = time_.getFullYear();    //获取完整的年份(4位,1970-????)
    var M = publicWap.padNum(time_.getMonth() + 1, 2);       //获取当前月份(0-11,0代表1月)
    var D = publicWap.padNum(time_.getDate(), 2);        //获取当前日(1-31)
    var H = publicWap.padNum(time_.getHours(), 2);       //获取当前小时数(0-23)
    var Min = publicWap.padNum(time_.getMinutes(), 2);     //获取当前分钟数(0-59)
    var S = publicWap.padNum(time_.getSeconds(), 2);     //获取当前秒数(0-59)
    var dataTime = Y + '-' + M + '-' + D + ' ' + H + ':' + Min + ':' + S;
    if (typeof timeType !== 'undefined') {
      switch (timeType) {
        case 'year':
          dataTime = Y + '年';
          break
        case 'year2':
          dataTime = Y;
          break
        case 'year-month':
          dataTime = Y + '年' + M + '月';
          break
        case 'year-month2':
          dataTime = Y + '-' + M;
          break
        case 'month-day':
          dataTime = M + '月' + D + '日';
          break
        case 'date':
          dataTime = Y + '-' + M + '-' + D;
          break
        default:
          break
      }
    }
    return dataTime;
  },
  selectLayer: function (title, select_id) {
    var html =
      '<div class="select-layer">\
        <p class="select-title">' + title + '</p>\
        <ul>';
    var selectDom = document.getElementById(select_id).options;
    console.log(selectDom);
    var selectArr = {
      title: title,
      option: [],
      selected: selectDom.selectedIndex === -1 ? -1 : selectDom[selectDom.selectedIndex].value//选中的option
    }
    for (var i = 0; i < selectDom.length; i++) {
      selectArr.option[i] = {
        value: selectDom[i].value,
        text: selectDom[i].text
      }
      if (selectDom.selectedIndex !== -1) {
        if (+selectDom[i].value === +selectDom[selectDom.selectedIndex].value) {
          html += '<li class="active" data-value="' + selectDom[i].value + '" data-id="' + select_id + '">' + selectDom[i].text + '</li>';
        } else {
          html += '<li data-value="' + selectDom[i].value + '" data-id="' + select_id + '">' + selectDom[i].text + '</li>';
        }
      } else {
        html += '<li data-value="' + selectDom[i].value + '" data-id="' + select_id + '">' + selectDom[i].text + '</li>';
      }

    }
    html += '</ul></div>';
    $('body').append(html);
    publicWap.customLayer('show', '.select-layer');
    return selectArr;
  },
  changeSelect: function (value, select_id) {
    document.getElementById(select_id).value = value;
    publicWap.customLayer('hide', '.select-layer');
    $('.select-layer').remove();
  },
  /**
   * 对象排序，按降序排列,
   * @param value
   */
  /* sortDesc:function(x,y){
     return y.create_time-x.create_time
   }*/
  /**
   * 数组排序，按升序排列,
   * @param value
   */
  /* arrSort: function () {
     var arrSort=[Number(this.resultTotal),Number(this.balanceData.bStore)];
     arrSort.sort(function(a, b){return a - b});
   }*/
  /**选择时间切换*/
  dayToTime: function (type) {
    var startT = 0, endT = 0;
    var nextMonth, lastMonth, nextMonthFirstDay;
    var myDate = new Date();
    myDate.setHours(0);
    myDate.setMinutes(0);
    myDate.setSeconds(0);
    myDate.setMilliseconds(0);
    var oneDayTime = 86400000; // 1天时间长度
    var oneDayEnd = oneDayTime - 1;//当天23:59:59
    endT = myDate.getTime() + oneDayEnd; // 默认查询当前12点以前的时间
    switch (+type) {
      case 1: // 今天
        startT = myDate.getTime();
        endT = startT + oneDayEnd;
        break;
      case -1:
        endT = myDate.getTime() - 1;
        startT = endT - (oneDayEnd * 1);
        break;
      case 7: // 最近7天
        startT = endT - (oneDayEnd * 7);
        break;
      case 15: // 最近15天
        startT = endT - (oneDayEnd * 15);
        break
      case 30: // 最近30天
        startT = endT - (oneDayEnd * 30);
        break;
      case 90: //最近90天
        startT = endT - (oneDayEnd * 90);
        break;
      case 1001: // 本月
        myDate.setDate(1);
        startT = myDate.getTime();
        nextMonth = myDate.getMonth() + 1;
        nextMonthFirstDay = new Date(myDate.getFullYear(), nextMonth, 1)
        endT = nextMonthFirstDay.getTime() - 1
        break;
      case 1002: // 上个月
        lastMonth = myDate.getMonth() - 1;
        nextMonth = myDate.getMonth();
        myDate.setMonth(lastMonth);
        myDate.setDate(1);
        startT = myDate.getTime();
        nextMonthFirstDay = new Date(myDate.getFullYear(), nextMonth, 1)
        endT = nextMonthFirstDay.getTime() - 1
        break;
      case 1003: // 上周
        // 本周的第一天和最后一天
        var weekday = new Date().getDay() || 7;
        startT = new Date().setDate(new Date().getDate() - weekday - 7);
        endT = new Date().setDate(new Date().getDate() - weekday - 1);
        break;
      case 1004: // 最近三个月=90天
        startT = endT - (oneDayEnd * 90);
        break;
      case 1005: // 最近六个月=180天
        startT = endT - (oneDayEnd * 90);
        break;
      case 1006: // 近四周=28天
        startT = endT - (oneDayEnd * 28);
        break;
      case 1007: // 近八周=56天
        startT = endT - (oneDayEnd * 56);
        break;
      default:
        break;
    }
    var val1 = new Date(startT);
    var val1_ = publicWap.dateTime_Str(val1);
    var val2 = new Date(endT);
    var val2_ = publicWap.dateTime_Str(val2);
    if(+type === 0){
      val1_ = '';val2_ = '';
    }
    var arr = [val1_, val2_];
    return arr;
  },
  //计算本年的周数
  getYearWeek: function (endDate) {
    //本年的第一天
    var beginDate = new Date(endDate.getFullYear(), 0, 1);
    //星期从0-6,0代表星期天，6代表星期六
    var endWeek = endDate.getDay();
    var beginWeek = beginDate.getDay();
    //计算两个日期的天数差
    var millisDiff = endDate.getTime() - beginDate.getTime();
    var dayDiff = Math.floor(( millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1000)) / 86400000);
    return Math.ceil(dayDiff / 7);
  },
  // 获取某一周的周一、周天日期(毫秒)
  getWeekDay: function (date) {
    var now = new Date();
    if (typeof date !== 'undefined') {
      now = new Date(date);
    }
    var nowTime = now.getTime();
    var day = now.getDay() || 7;
    var oneDayLong = 24 * 60 * 60 * 1000;
    var MondayTime = nowTime - (day - 1) * oneDayLong;
    var SundayTime = nowTime + (7 - day) * oneDayLong;
    var monday = new Date(MondayTime);
    var sunday = new Date(SundayTime);
    return {
      monday: monday,
      sunday: sunday
    }
  },
  // 某一天转换成第几周
  dayTransWeekString: function (timeString) {
    var timeData = new Date(timeString);
    var week = publicWap.getYearWeek(timeData);
    return publicWap.dateTime_Str(timeData, 'year') + " 第" + (week>9?week:"0"+week) + "周";
  },

  /**
   * 图片预览（需引入
   * 【__COMMON_JS__/plug-in/weui/css/jquery-weui.min.css，
   * __COMMON_JS__/plug-in/weui/css/weui.min.css，
   * __COMMON_JS__/plug-in/weui/js/jquery-weui.min.js，
   * __COMMON_JS__/plug-in/weui/js/swiper-weui.min.js
   * 】）
   * @param value
   * imgData=预览图片数组(当前用户评论图片数组 或 全部图片数组),
   * initIndex=当前图片key
   */
  imgPreviewWeui: function (imgData, initIndex) {
    var pb = $.photoBrowser({
      items: imgData,
      initIndex: initIndex
    });
    pb.open();
    event.preventDefault();//阻止冒泡
  },
  //PC图片预览,type；undefined-单张图片预览,2-多图片json预览,3-多图片指定父容器
  imgPreviewLayer: function (imgData, type) {
    var imgDefault = {
      "title": "", //相册标题
      "id": 123, //相册id
      //"start": 0, //初始显示的图片序号，默认0
      "data": [   //相册包含的图片，数组格式
        {
          "alt": "",//图片名
          "pid": 666, //图片id
          "src": "", //原图地址
          "thumb": "" //缩略图地址
        }
      ]
    }
    if (+type === 2) {
      $.extend(true, imgDefault, imgData);
    } else if (+type === 3) {
      imgDefault = imgData
    } else {
      imgDefault.data[0].src = imgData
    }
    parent.layer.photos({
      photos: imgDefault,
      closeBtn: 0,
      shadeClose: 1,
      shade: .5,
      skin: 'preview-layer-pc',
      anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
    });
    if (+type !== 2) {
      $('#layui-layer-photos').find('.layui-layer-imgsee').css('display', 'none')
    }
  },

  /*数组对象排序,
  * sortType='undefined'：从小到大
  * sortType='desc'：从大到小
  * */
  compare: function (prop, type) {
    return function (obj1, obj2) {
      var sortType = type || 'asc';
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (sortType === 'desc') {
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  },
  /**截取字符串
   * str 字符串
   * len长度中文len个长度，
   * hasDot=是否添加"..."*/
  subString: function (str, len, hasDot) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      }
      else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += "...";
    }
    return newStr;
  },
  /*判断是否是微信*/
  isWx: function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') != -1 ? true:false;
  },
  /**可编辑div将光标定位到最后*/
  setFocus: function (el) {
    //el=el[0];  //jquery 对象转dom对象
    el.focus();
    if($.support.msie)
    {
      var range = document.selection.createRange();
      this.last = range;
      range.moveToElementText(el);
      range.select();
      document.selection.empty(); //取消选中
    }
    else
    {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  },
  /** region 页面图片异步加载 start*/
  //调取异步加载事件
  imgAsynLoad: function () {
    var imgs = document.querySelectorAll('img');
    for(var i = 0;i<imgs.length;i++)
    {
      var url = imgs[i].dataset.src;
      if (url === '' || url === 'null' || url === undefined || url === null) {
        continue;
      }
      publicWap.loadImage(imgs[i],url,publicWap.showImage);
    }
  },
  //
  loadImage: function (obj,url,callback) {
    var img = new Image();
    img.src = url;

    // 判断图片是否在缓存中
    if(img.complete){
      callback.call(img,obj);
      return;
    }

    // 图片加载到浏览器的缓存中回调函数
    img.onload = function(){
      callback.call(img,obj);
    }
  },
  showImage: function (obj) {
    obj.src = this.src;
  },
  /**
   * 文本框根据输入内容自适应高度
   * {HTMLElement}   输入框元素
   * {Number}        设置光标与输入框保持的距离(默认0)
   * {Number}        设置最大高度(可选)
   */
  autoTextarea: function (elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
      isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
      addEvent = function (type, callback) {
        elem.addEventListener ?
          elem.addEventListener(type, callback, false) :
          elem.attachEvent('on' + type, callback);
      },
      getStyle = elem.currentStyle ?
        function (name) {
          var val = elem.currentStyle[name];
          if (name === 'height' && val.search(/px/i) !== 1) {
            var rect = elem.getBoundingClientRect();
            return rect.bottom - rect.top -
              parseFloat(getStyle('paddingTop')) -
              parseFloat(getStyle('paddingBottom')) + 'px';
          };
          return val;
        } : function (name) {
          return getComputedStyle(elem, null)[name];
        },
      minHeight = parseFloat(getStyle('height'));
    console.log(getStyle);
    elem.style.resize = 'both';//如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值

    var change = function () {
      var scrollTop, height,
        padding = 0,
        style = elem.style;

      if (elem._length === elem.value.length) return;
      elem._length = elem.value.length;

      if (!isFirefox && !isOpera) {
        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
      };
      scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

      elem.style.height = minHeight + 'px';
      if (elem.scrollHeight > minHeight) {
        if (maxHeight && elem.scrollHeight > maxHeight) {
          height = maxHeight - padding;
          style.overflowY = 'auto';
        } else {
          height = elem.scrollHeight - padding;
          style.overflowY = 'hidden';
        };
        style.height = height + extra + 'px';
        scrollTop += parseInt(style.height) - elem.currHeight;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        elem.currHeight = parseInt(style.height);
      };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
  },

  // 提交验证数据是否为空
  /*
    var verifyRule = [
      { key: 'name', verify_type: 'required', error_text: '请输入**'},
      { key: 'name', verify_type: 'required_length', error_text: '请输入**'},
    ]
    if (!publicObj.verifyForm(verifyRule, verifyArr)) return false
    verifyRule:验证规则
    verifyArr:验证的数据
  */
  verifyForm: function (verifyRule, verifyArr, callback) {
    // 传入表单数据，调用验证方法a
    var result = true
    try {
      verifyRule.forEach(function (value) {
        switch (value.verify_type) {
          case 'required':
            if (typeof verifyArr[value.key] === 'undefined' || verifyArr[value.key] === '') {
              publicWap.layerMsg(value.error_text)
              if (typeof callback !== 'undefined') {
                callback(value)
              }
              result = false
              throw Error()
            }
            break
          case 'required_length':
            if (typeof verifyArr[value.key] === 'undefined' || verifyArr[value.key].length <= 0) {
              publicWap.layerMsg(value.error_text)
              if (typeof callback !== 'undefined') {
                callback(value)
              }
              result = false
              throw Error()
            }
            break
          default:
            break
        }
      })
    } catch (e) {
    }
    return result
  },
  /**自定义可滑动table*/
  diyTableScroll: function (el) {
    if (typeof el === 'undefined') {
      el = ''
    }
    $(el + " .diy-table-box>.diy-table-body").scroll(function() {
      $(el + " .diy-table-header").scrollLeft($(el + " .diy-table-box>.diy-table-body").scrollLeft());
      $(el + " .diy-table-fixed .diy-table-body").scrollTop($(el + " .diy-table-box>.diy-table-body").scrollTop());
    });
  },
  /**表格table 可改变列宽*/
  diyTableTh: function (el, tableFiled) {
    var table = document.getElementById(el);
    for (j = 0; j < table.rows[0].cells.length; j++) {
      table.rows[0].cells[j].onmousedown = function () {
//记录单元格
        tTD = this;
        if (event.offsetX > tTD.offsetWidth - 10) {
          tTD.mouseDown = true;
          tTD.oldX = event.x;
          tTD.oldWidth = tTD.offsetWidth;
        }
        $('.diy-table .diy-table-cell').addClass('unselect');
      };
      table.rows[0].cells[j].onmouseup = function () {
//结束宽度调整
        if (tTD == undefined) tTD = this;
        tTD.mouseDown = false;
        tTD.style.cursor = 'default';
        $('.diy-table .diy-table-cell').removeClass('unselect');
      };
      table.rows[0].cells[j].onmousemove = function () {
//更改鼠标样式
        if (event.offsetX > this.offsetWidth - 10)
          this.style.cursor = 'col-resize';
        else
          this.style.cursor = 'default';
//取出暂存的Table Cell
        if (tTD == undefined) tTD = this;
//调整宽度
        if (tTD.mouseDown != null && tTD.mouseDown == true) {
          tTD.style.cursor = 'default';
          if (tTD.oldWidth + (event.x - tTD.oldX)>0) {
            var index = $(tTD).data('index')
            if (typeof tableFiled !== 'undefined') {
              tableFiled[index].t_width = tTD.oldWidth + (event.x - tTD.oldX)
            } else {
              $('.diy-table-cell-'+index).css('width', tTD.oldWidth + (event.x - tTD.oldX))
            }
          }
          tTD.style.cursor = 'col-resize';
        }
      };
    }
    document.onmouseup = function () {
//结束宽度调整
      if (tTD == undefined) tTD = this;
      tTD.mouseDown = false;
      $('.diy-table .diy-table-cell').removeClass('unselect');
    }
  },

  /** region html转img canvas画图*/
  // 获取canvas图片
  getCanvasImg: function (queryElem) {
    var shareContent = document.querySelector(queryElem);// 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
    var width = shareContent.offsetWidth;  // 获取(原生）dom 宽度
    var height = shareContent.offsetHeight; // 获取(原生）dom 高
    var offsetTop = shareContent.offsetTop;  //{$currencyUnit}素距离顶部的偏移量

    var canvas = document.createElement('canvas');  //创建canvas 对象
    var context = canvas.getContext('2d');
    var scaleBy = publicWap.getPixelRatio(context);  //获取像素密度的方法 (也可以采用自定义缩放比例)
    canvas.width = width * scaleBy;   //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
    canvas.height = (height + offsetTop) * scaleBy;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
    context.scale(scaleBy, scaleBy);

    var opts = {
      useCORS: true,//允许加载跨域的图片
      tainttest: true, //检测每张图片都已经加载完成
      scale: scaleBy, // 添加的scale 参数
      canvas: canvas, //自定义 canvas
      logging: true, //日志开关，发布的时候记得改成false
      width: width, //dom 原始宽度
      height: height //dom 原始高度
    };
    return html2canvas(shareContent, opts);
  },
  //获取像素密度
  getPixelRatio: function (context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;

  },
  /**endregion html转img canvas画图*/
  //wx-open-launch-weapp开放标签动态添加
  addWeappHtml: function (elId, config) {
    var btn = document.getElementById(elId); //获取元素
    if (btn != null) {
      var btnWidth = btn.clientWidth
      var btnHeight = btn.clientHeight
      //图片宽100%，高度自适应
      if (+config.ad_data !== -1 && +config.ad_data.height_auto === 1) {
        btnWidth = document.body.clientWidth
        btnHeight = (+btnWidth * (+config.ad_data.img_data.height)) / (+config.ad_data.img_data.width)
      }
      var script = document.createElement("script");// 创建script内容插槽 避免template标签冲突
      script.type = "text/wxtag-template"; // 使用script插槽 必须定义这个type
      script.text = '<div style="width: '+btnWidth+'px;height: '+btnHeight+'px;display: inline-block;"></div>' // 自定义的html字符串内容
      var html = '<wx-open-launch-weapp style="width:100%;height:100%;display:block;" username="'+config.user_name+'" path="'+config.path+'">'+script.outerHTML+'</wx-open-launch-weapp>';
      btn.innerHTML = html; // html字符串赋值
    }
  },

  /**region highcharts 图表*/
  //折线图
  highchartsLine: function (el, configNew) {
    var config = {
      title: {
        text: ''
      },
      colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#434348'],
      yAxis: {
        title: {
          text: '金额（元）'
        },
        labels: {
          formatter: function() {
            return this.value
          }
        }
      },
      xAxis: {
        categories: [],
        title: {
          text: null
        }
      },
      tooltip: {
        pointFormat: "{series.name}:<b>{point.y:.2f}</b>",
        enabled: true
      },
      series: [],
      credits: false,
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            format: "{point.y:.2f} "
          },
          enableMouseTracking: true
        }
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      }
    }
    $.extend(true, config, configNew); //合并两对象数据，相同键值configNew覆盖config
    return Highcharts.chart(el, config)
  },
  //柱状图
  highchartsBar: function (el, configNew) {
    var config = {
      title: {
        text: ''
      },
      colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#434348'],
      chart: {
        type: "bar"
      },
      yAxis: {
        title: {
          align: "high"
        }
      },
      xAxis: {
        categories: [],
        title: {
          text: null
        }
      },
      tooltip: {
        pointFormat: "{series.name}:<b>{point.y:.2f}</b>",
        enabled: true
      },
      series: [],
      credits: false,
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            format: "{point.y:.2f} "
          },
          enableMouseTracking: true
        }
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      }
    }
    $.extend(true, config, configNew); //合并两对象数据，相同键值configNew覆盖config
    return Highcharts.chart(el, config)
  },
  //饼图
  highchartsPie: function (el, configNew) {
    var config = {
      title: {
        text: ''
      },
      colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#434348'],
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      labels: {
        formatter: function() {
          return this.value
        }
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.2f}%</b>"
      },
      series: [],
      credits: false,
      plotOptions: {
        pie: {
          //showInLegend: true, //显示图例
          innerSize: 100,
          depth: 45
        }
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      }
    }
    $.extend(true, config, configNew); //合并两对象数据，相同键值configNew覆盖config
    return Highcharts.chart(el, config)
  },
  /**endregion*/

  //微信和网页版跳转到导航 js函数
  mapLink: function (option) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) + '' === "micromessenger") {
      wx.openLocation({
        latitude: +option.latitude, // 纬度，浮点数，范围为90 ~ -90,【字符串ios无法跳转】
        longitude: +option.longitude, // 经度，浮点数，范围为180 ~ -180。字符串ios无法跳转】
        name: option.pick_name, // 位置名
        address: option.pick_address, // 地址详情说明
        scale:18, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl:"https://www.baidu.com" // 在查看位置界面底部显示的超链接,可点击跳转
      })
    } else {
      var url = 'https://api.map.baidu.com/marker?'
      var param = "location= " + option.latitude + "," + option.longitude +
        "&title=" + option.pick_name +
        "&content=" + option.pick_address +
        "&output=html"
      window.location.href = url + '' + param;
    }
  },

  /**region [使用场景：pc后台商品详情多规格生成的随机规格项id]*/
  // 生成32位随机字符串
  createRandom: function () {
    var create_id = '';
    var idLength = 32;
    var idChars = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
    for(var i= 0; i < idLength; i++){
      var idNum = Math.floor(Math.random() * 52);
      create_id += idChars[idNum];
    }
    if(create_id){
      return create_id
    }
  },
  // 一个或多个一维数组，算出元素之间相互组合的所有情况,spliceType:字符拼接链接的符号
  stackSituation: function (data, spliceType) {
    var self = this
    spliceType = typeof spliceType !== 'undefined' ? spliceType : '_'
    var targetKeys = Object.keys(data)
    var target = faker = []
    if (targetKeys.length) {
      target = targetKeys.map((key) => data[key])
      faker = target[0]
    }
    target.forEach((itemArr, index, currentArr) => {
      faker = js(faker, currentArr[index + 1])
    })
    function js(arr1, arr2){
      var arr1 = arr1 || []
      var arr2 = arr2 || []
      faker = []
      for(var i = 0;i < arr1.length; i++){
        if (!arr2.length) {
          faker.push(arr1[i])
        } else {
          for(var j = 0; j < arr2.length; j++){
            faker.push(arr1[i] + spliceType +arr2[j]);
          }
        }
      }
      return faker
    }
    var result = faker
    return result
  },
  /**endregion*/

  // 数字金额转中文
  digitalAmountToChinese: function (numberValue) {
    var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
    var chineseValue = "";          // 转换后的汉字金额
    var String1 = "零壹贰叁肆伍陆柒捌玖";       // 汉字数字
    var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分";     // 对应单位
    var len = numberValue.length;         // numberValue 的字符串长度
    var Ch1;             // 数字的汉语读法
    var Ch2;             // 数字位的汉字读法
    var nZero = 0;            // 用来计算连续的零值的个数
    var String3;            // 指定位置的数值
    if (len > 15) {
      // alert("超出计算范围");
      return numberValue;
    }
    if (numberValue == 0) {
      chineseValue = "零元整";
      return chineseValue;
    }
    String2 = String2.substr(String2.length - len, len);   // 取出对应位数的STRING2的值
    for (var i = 0; i < len; i++) {
      String3 = parseInt(numberValue.substr(i, 1), 10);   // 取出需转换的某一位的值
      //alert(String3);
      if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
        if (String3 == 0) {
          Ch1 = "";
          Ch2 = "";
          nZero = nZero + 1;
        } else if (String3 != 0 && nZero != 0) {
          Ch1 = "零" + String1.substr(String3, 1);
          Ch2 = String2.substr(i, 1);
          nZero = 0;
        } else {
          Ch1 = String1.substr(String3, 1);
          Ch2 = String2.substr(i, 1);
          nZero = 0;
        }
      } else {              // 该位是万亿，亿，万，元位等关键位
        if (String3 != 0 && nZero != 0) {
          Ch1 = "零" + String1.substr(String3, 1);
          Ch2 = String2.substr(i, 1);
          nZero = 0;
        } else if (String3 != 0 && nZero == 0) {
          Ch1 = String1.substr(String3, 1);
          Ch2 = String2.substr(i, 1);
          nZero = 0;
        } else if (String3 == 0 && nZero >= 3) {
          Ch1 = "";
          Ch2 = "";
          nZero = nZero + 1;
        } else {
          Ch1 = "";
          Ch2 = String2.substr(i, 1);
          nZero = nZero + 1;
        }
        if (i == (len - 11) || i == (len - 3)) {    // 如果该位是亿位或元位，则必须写上
          Ch2 = String2.substr(i, 1);
        }
      }
      chineseValue = chineseValue + Ch1 + Ch2;
    }
    if (String3 == 0) {           // 最后一位（分）为0时，加上“整”
      chineseValue = chineseValue + "整";
    }
    return chineseValue;
  }
})
if (publicWap.clientType() === 'android') {
  $('.design-preview-item .cap-goods-list .goods-ul li').css('float', 'left')
}
