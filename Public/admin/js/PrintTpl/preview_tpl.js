
/*打印、预览*/
var diyPrintTpl = new Object({
  /**region dragsize 拖拽拉伸*/
  // 元素块样式style[表格：不限制高度]
  drsElementStyle: function (item) {
    var styleArr = {
      left: item.left,
      top: item.top,
      width: item.width,
      zIndex: item.zIndex,
    }
    if (item.type !== 'order-table') {
      styleArr.height = item.height
    }
    return styleArr
  },
  //元素块内容样式style,打印的时候order-table不执行height
  drsContentStyle: function (item, act) {
    var style = {
      left: item.left,
      // top: item.top,
      width: item.width,
      height: item.height,
      zIndex: item.zIndex,
      color: item.color,
      fontFamily: item.fontFamily + '!important',
      fontSize: item.fontSize,
      fontWeight: +item.isFontBold === 1 ? 'bold' : '',
      fontStyle: +item.isFontSlant === 1 ? 'italic' : '',
      textDecoration: +item.isFontUnderline === 1 ? 'underline' : '',
      textAlign: item.textAlign,
      lineHeight: item.lineHeight,
    }
    if (typeof act === 'undefined' && item.type === 'order-table') {
      style.height = null;
    }
    return style
  },
  /**endregion*/

  /**region type='order-table'，表格*/
  // 显示的表格项个数
  tableCheckedItemLen: function (item) {
    var len = 0
    item.checkedItem.forEach(function (value) {
      if (+value.is_checked === 1) {
        len++
      }
    })
    return len
  },
  /*region 热敏打印*/
  //表格td宽度，热敏打印，均分
  tableTdWidth: function (tpl, item, table) {
    if (+tpl.tpl_type === 4) {
      var tdWidth = (100 / diyPrintTpl.tableCheckedItemLen(item)) + '%'
      return tdWidth
    } else {
      return (+table.width - 1) + 'px';
    }
  },
  //是否显示【品名】
  isCheckedGoodsName: function (item) {
    var result = false
    item.checkedItem.forEach(function (value) {
      if (value.type === 'goods_name' && +value.is_checked === 1) {
        result = true
      }
    })
    return result
  },
  /*endregion*/

  //商品合计：数量、价格
  tableGoodsTotal: function (depot) {
    var num = 0
    var price = 0
    depot.goodsList.forEach(function (valGoods) {
      var goods_num = +valGoods.num || +valGoods.units_num;
      num = num + (+goods_num)
      price = price + (+valGoods.total_price)
    })
    return {num: num, price: parseFloat(price).toFixed(2)}
  },
  //商品小计：数量、价格（双表格时，计算当前页2个表格的合计）
  tableGoodsSubTotal: function (goodsTableList, tpl) {
    var num = 0
    var price = 0
    goodsTableList.forEach(function (valGoods, inGoods) {
      var goods_num = +valGoods.num || +valGoods.units_num;
      if (typeof valGoods.type === 'undefined' ||
        (typeof valGoods.type !== 'undefined' && valGoods.type !== 'blank_line' && valGoods.type !== 'sub_total' && valGoods.type !== 'total')) {
        if (+tpl.tpl_config.table_num === 2) {
          num = num + (goods_num)
          price = price + (+valGoods.total_price)
        } else {
          num = num + (goods_num)
          price = price + (+valGoods.total_price)
        }
      }
    })
    return {num: num, price: parseFloat(price).toFixed(2)}
  },
  //正则替换变量
  paramReplace: function (params_data, tpl) {
    var result = ''
    try {
      if (tpl.type === 'custom-text') {
        result = tpl.content
      } else {
        var isInclude = false
        for (var key in params_data) {
          var value = params_data[key]
          if (value == null) {
            value = '';
          }
          if (tpl.type == key) {
            if (key === 'ORDER_QR_CODE') {
              result = value
            } else {
              var reg = (new RegExp("<a contenteditable=\"false\">(.*)<\/a>","ig")).exec(tpl.content)
              result = tpl.content.replace(reg[1], value)
              result = result.replace(/<[^>].*?>/g,"") //去除字符串中的html标签
            }
            isInclude = true
            throw Error();
          }
        }
        if (!isInclude) {
          var reg = (new RegExp("<a contenteditable=\"false\">(.*)<\/a>","ig")).exec(tpl.content)
          result = tpl.content.replace(reg[1], '')
          result = result.replace(/<[^>].*?>/g,"") //去除字符串中的html标签
        }
      }
    } catch (e) {}
    return result
  },
  // 打印时表格自定义样式
  printTableStyle: function (item) {
    return {
      marginLeft: item.left,
      width: item.width,
      color: item.color,
      fontFamily: item.fontFamily, // + '!important',
      fontSize: item.fontSize || '12px',
      fontWeight: +item.isFontBold === 1 ? 'bold' : '',
      fontStyle: +item.isFontSlant === 1 ? 'italic' : '',
      textDecoration: +item.isFontUnderline === 1 ? 'underline' : '',
      textAlign: item.textAlign,
      lineHeight: item.lineHeight,
    }
  },
  /**endregion*/
})
