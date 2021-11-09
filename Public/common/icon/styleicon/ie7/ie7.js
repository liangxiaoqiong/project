/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'styleicon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'styleicon-pickup-card2': '&#xe93d;',
		'styleicon-receipt': '&#xe93e;',
		'styleicon-info': '&#xe940;',
		'styleicon-pickup-card': '&#xe93f;',
		'styleicon-tel': '&#xe93a;',
		'styleicon-home': '&#xe93b;',
		'styleicon-phone': '&#xe93c;',
		'styleicon-add2': '&#xe939;',
		'styleicon-share': '&#xe937;',
		'styleicon-collection': '&#xe938;',
		'styleicon-time': '&#xe936;',
		'styleicon-address1': '&#xe92b;',
		'styleicon-chain-store': '&#xe934;',
		'styleicon-dm-coupon': '&#xe92c;',
		'styleicon-dm-like': '&#xe92d;',
		'styleicon-dm-share': '&#xe92e;',
		'styleicon-dm-comment': '&#xe92f;',
		'styleicon-dm-sign': '&#xe930;',
		'styleicon-dm-goods': '&#xe931;',
		'styleicon-dm-none': '&#xe932;',
		'styleicon-dm-all': '&#xe933;',
		'styleicon-btn-buy': '&#xe92a;',
		'styleicon-right': '&#xe927;',
		'styleicon-info-groupgoods': '&#xe928;',
		'styleicon-check': '&#xe905;',
		'styleicon-user-pickstore': '&#xe903;',
		'styleicon-user-huodongdingdan': '&#xe902;',
		'styleicon-user-youhuiquan': '&#xe900;',
		'styleicon-order-all': '&#xe906;',
		'styleicon-foot-cart': '&#xe90c;',
		'styleicon-foot-home': '&#xe90d;',
		'styleicon-foot-classify': '&#xe90e;',
		'styleicon-foot-user': '&#xe90f;',
		'styleicon-user-zhyaq': '&#xe910;',
		'styleicon-user-dizhi': '&#xe911;',
		'styleicon-user-yue': '&#xe912;',
		'styleicon-user-biaodan': '&#xe913;',
		'styleicon-user-shoucang': '&#xe914;',
		'styleicon-foot-find': '&#xe915;',
		'styleicon-user-hehuoren': '&#xe916;',
		'styleicon-user-lipinka': '&#xe917;',
		'styleicon-user-pingjia': '&#xe918;',
		'styleicon-user-jianglipin': '&#xe91c;',
		'styleicon-user-tuangou': '&#xe91d;',
		'styleicon-user-bdstk': '&#xe91e;',
		'styleicon-user-tuiguang': '&#xe91f;',
		'styleicon-user-yeji': '&#xe920;',
		'styleicon-user-xiazai': '&#xe922;',
		'styleicon-user-gonggao': '&#xe923;',
		'styleicon-user-tgewm': '&#xe924;',
		'styleicon-user-zxcz': '&#xe925;',
		'styleicon-tip': '&#xe904;',
		'styleicon-sort_desc': '&#xe90a;',
		'styleicon-screen': '&#xe919;',
		'styleicon-selected2': '&#xe926;',
		'styleicon-minus': '&#xe91a;',
		'styleicon-add': '&#xe91b;',
		'styleicon-selected': '&#xe921;',
		'styleicon-plus': '&#xe929;',
		'styleicon-shanchu': '&#xe935;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/styleicon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
