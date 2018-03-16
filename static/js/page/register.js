/*
* created by liguang
* @dec : 主要用于用户注册业务控制
 */

'use strict'

$(function() {
	/*
	* @params
	* 	 name:用户姓名
	* 	 password :用户密码
	 */
  var Register = function() {
  	this.param = {};
  	this.fn();
  };

  Register.prototype = {
  	constructor:Register,
  	getParam:function() {
  		this.param.name = $.trim($("#username").val());
  		this.param.password = $.trim($("#pwd").val());
  		this.param.passwordSure = $.trim($("#pwd-sure").val());
  	},
  	checkParam:function() {
  		var self = this;
  		self.getParam();
  		if(self.param.name) {
  			$("#username").next().text('');
  		}else{
  			$("#username").next().text('请填写用户名！');return false;
  		}
  		if(self.param.password) {
  			$("#pwd").next().text('');
  		}else{
  			$("#pwd").next().text('请填写密码！');return false;
  		}
  		if(self.param.password !== self.param.passwordSure) {
  			$("#pwd-sure").next().text('两次密码不一致！');return false;
  		}else{
  			$("#pwd-sure").next().text('');
  		}
  		return true;
  	},
  	gotoRegister:function() {
  		var self = this;
  		var rel = self.checkParam();
  		if(rel){
  			var http = new Http({
  				url:'/user/register',
  				type:'post',
  				data:self.param,
  				success:function(result) {
  					if(result.success === 0){
  						var til = new Dialog({
				      		content:result.message
				      	});
  					}else{//成功注册
  						location.href = '/';
  					}
  				}
  			});
  		}
  	},
  	fn:function() {
  		var self = this;
  		$("#submit").click(function() {
  			self.gotoRegister();
  		});
  		$("#cancel").click(function() {
  			location.href = '/';
  		});
  	}
  }

  var register = new Register();

});
