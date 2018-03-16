/*
* created by liguang
* @dec : 主要用于用户登录登出业务控制
 */

'use strict'

$(function() {
	/*
	* @params
	* 	 name:用户姓名
	* 	 pwd :用户密码
	 */
  var Login = function() {
  	this.param = {};
  	this.fn();
  };

  Login.prototype = {
  	constructor:Login,
  	getUserInfo:function() {
  		this.param.name = $.trim($("#username").val());
  		this.param.password = $.trim($("#pwd").val());
  	},
  	checkUserInfo:function() {
      var self = this;
      self.getUserInfo();
      if(!this.param.name){
      	$("#username").next().text('请填写用户名');
      	return false;
      }else{
      	$("#username").next().text('');
      }
      if(!this.param.password){
      	$("#pwd").next().text('请填写密码');
      	return false;
      }else{
      	$("#pwd").next().text('');
      }
      return true;
  	},
  	gotoLogin:function() {
  		var self = this;
  		var rel = self.checkUserInfo();
  		if(rel){
  			var http = new Http({
  				url:'/user/login',
  				type:'post',
  				data:self.param,
  				success:function(result) {
  					if(result.success === 0){
  						var til = new Dialog({
				      		content:result.message
				      	});
  					}else{//成功登录
  						localStorage.setItem('user',result.data);
  						location.href = '/home';
  					}
  				}
  			});
  		}
  	},
  	fn:function() {
  		var self = this;
  		$("#login").click(function(){
  			self.gotoLogin();
  		});
  		$('html').keydown(function(event) {
			event.keyCode===13 && $('#login').click();
		});
		$('#register').click(function(event) {
			location.href = '/user/register';
		});
  	}
  }

  var login = new Login();

});
