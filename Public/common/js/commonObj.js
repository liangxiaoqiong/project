/**
 * @author   liangxiaoqiong
 * @version  1.0
 * @date 2021/3/24
 */
/*适用于所有端（wap、pc后台、pc商城）的公共函数*/
var commonObj = new Object({
  colorToRGB: function (val, opa) {
    var pattern = /^(#?)[a-fA-F0-9]{6}$/; //16进制颜色值校验规则
    var isOpa = typeof opa == 'number'; //判断是否有设置不透明度

    if (!pattern.test(val)) { //如果值不符合规则返回空字符
      return '';
    }

    var v = val.replace(/#/, ''); //如果有#号先去除#号
    var rgbArr = [];
    var rgbStr = '';

    for (var i = 0; i < 3; i++) {
      var item = v.substring(i * 2, i * 2 + 2);
      var num = parseInt(item, 16);
      rgbArr.push(num);
    }

    rgbStr = rgbArr.join();
    rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
    return rgbStr;
  },

  // 非空判断
  isEmpty: function (ObjVal) {
    if ((ObjVal == null || typeof (ObjVal) == "undefined") || (typeof (ObjVal) == "string" && ObjVal == "" && ObjVal != "undefined")) {
      return true;
    } else {
      return false;
    }
  },
  /*
  //精确小数点
  //number：为你要转换的数字
  //digitalNum：要保留几位小数；譬如要保留2位，则值为2
  //zerFill:是否补零。不需要补零可以不填写此参数,[true/false],默认:false
  * */
  digitalFloatSync: function (number,digitalNum,zeroFill) {
    var format = typeof digitalNum !== 'undefined' ? digitalNum : 2;
    //判断非空
    if (!this.isEmpty(number)) {
      //正则匹配:正整数，负整数，正浮点数，负浮点数
      if (!/^\d+(\.\d+)?$|^-\d+(\.\d+)?$/.test(number))
        return number;
      var n=1;
      for(var i=0;i<format;i++){
        n=n*10;
      }

      //四舍五入
      number=Math.round(number*n)/n;

      //是否补零
      if(zeroFill){
        return number.toFixed(format);
      }
      return number;
    }
    return number;
  },
})
