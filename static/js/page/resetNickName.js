'use strict'

$(function() {
	
	var NickName = function() {
		this.name = null;
		this.init();
	}
	NickName.prototype = {
		constructor:NickName,
		init:function() {
			this.events();
		},
		checkParam:function() {
			var self = this;
			var _ele = $("#nickname");
			self.name = $.trim($("#nickname").val());
			if(self.name){
				var http = new Http({
	  				url:'/user/saveNewNickName',
	  				type:'post',
	  				data:{nickname:self.name},
	  				success:function(result) {
	  					var til = new Dialog({
					      		content:result.message
					      	});
	  					if(result.success === 1){
	  						localStorage.setItem("user",result.data);
	  						history.back();
	  					}
	  				}
	  			});
			}else{
				_ele.next().text("昵称不能为空！");
			}
		},
		events:function() {
			var self = this;
			$("#submit").click(function() {
				self.checkParam();
			});
			$("#cancel").click(function() {
				history.back();
			});
		}
	}

	var nickname = new NickName();
})