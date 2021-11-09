/** layui-v1.0.9_rls MIT License By http://www.layui.com */
 ;layui.define("jquery",function(i){"use strict";var a=layui.jquery,t=(layui.hint(),layui.device()),l="element",e="layui-this",n="layui-show",s=function(){this.config={}};s.prototype.set=function(i){var t=this;return a.extend(!0,t.config,i),t},s.prototype.on=function(i,a){return layui.onevent(l,i,a)},s.prototype.tabAdd=function(i,t){var l=".layui-tab-title",e=a(".layui-tab[lay-filter="+i+"]"),n=e.children(l),s=e.children(".layui-tab-content");return n.append('<li lay-id="'+(t.id||"")+'">'+(t.title||"unnaming")+"</li>"),s.append('<div class="layui-tab-item">'+(t.content||"")+"</div>"),f.hideTabMore(!0),f.tabAuto(),this},s.prototype.tabDelete=function(i,t){var l=".layui-tab-title",e=a(".layui-tab[lay-filter="+i+"]"),n=e.children(l),s=n.find('>li[lay-id="'+t+'"]');return f.tabDelete(null,s),this},s.prototype.tabChange=function(i,t){var l=".layui-tab-title",e=a(".layui-tab[lay-filter="+i+"]"),n=e.children(l),s=n.find('>li[lay-id="'+t+'"]');return f.tabClick(null,null,s),this},s.prototype.progress=function(i,t){var l="layui-progress",e=a("."+l+"[lay-filter="+i+"]"),n=e.find("."+l+"-bar"),s=n.find("."+l+"-text");return n.css("width",t),s.text(t),this};var o=".layui-nav",c="layui-nav-item",r="layui-nav-bar",u="layui-nav-tree",d="layui-nav-child",h="layui-nav-more",y="layui-anim layui-anim-upbit",f={tabClick:function(i,t,s){
  var o = s || a(this)
    , t = t || o.parent().children("li").index(o)
    , c = o.parents(".layui-tab").eq(0)
    , r = c.children(".layui-tab-content").children(".layui-tab-item")
    , u = c.attr("lay-filter");
   // var reg = /(?<=")([^:]+)(?=")/g;
    var this_lay = ''; // 当前顶部tab的lay-id
    if (o.selector) {
     // this_lay = o.selector.match(reg)[0]; // 零宽断言正则，ios电脑异常报错
      var layStr = o.selector;
      var reg1 = /\"(.*?)\"/;
      var layStr = layStr.replace(layStr.match(reg1)[0],'');
      this_lay = RegExp.$1;
    } else {
      try {
        this_lay = o.context.attributes[0].nodeValue
      } catch (e) {

      }
    }
    /*region 左侧菜单选中*/
    $('.layui-nav-tree').find('dl dd').removeClass('layui-this');
    $('.layui-nav-tree').find('li').removeClass('layui-nav-itemed');
    $('.layui-nav-tree li').each(function () {
      var $this = $(this);
      if($this.find('dl').length > 0) {
        $this.find('dd').each(function() {
          var $a = $(this).children('a');
          var href = $a.data('url');
          if (this_lay === href) {
            $(this).addClass('layui-this')
          } else {
            /*region 当前顶部tab，对应左侧菜单选中的menu_type【主要用于新开的tab(新增、编辑页)】*/
            var parent_menu_type = o.find('cite').attr('parent-menu-type');
            if (typeof parent_menu_type !== 'undefined') {
              var left_menu_type = $(this).attr('title');
              if (parent_menu_type === left_menu_type) {
                $(this).addClass('layui-this')
                $this.addClass('layui-this-parent')
              }
            }
            /*endregion*/
          }
        })
      }
      /*region 点击事件判断[修复点击三级菜单的空白区域导致选中第一个]*/
      $this.find('.layui-nav-child').on('click', function (event) {
        event.preventDefault()
        event.stopPropagation()
      })
      // 鼠标悬浮显示的菜单【目前隐藏不显示】
      $this.find('.layui-nav-child-hover').on('click', function (event) {
        event.preventDefault()
        event.stopPropagation()
      })
      /*endregion*/
    })
    /*endregion*/
  o.addClass(e).siblings().removeClass(e),
    r.eq(t).addClass(n).siblings().removeClass(n),
    layui.event.call(this, l, "tab(" + u + ")", {
     elem: c,
     index: t
    })
    /*region 点击顶部tab，实时切换左侧的二级菜单*/
    $('#side').find('.layui-nav-tree li').each(function () {
      var $this_li = $(this);
      $this_li.find('.layui-nav-child dd').each(function () {
        var isActive = $(this).hasClass('layui-this');
        if (isActive) {
          $this_li.parents('ul').find('.layui-nav-item').removeClass('layui-this-parent');
          $this_li.addClass('layui-this-parent');
        }
      })
    })
    /*endregion*/

    /*region 判断当前iframe是否为【首页概况(固定页面不关闭)】时的处理*/
     var dataId = window.parent.$('#layui-tab-list').find('.layui-this').find('i').attr('data-id');
     if (+dataId === 0) {
       $('.layui-nav-tree .layui-nav-child').animate({
         width: 0,
         left: 0
       });
       $('.beg-layout-body, .beg-layout-footer').animate({
         left: '91'
       });
       $('.beg-layout-side').animate({
         width: '91'
       });
       //左侧二级菜单不选中
       $('#side').find('.layui-nav-tree li').removeClass('layui-this-parent');
     } else {
       $('.layui-nav-tree .layui-nav-child').animate({
         width: '129',
         left: 91
       });
       $('.beg-layout-body, .beg-layout-footer').animate({
         left: '220'
       });
       $('.beg-layout-side').animate({
         width: '220'
       });
     }
    /*endregion*/
 },tabDelete:function(i,t){var l=t||a(this).parent(),n=l.index(),s=l.parents(".layui-tab").eq(0),o=s.children(".layui-tab-content").children(".layui-tab-item");l.hasClass(e)&&(l.next()[0]?f.tabClick.call(l.next()[0],null,n+1):l.prev()[0]&&f.tabClick.call(l.prev()[0],null,n-1)),l.remove(),o.eq(n).remove(),setTimeout(function(){f.tabAuto()},50)},
  tabAuto: function () {
    var i = "layui-tab-more",
      l = "layui-tab-bar",
      e = "layui-tab-close", n = this;
    a(".layui-tab").each(function () {
      var s = a(this), o = s.children(".layui-tab-title"),
        c = (s.children(".layui-tab-content").children(".layui-tab-item"), 'lay-stope="tabmore"'),
        r = a('<span class="layui-unselect layui-tab-bar" ' + c + "><i " + c + ' class="layui-icon">&#xe61a;</i></span>');
      if (n === window && 8 != t.ie && f.hideTabMore(!0), s.attr("lay-allowClose") && o.find("li").each(function () {
        var i = a(this);
        if (!i.find("." + e)[0]) {
          var t = a('<i class="layui-icon layui-unselect ' + e + '">&#x1006;</i>');
          t.on("click", f.tabDelete), i.append(t)
        }
      }), o.prop("scrollWidth") > o.outerWidth() + 1) {
        if (o.find("." + l)[0]) return;
        //原本的o.append(r)改成s.append(r)；将下拉菜单放到跟ul同级
        s.append(r), s.attr("overflow", ""), r.on("click", function (a) {
          o[this.title ? "removeClass" : "addClass"](i), this.title = this.title ? "" : "收缩"
        })
      } else o.find("." + l).remove(), s.removeAttr("overflow")
    })
  },hideTabMore:function(i){var t=a(".layui-tab-title");i!==!0&&"tabmore"===a(i.target).attr("lay-stope")||(t.removeClass("layui-tab-more"),t.find(".layui-tab-bar").attr("title",""))},clickThis:function(){var i=a(this),t=i.parents(o),n=t.attr("lay-filter");i.find("."+d)[0]||(t.find("."+e).removeClass(e),i.addClass(e),layui.event.call(this,l,"nav("+n+")",i))},clickChild:function(){var i=a(this),t=i.parents(o),n=t.attr("lay-filter");t.find("."+e).removeClass(e),i.addClass(e),layui.event.call(this,l,"nav("+n+")",i)},showChild:function(){var i=a(this),t=i.parents(o),l=i.parent(),e=i.siblings("."+d);t.hasClass(u)&&(e.removeClass(y),l["none"===e.css("display")?"addClass":"removeClass"](c+"ed"))},collapse:function(){var i=a(this),t=i.find(".layui-colla-icon"),e=i.siblings(".layui-colla-content"),s=i.parents(".layui-collapse").eq(0),o=s.attr("lay-filter"),c="none"===e.css("display");if("string"==typeof s.attr("lay-accordion")){var r=s.children(".layui-colla-item").children("."+n);r.siblings(".layui-colla-title").children(".layui-colla-icon").html("&#xe602;"),r.removeClass(n)}e[c?"addClass":"removeClass"](n),t.html(c?"&#xe61a;":"&#xe602;"),layui.event.call(this,l,"collapse("+o+")",{title:i,content:e,show:c})}};s.prototype.init=function(i){var l={tab:function(){f.tabAuto.call({})},nav:function(){var i,l,e,s=200,p=function(o,c){var r=a(this),f=r.find("."+d);c.hasClass(u)?o.css({top:r.position().top,height:r.children("a").height(),opacity:1}):(f.addClass(y),o.css({left:r.position().left+parseFloat(r.css("marginLeft")),top:r.position().top+r.height()-5}),i=setTimeout(function(){o.css({width:r.width(),opacity:1})},t.ie&&t.ie<10?0:s),clearTimeout(e),"block"===f.css("display")&&clearTimeout(l),l=setTimeout(function(){f.addClass(n),r.find("."+h).addClass(h+"d")},300))};a(o).each(function(){var t=a(this),o=a('<span class="'+r+'"></span>'),y=t.find("."+c);t.find("."+r)[0]||(t.append(o),y.on("mouseenter",function(){p.call(this,o,t)}).on("mouseleave",function(){t.hasClass(u)||(clearTimeout(l),l=setTimeout(function(){t.find("."+d).removeClass(n),t.find("."+h).removeClass(h+"d")},300))}),t.on("mouseleave",function(){clearTimeout(i),e=setTimeout(function(){t.hasClass(u)?o.css({height:0,top:o.position().top+o.height()/2,opacity:0}):o.css({width:0,left:o.position().left+o.width()/2,opacity:0})},s)})),y.each(function(){var i=a(this),t=i.find("."+d);if(t[0]&&!i.find("."+h)[0]){var l=i.children("a");l.append('<span class="'+h+'"></span>')}i.off("click",f.clickThis).on("click",f.clickThis),i.children("a").off("click",f.showChild).on("click",f.showChild),t.children("dd").off("click",f.clickChild).on("click",f.clickChild)})})},breadcrumb:function(){var i=".layui-breadcrumb";a(i).each(function(){var i=a(this),t=i.attr("lay-separator")||">",l=i.find("a");l.find(".layui-box")[0]||(l.each(function(i){i!==l.length-1&&a(this).append('<span class="layui-box">'+t+"</span>")}),i.css("visibility","visible"))})},progress:function(){var i="layui-progress";a("."+i).each(function(){var t=a(this),l=t.find(".layui-progress-bar"),e=l.attr("lay-percent");l.css("width",e),t.attr("lay-showPercent")&&setTimeout(function(){var a=Math.round(l.width()/t.width()*100);a>100&&(a=100),l.html('<span class="'+i+'-text">'+a+"%</span>")},350)})},collapse:function(){var i="layui-collapse";a("."+i).each(function(){var i=a(this).find(".layui-colla-item");i.each(function(){var i=a(this),t=i.find(".layui-colla-title"),l=i.find(".layui-colla-content"),e="none"===l.css("display");t.find(".layui-colla-icon").remove(),t.append('<i class="layui-icon layui-colla-icon">'+(e?"&#xe602;":"&#xe61a;")+"</i>"),t.off("click",f.collapse).on("click",f.collapse)})})}};return layui.each(l,function(i,a){a()})};var p=new s,v=a(document);p.init();var b=".layui-tab-title li";v.on("click",b,f.tabClick),v.on("click",f.hideTabMore),a(window).on("resize",f.tabAuto),i(l,function(i){return p.set(i)})});
