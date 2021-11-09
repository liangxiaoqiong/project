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
		el.innerHTML = '<span style="font-family: \'xxicon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'xxicon-menu-hezuo': '&#xe902;',
		'xxicon-menu-baobiao': '&#xe90e;',
		'xxicon-menu-caiwu': '&#xe90f;',
		'xxicon-menu-daili': '&#xe910;',
		'xxicon-menu-dingdan': '&#xe911;',
		'xxicon-menu-faxian': '&#xe912;',
		'xxicon-menu-fenxiao': '&#xe913;',
		'xxicon-menu-huiyuan': '&#xe914;',
		'xxicon-menu-jinxiao': '&#xe915;',
		'xxicon-menu-mendian': '&#xe916;',
		'xxicon-menu-shangcheng': '&#xe917;',
		'xxicon-menu-shangpin': '&#xe918;',
		'xxicon-menu-shouyin': '&#xe919;',
		'xxicon-menu-yingxiao': '&#xe91a;',
		'xxicon-menu-yuangong': '&#xe91b;',
		'xxicon-menu-zengzhi': '&#xe91c;',
		'xxicon-bells': '&#xe91d;',
		'xxicon-chuku': '&#xe91e;',
		'xxicon-ruku': '&#xe91f;',
		'xxicon-order-0': '&#xe920;',
		'xxicon-msg-1': '&#xe921;',
		'xxicon-chart': '&#xe901;',
		'xxicon-star-0': '&#xe924;',
		'xxicon-star-1': '&#xe925;',
		'xxicon-emoji': '&#xe926;',
		'xxicon-shop': '&#xe928;',
		'xxicon-sms': '&#xe929;',
		'xxicon-plus': '&#xe92a;',
		'xxicon-remove': '&#xe92b;',
		'xxicon-scan': '&#xe92c;',
		'xxicon-img': '&#xe92d;',
		'xxicon-lock-0': '&#xe92e;',
		'xxicon-lock-1': '&#xe92f;',
		'xxicon-bulb': '&#xe930;',
		'xxicon-wx': '&#xe931;',
		'xxicon-msg': '&#xe932;',
		'xxicon-user': '&#xe933;',
		'xxicon-import': '&#xe90a;',
		'xxicon-save': '&#xe907;',
		'xxicon-checked-2': '&#xe908;',
		'xxicon-search': '&#xe905;',
		'xxicon-export': '&#xe904;',
		'xxicon-checked': '&#xe900;',
		'xxicon-clear-cache': '&#xe96b;',
		'xxicon-password': '&#xe978;',
		'xxicon-phone': '&#xe979;',
		'xxicon-sign-out': '&#xe97a;',
		'xxicon-right': '&#xe927;',
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
		c = c.match(/xxicon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
