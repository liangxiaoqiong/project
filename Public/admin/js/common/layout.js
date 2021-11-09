(function () {
	if (typeof version === 'undefined') {
		var date = new Date()
		version = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate()
	}
})()
layui.config({
	version: version,
	base: layout_url
}).use(['element', 'layer', 'navbar', 'tab'], function() {
	var element = layui.element()
	$ = layui.jquery,
		layer = layui.layer,
		navbar = layui.navbar(),
		tab = layui.tab({
			elem: '.layout-nav-card', //设置选项卡容器
			contextMenu:true
		});

	//iframe自适应
	$(window).on('resize', function() {
		var $content = $('.layout-nav-card .layui-tab-content');
		$content.height($(this).height() - 68);
		$content.find('iframe').each(function() {
			$(this).height($content.height());
		});
	}).resize();

	var $menu = $('#menu');
	$menu.find('li.layui-nav-item').each(function() {
		var $this = $(this);
		//绑定一级导航的点击事件
		$this.on('click', function() {
			//获取设置的模块ID
			var id = $this.find('a').data('module-id');
			//这里的数据源只是演示时用的，实际需求可能通过远程读取（根据模块ID来获取对应模块的信息）
			var url = $this.find('a').data('url');
			//alert(url);

			//设置navbar
			navbar.set({
				elem: '#side', //存在navbar数据的容器ID
				url: url
			});
			//渲染navbar
			navbar.render();
			//监听点击事件
			navbar.on('click(side)', function(data) {
				//layer.msg(data.field.href);
				tab.tabAdd(data.field);
			});
		});

	});
	$('.beg-layout-menu').find('a[data-key=0]').click(); // 默认点击第一个一级菜单
	//$('.beg-layout-side .layui-nav-tree').find('.layui-nav-item:first-child').click(); // 默认点击第一个二级菜单的一级
	element.on('nav(user)', function(data) {
		var $a = data.children('a');
		if($a.data('tab') !== undefined && $a.data('tab')) {
			tab.tabAdd({
				title: $a.children('cite').text(),
				icon: 'fa-user',
				href: $a.data('url')
			});
		}
	});

	$('.beg-layout-side-toggle').on('click', function() {
		var sideWidth = $('.beg-layout-side').width();
		var dataId = $('#layui-tab-list').find('.layui-this').find('i').attr('data-id');
		if (+dataId === 0) return false
		if(sideWidth === 220) {
			$('.layui-nav-tree .layui-nav-child, .layui-nav-tree .layui-nav-child-hover').animate({
				left: '0'
			});
			$('.beg-layout-body').animate({
				left: '129'
			});
			$('.beg-layout-footer').animate({
				left: '129'
			});
			$('.beg-layout-side').animate({
				width: '0'
			});
		} else {
			$('.layui-nav-tree .layui-nav-child, .layui-nav-tree .layui-nav-child-hover').animate({
				left: '91'
			});
			$('.beg-layout-body').animate({
				left: '220px'
			});
			$('.beg-layout-footer').animate({
				left: '220px'
			});
			$('.beg-layout-side').animate({
				width: '220px'
			});
		}
	});

	//手机设备的简单适配
    var treeMobile = $('.site-tree-mobile'),
        shadeMobile = $('.site-mobile-shade');
    treeMobile.on('click', function () {
        $('body').addClass('site-mobile');
    });
    shadeMobile.on('click', function () {
        $('body').removeClass('site-mobile');
    });

});
