/**
 * @author   liangxiaoqiong
 * @version  1.0
 * @date 2021/3/24
 */
/*适用于所有端（wap、pc后台、pc商城）的公共函数*/
var commonObj = new Object({
  // 获取当前用户的当前环境
  getUserAgent: function (type) {
    var ua = navigator.userAgent.toLowerCase();
    switch (type) {
      case 'wx': // 微信环境
        return publicWap.isInWX();
        break
      case 'wxMiniProgram': // 在微信小程序[异步问题]
        publicWap.isInWxMiniProgram(function (res) {
          return res;
        })
        break
      case 'wxwork': // 企业微信
        return ua.match(/wxwork/i) == "wxwork";
        break
      default:
        break
    }
  },

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
  // 将base64图片转成图片文件File()
  dataURLtoFile: function (dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  },
  // 富文本编辑器二次处理【视频文件增加封面图】
  getUeditorContent: function (htmlEl, html) {
    return new Promise(function (resolve, reject) {
      document.getElementById(htmlEl).innerHTML = html;
      if (html !== '') {
        var videoList = document.getElementById(htmlEl).getElementsByTagName('video');
        if (videoList.length > 0) {
          var float = 0;
          for (var i = 0; i < videoList.length; i++) {
            var videoDom = videoList[i];
            var poster = videoDom.getAttribute('poster');
            if (commonObj.isEmpty(poster)) {
              var videoSrc = videoDom.getAttribute('src');
              var videoUrlOrigin = videoSrc.split('/');
              var videoPoster = videoDom.getAttribute('poster');
              console.log(videoPoster)
              var noPoster = commonObj.isEmpty(videoPoster) || (!commonObj.isEmpty(videoPoster) && (videoPoster.indexOf('data:image/') > -1)); // 视频文件没有poster封面图
              // 支持跨域截取视频封面的视频域名
              var includeFileOrigin = ['dl.duinin.com', 'lianganzhenxuan.oss-cn-beijing.aliyuncs.com'];
              if (includeFileOrigin.indexOf(videoUrlOrigin[2]) > -1 && noPoster) {
                commonObj.getVideoPoster(videoDom).then(function (posterUrl){
                  if (float === videoList.length - 1) {
                    videoDom.setAttribute('preload', 'none');
                    resolve(document.getElementById(htmlEl).innerHTML);
                  } else {
                    float++;
                  }
                })
              } else {
                if (float === videoList.length - 1) {
                  resolve(document.getElementById(htmlEl).innerHTML);
                } else {
                  float++;
                }
              }
            } else {
              float++;
            }
          }
        } else {
          resolve(document.getElementById(htmlEl).innerHTML);
        }
      } else {
        resolve(document.getElementById(htmlEl).innerHTML);
      }
    })
  },
  // 获取视频第一帧作为封面
  getVideoPoster: function (videoDom, config) {
    return new Promise(function (resolve, reject) {
      videoDom.setAttribute('crossOrigin', 'anonymous');//处理跨域
      videoDom.setAttribute('preload', 'auto');
      videoDom.addEventListener('loadeddata', function () {
        var imgBase64Url = commonObj.getBase64Image(videoDom, {width: videoDom.videoWidth, height: videoDom.videoHeight});
        var file = commonObj.dataURLtoFile(imgBase64Url, '视频封面图.png');
        var form = new FormData();
        form.append('file', file);
        // base64图片上传到文件服务器，临时文件
        $.ajax({
          url: '//file.duinin.com/upload.php?type=6',
          data: form,
          type:'post',
          processData: false,
          contentType: false,
          dataType:'JSON',
          success: function (result) {
            if (result.result === 0) {
              var imgUrl = result.datas.ori_url;
              videoDom.setAttribute('poster', imgUrl);
              resolve(imgUrl);
            } else {
              publicWap.layerMsg(result.debug);
              reject('');
            }
          }
        })
      });
    });
  },

  // 数组去重
  unique: function (array) {
    return Array.from(new Set(array));
  },
  // 将图片文件、视频转base64 =>截取标签区域图片
  getBase64Image: function (dmo, style) {
    var canvas = document.createElement('canvas');
    canvas.width = dmo.width;
    canvas.height = dmo.height;
    if (typeof style !== 'undefined') {
      canvas.width = style.width;
      canvas.height = style.height;
    }
    var ctx = canvas.getContext('2d');
    ctx.drawImage(dmo, 0, 0, canvas.width, canvas.height);
    var ext = (dmo.src.substring(dmo.src.indexOf(".") + 1).toLowerCase()) || 'png';
    return canvas.toDataURL('image/' + ext); // 转换为base64
  },

  // 时间戳转日期格式
  formatTimeString: function (value) {
    var timeStr = '';
    if (typeof value !== 'undefined' && +value > 0) {
      timeStr = publicWap.dateTime_Str(new Date(value*1000));
    }
    return timeStr;
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
