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
  }
})
