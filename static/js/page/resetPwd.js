'use strict'

$(function() {
	var Pwd = function() {
		this.init();
		this.oldPwd = null; //旧密码
		this.param = {}; //新密码
	}
	Pwd.prototype = {
		constructor:Pwd,
		init:function() {
			var self = this;
			self.events();
		},
		checkOldPwd:function() {//校验旧密码
			var self = this;
			var _ele = $("#pwd-old");
			self.oldPwd = $.trim(_ele.val());
			if(self.oldPwd){
				_ele.next().text("");
				var http_old = new Http({
	  				url:'/user/checkOldPwd',
	  				type:'post',
	  				data:{password:self.oldPwd},
	  				success:function(result) {
	  					if(result.success === 0){
	  						_ele.next().text(result.message);
	  					}else{//校验通过
	  						_ele.prop("disabled",true);
	  						self.allowResetPwd();
	  					}
	  				}
	  			});
			}else{
				_ele.next().text("请输入原密码！");
			}
		},
		allowResetPwd:function() { 
			$("#pwd-new,#pwd-new-sure").prop("disabled",false);
			$("#submit").removeClass('btn-disable');
		},
		getParams:function() {
			this.param.new_pwd = $.trim($("#pwd-new").val());
			this.param.new_pwd_ok = $.trim($("#pwd-new-sure").val());
		},
		checkNewPwd:function() {
			var self = this;
	  		self.getParams();
	  		if(self.param.new_pwd) {
	  			$("#pwd-new").next().text('');
	  		}else{
	  			$("#pwd-new").next().text('请填写新密码！');return false;
	  		}
	  		if(self.param.new_pwd_ok) {
	  			$("#pwd-new-sure").next().text('');
	  		}else{
	  			$("#pwd-new-sure").next().text('请再次填写新密码！');return false;
	  		}
	  		if(self.param.new_pwd_ok !== self.param.new_pwd) {
	  			$("#pwd-new-sure").next().text('两次密码不一致！');return false;
	  		}else{
	  			$("#pwd-new-sure").next().text('');
	  		}
	  		return true;
		},
		saveNewPwd:function() {
			var self = this;
	  		var rel = self.checkNewPwd();
	  		if(rel){
	  			var http = new Http({
	  				url:'/user/saveNewPwd',
	  				type:'post',
	  				data:{password:self.param.new_pwd},
	  				success:function(result) {
	  					var til = new Dialog({
					      		content:result.message
					      	});
	  					if(result.success === 1){//重置成功
	  						history.back();
	  					}
	  				}
	  			});
	  		}
		},
		events:function() {
			var self = this;
			$("#pwd-old").blur(function() { //校验旧密码
				self.checkOldPwd();
			});
			$("#submit").click(function() {
				if($(this).hasClass('btn-disable')) return;
				self.saveNewPwd();
			});
			$("#cancel").click(function() {
				history.back();
			});
		}
	}

	var pwd = new Pwd();
});