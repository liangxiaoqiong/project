/** navbar.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
layui.define(['element', 'common'], function(exports) {
	"use strict";
	var $ = layui.jquery,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element(),
		common = layui.common,
		cacheName = 'tb_navbar';

	var Navbar = function() {
		/**
		 *  默认配置
		 */
		this.config = {
			elem: undefined, //容器
			data: undefined, //数据源
			url: undefined, //数据源地址
			type: 'GET', //读取方式
			cached: false, //是否使用缓存
			spreadOne:false //设置是否只展开一个二级菜单
		};
		this.v = '0.0.1';
	};
	Navbar.prototype.render = function() {
		var _that = this;
		var _config = _that.config;


		if(typeof(_config.elem) !== 'string' && typeof(_config.elem) !== 'object') {
			common.throwError('Navbar error: elem参数未定义或设置出错，具体设置格式请参考文档API.');
		}
		var $container;
		if(typeof(_config.elem) === 'string') {
			$container = $('' + _config.elem + '');
		}
		if(typeof(_config.elem) === 'object') {
			$container = _config.elem;
		}
		if($container.length === 0) {
			common.throwError('Navbar error:找不到elem参数配置的容器，请检查.');
		}
		if(_config.data === undefined && _config.url === undefined) {
			common.throwError('Navbar error:请为Navbar配置数据源.')
		}
		if(_config.data !== undefined && typeof(_config.data) === 'object') {


			var html = getHtml(_config.data);
			$container.html(html);
			element.init();
			_that.config.elem = $container;
		} else {
			if(_config.cached) {
				var cacheNavbar = layui.data(cacheName);
				if(cacheNavbar.navbar === undefined) {
					$.ajax({
						type: _config.type,
						url: _config.url,
						async: false, //_config.async,
						dataType: 'json',
						success: function(result, status, xhr) {
							//添加缓存
							layui.data(cacheName, {
								key: 'navbar',
								value: result
							});
							var html = getHtml(result);
							$container.html(html);
							element.init();
						},
						error: function(xhr, status, error) {
							common.msgError('Navbar error:' + error);
						},
						complete: function(xhr, status) {
							_that.config.elem = $container;
						}
					});
				} else {
					var html = getHtml(cacheNavbar.navbar);
					$container.html(html);
					element.init();
					_that.config.elem = $container;
				}
			} else {
				//清空缓存
				layui.data(cacheName, null);
				$.ajax({
					type: _config.type,
					url: _config.url,
					async: false, //_config.async,
					dataType: 'json',
					success: function(result, status, xhr) {
						var html = getHtml(result);
						$container.html(html);
						element.init();
					},
					error: function(xhr, status, error) {
						common.msgError('Navbar error:' + error);
					},
					complete: function(xhr, status) {
						_that.config.elem = $container;
					}
				});
			}
		}

		//只展开一个二级菜单
		if(_config.spreadOne){
			var $ul = $container.children('ul');
			$ul.find('li.layui-nav-item').each(function(){
				$(this).on('click',function(){
					$(this).siblings().removeClass('layui-nav-itemed');
				});
			});
		}
		return _that;
	};
	/**
	 * 配置Navbar
	 * @param {Object} options
	 */
	Navbar.prototype.set = function(options) {
		var that = this;
		that.config.data = undefined;
		$.extend(true, that.config, options);
		return that;
	};
	/**
	 * 绑定事件
	 * @param {String} events
	 * @param {Function} callback
	 */
	Navbar.prototype.on = function(events, callback) {
		var that = this;
		var _con = that.config.elem;
		if(typeof(events) !== 'string') {
			common.throwError('Navbar error:事件名配置出错，请参考API文档.');
		}
		var lIndex = events.indexOf('(');
		var eventName = events.substr(0, lIndex);
		var filter = events.substring(lIndex + 1, events.indexOf(')'));
		if(eventName === 'click') {
			if(_con.attr('lay-filter') !== undefined) {
				_con.children('ul').find('li').each(function() {
					var $this = $(this);
					$this.on('click', function () {
						var d1 = $this.find('.layui-nav-child dl:nth-child(1) dd:nth-child(2)')
						d1.addClass('layui-this')
						d1.parents('ul').find('.layui-nav-item').removeClass('layui-this-parent');
						d1.parents('.layui-nav-item').addClass('layui-this-parent');//给选择的父级菜单添加样式
						/*lxq 2018-04-09 新增左侧菜单选中 end*/
						var $a = d1.children('a');
						var href = $a.data('url');
						var icon = $a.children('i:first').data('icon');
						var title = $a.children('cite').text();
						var menu_type = d1.attr('title');
						var data = {
							elem: $a,
							field: {
								href: href,
								icon: icon,
								title: title,
								menu_type: menu_type
							}
						}
						callback(data);
					})
					// 有子级点击有效
					if($this.find('dl').length > 0) {
						$this.find('.layui-nav-child dl dd').each(function() {
							$(this).on('click', function(event) {
								/*lxq 2018-04-09 新增左侧菜单选中class start*/
								//点击子级菜单//清空所有选择的父级样式，添加当前点击样式class
								$(this).parents('ul').find('.layui-nav-item').removeClass('layui-this-parent');
								$(this).parents('.layui-nav-item').addClass('layui-this-parent');//给选择的父级菜单添加样式
								/*lxq 2018-04-09 新增左侧菜单选中 end*/
								var $a = $(this).children('a');
								var href = $a.data('url');
								var icon = $a.children('i:first').data('icon');
								var title = $a.children('cite').text();
								var menu_type = $(this).attr('title');
								var data = {
									elem: $a,
									field: {
										href: href,
										icon: icon,
										title: title,
										menu_type: menu_type
									}
								}
								console.log(data)
								callback(data);
								if (event && typeof event.stopPropagation() !== 'undefined') {
									event.stopPropagation()
								}
							});
						});
						$this.find('.layui-nav-child-hover dd').each(function() {
							$(this).on('click', function() {
								/*lxq 2018-04-09 新增左侧菜单选中class start*/
								//点击子级菜单//清空所有选择的父级样式，添加当前点击样式class
								$(this).parents('ul').find('.layui-nav-item').removeClass('layui-this-parent');
								$(this).parents('.layui-nav-item').addClass('layui-this-parent');//给选择的父级菜单添加样式
								/*lxq 2018-04-09 新增左侧菜单选中 end*/
								var $a = $(this).children('a');
								var href = $a.data('url');
								var icon = $a.children('i:first').data('icon');
								var title = $a.children('cite').text();
								var menu_type = $(this).attr('title');
								var data = {
									elem: $a,
									field: {
										href: href,
										icon: icon,
										title: title,
										menu_type: menu_type
									}
								}
								callback(data);
								if (event && typeof event.stopPropagation() !== 'undefined') {
									event.stopPropagation()
								}
							});
						});
					}
				});
			}
		}
	};
	/**
	 * 清除缓存
	 */
	Navbar.prototype.cleanCached = function(){
		layui.data(cacheName,null);
	};
	/**
	 * 获取html字符串
	 * @param {Object} data
	 */
	function getHtml(data) {
		console.log(data);
		var ulHtml = '<ul class="layui-nav layui-nav-tree beg-navbar">';
		for(var i = 0; i < data.length; i++) {
			ulHtml += '<li class="layui-nav-item">';

			// 有子级显示菜单，无子级不显示
			if(data[i].child !== undefined && data[i].child.length > 0) {
				ulHtml += '<a href="javascript:;">';
				if(data[i].icon !== undefined && data[i].icon !== '') {
					if(data[i].icon.indexOf('fa-') !== -1) {
						ulHtml += '<i class="fa ' + data[i].icon + '" aria-hidden="true" data-icon="' + data[i].icon + '"></i>';
					} else {
						ulHtml += '<i class="' + data[i].icon + '"></i>';
					}
				}else{
					ulHtml += '<i class="menu-icon"></i>';
				}
				var short_name = data[i].name
				ulHtml += '<cite>' + short_name + '</cite>'
				ulHtml += '</a>';
				ulHtml += '<div class="layui-nav-child">'
				ulHtml += appendMenuChildHtml(data[i].child);
				ulHtml += '</div>';


				// 鼠标悬浮显示的菜单【目前隐藏不显示】
			/*	ulHtml += '<div class="layui-nav-child-hover">'
				ulHtml += appendMenuChildHtml(data[i].child);
				ulHtml += '</div>';*/
			}
			ulHtml += '</li>';
		}
		ulHtml += '</ul>';

		return ulHtml;
	}

	// 三级菜单html
	function appendMenuChildHtml (menuChild) {
		var ulHtml = '';
		for(var i = 0; i < menuChild.length; i++) {
			var value = menuChild[i];
			ulHtml += '<dl>'
			ulHtml += '<dt class="dl-title">' + value.name + '</dt>'
			for(var j = 0; j < value.child.length; j++) {
				var list = value.child[j];
				ulHtml += '<dd title="'+list.menu_type+'">';
				ulHtml += '<a href="javascript:;" title="  " data-url="' + list.url + '">';
				if(list.icon !== undefined && list.icon !== '') {
					if(list.icon.indexOf('fa-') !== -1) {
						ulHtml += '<i class="fa ' + list.icon + '" data-icon="' + list.icon + '" aria-hidden="true"></i>';
					} else {
						ulHtml += '<i class="' + list.icon + '"></i>';
					}
				}else{
					ulHtml += '<i class="menu-icon"></i>';
				}
				ulHtml += '<cite>' + list.name + '</cite>';
				ulHtml += '</a>';
				ulHtml += '</dd>';
			}
			ulHtml += '</dl>'
		}
		return ulHtml;
	}

	var navbar = new Navbar();

	exports('navbar', function(options) {
		return navbar.set(options);
	});
});
