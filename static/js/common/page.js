'use strict'

$(function() {

	/*
	* 用于公共页面的头部，左侧菜单及底部区域展示
	* @params
	* 	@fn:events   处理所有事件的集合
	 */

	var Page = function() {
		this.init();
	};

	Page.prototype = {
		constructor:Page,
		init:function() {
			this.events();
			this.paintHead();
		},
		paintHead:function() {
			var username = localStorage.getItem('user');
			$(".visitor").text(username);
		},
		events:function() {
			//退出登录
			$("#logout").click(function() {
				var logout = new Http({
					url:"/user/logout",
					type:"post",
					success:function(res) {
						if(res.success === 1){
							localStorage.removeItem('user');
							location.href = "/";
						}
					}
				});
			});
			//显示下拉菜单
			$(".map-area .visitor").click(function(){
				$(this).toggleClass('up')
					.next().toggleClass('none');
			});
		}
	}

	new Page();

})