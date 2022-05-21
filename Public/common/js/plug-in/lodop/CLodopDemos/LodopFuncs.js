//本JS是加载Lodop服务的综合示例，可直接使用，建议看懂后融进自己页面程序

var LoadJsState,LodopIsWinLocal;

//加载Lodop时用双端口(http是8000/18000,而https是8443/8444)以防其中某端口被占,
//主JS文件“Lodop.js”是固定文件名，JS内容是动态的，与当前打印环境有关:
function loadLodop() {
    if (LoadJsState == "loading" || LoadJsState == "complete") return;
    LoadJsState = "loading";
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var JS1 = document.createElement("script");
    var JS2 = document.createElement("script");
    if (window.location.protocol=='https:') {
      JS1.src = "https://localhost.lodop.net:8443/Lodop.js";
      JS2.src = "https://localhost.lodop.net:8444/Lodop.js";
    } else {
      JS1.src = "http://localhost:8000/Lodop.js";
      JS2.src = "http://localhost:18000/Lodop.js";
    }
    JS1.onload  = JS2.onload  = function()    {LoadJsState = "complete";}
    JS1.onerror = JS2.onerror = function(evt) {LoadJsState = "complete";}
    head.insertBefore(JS1, head.firstChild);
    head.insertBefore(JS2, head.firstChild);
    LodopIsWinLocal = !!((JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i));
    LodopIsWinLocal= LodopIsWinLocal && (navigator.platform.indexOf("Win")==0);
}

loadLodop();//开始加载

//==获取LODOP对象的主过程，判断是否安装、需否升级:==
function getLodop() {
    var strLodopInstall_1 = "<br><font color='#FF00FF'>Web打印服务Lodop未安装启动，点击这里<a href='Lodop_setup.zip' target='_self'>下载执行安装</a>";
    var strLodopInstall_2 = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
    var strLodopInstall_3 = "，成功后请刷新本页面。</font>";
    var strLodopUpdate = "<br><font color='#FF00FF'>Web打印服务Lodop需升级!点击这里<a href='Lodop_setup.zip' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
    var LODOP;
    try {
        try {
            LODOP = getCLodop();
        } catch (err) {}
        if (!LODOP && LoadJsState !== "complete") {
            if (LoadJsState == "loading") alert("网页还没下载完毕，请稍等一下再操作."); else alert("没有加载Lodop的主JS，请先执行loadLodop()过程");
            return;
        }
        if (!LODOP) {
            document.body.innerHTML = strLodopInstall_1 + (LodopIsWinLocal ? strLodopInstall_2 : "") + strLodopInstall_3 + document.body.innerHTML;
            return;
        } else {
            if (LODOP.VERSION < "7.0.3.9") {
                document.body.innerHTML = strLodopUpdate + document.body.innerHTML;
            }
        }
        //======获取成功后，如下空白位置适合调用统一功能(如注册语句等):======


        //===================================================================
        return LODOP;
    } catch (err) {
        alert("getLodop出错:" + err);
    }
}
