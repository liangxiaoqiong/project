/**
 * @author   liangxiaoqiong
 * @version  1.0
 * @date 2021/3/25
 */
/*适用于wap端的公共函数*/
var wapObj = new Object({

  /**region diy主题色 */
  /*  var allStyle = {
      selectedScheme: '{$allStyle["selectedScheme"]}' || '1', // 1-11,diy
      type: '{$allStyle["type"]}', // wx
      //class: '{$allStyle["class"]}', // store-style-selectedScheme
      mainColor: '{$allStyle["mainColor"]}', // 主色【selectedScheme===diy】
      secondaryColor: '{$allStyle["secondaryColor"]}', // 副色【selectedScheme===diy】
    }*/
  // 固定的11种主题色
  styleDiyColor1: ['#da373a', '#FF5E15', '#FF547B', '#FF4444', '#FDC600', '#333333', '#65C4AA', '#09BB07', '#6CBF72', '#4A90E2', '#C3A769'],
  styleDiyColor2: ['#F1893C', '#FF9300', '#FFE7E9', '#555555', '#1D262E', '#ffffff', '#DDF3EC', '#333333', '#E1F3E2', '#DBE9FA', '#F3EEE1'],
  setThemeColor: function () {
    var mainColor = this.styleDiyColor1[0]
    var secondaryColor = this.styleDiyColor2[0]
    if (typeof allStyle !== 'undefined' && typeof allStyle.selectedScheme !== 'undefined') {
      if (allStyle.selectedScheme === 'diy') {
        mainColor = allStyle.mainColor;
        secondaryColor = allStyle.secondaryColor;
      } else {
        mainColor = this.styleDiyColor1[+allStyle.selectedScheme - 1];
        secondaryColor = this.styleDiyColor2[+allStyle.selectedScheme - 1];
      }
    }
    this.changeThemeCss(mainColor, secondaryColor);
  },
  /* region 修改diy主题色
  * mainColor-主色
  * secondaryColor-副色
  * */
  changeThemeCss: function (mainColor, secondaryColor) {
    document.body.style.setProperty('--main-color', mainColor);
    document.body.style.setProperty('--main-color-opacity003', commonObj.colorToRGB(mainColor, 0.03));
    document.body.style.setProperty('--main-color-opacity005', commonObj.colorToRGB(mainColor, 0.05));
    document.body.style.setProperty('--main-color-opacity008', commonObj.colorToRGB(mainColor, 0.08));
    document.body.style.setProperty('--main-color-opacity01', commonObj.colorToRGB(mainColor, 0.1));
    document.body.style.setProperty('--main-color-opacity018', commonObj.colorToRGB(mainColor, 0.18));
    document.body.style.setProperty('--main-color-opacity02', commonObj.colorToRGB(mainColor, 0.2));
    document.body.style.setProperty('--main-color-opacity03', commonObj.colorToRGB(mainColor, 0.3));
    document.body.style.setProperty('--main-color-opacity04', commonObj.colorToRGB(mainColor, 0.4));
    document.body.style.setProperty('--main-color-opacity05', commonObj.colorToRGB(mainColor, 0.5));
    document.body.style.setProperty('--main-color-opacity09', commonObj.colorToRGB(mainColor, 0.9));
    document.body.style.setProperty('--secondary-color', secondaryColor);
    if (typeof allStyle !== 'undefined' && typeof allStyle.selectedScheme !== 'undefined') {
      if (+allStyle.selectedScheme === 3 || +allStyle.selectedScheme === 7 || +allStyle.selectedScheme === 9 || +allStyle.selectedScheme === 10 || +allStyle.selectedScheme === 11) {
        $('.goods-info-foot .foot-right a.bg-diy-sub').css('color', mainColor);
      } else {
        $('.goods-info-foot .foot-right a.bg-diy-sub').css('color', '#ffffff');
      }
    }
  },
  /**endregion*/
  layerConfirm: function (config, callbackYes, callbackCancel, callbackEnd) {
    var that = this;
    layer.confirm('', {
      title: config.title,
      skin: 'layer-skin-confirm',
      offset: ['30%', ''],
      btn: ['确定', '取消'],
      success: function () {
        // 弹框打开成功
      },
      end: function (index) {
        if (typeof callbackEnd !== 'undefined') {
          callbackEnd(index)//取消后的回调
        }
      },
      yes: function (index) {
        callbackYes(index)//确定后的回调
      },
      cancel: function (index) {
        if (typeof callbackCancel !== 'undefined') {
          callbackCancel(index)//取消后的回调
        }
      }
    })
  },
  layerLoading: function () {
    var layerLoad = layer.load(0, {time: 2000, offset: ['30%', ''], shade: 0});
    $('.layui-layer-loading0').html('<div></div><div></div><div></div>');
    return layerLoad;
  }
})
wapObj.setThemeColor();
$(function () {
  wapObj.setThemeColor();
})
