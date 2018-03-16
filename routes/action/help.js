'use strict'

var fs = require('../../static/js/modules/file');

var Help = function() {
	this.app = null;
}

Help.prototype = {
	constructor:Help,
	init:function(app) {
		this.app = app;
		this.paintResetPwdPage();//重置密码页面
		this.paintResetNickNamePage();//重置昵称页面
		this.checkOldPwd();//校验旧密码
		this.saveNewPwd();//保存新密码
		this.saveNewNickName();//保存新昵称
	},
	paintResetPwdPage:function() {
		var self = this;
		self.app.get('/user/resetPwd',function(req,res) {
			res.render('actions/resetPwd');
		});
	},
	paintResetNickNamePage:function() {
		var self = this;
		self.app.get('/user/resetNickName',function(req,res) {
			res.render('actions/resetNickName');
		});
	},
	checkOldPwd:function() {
		var self = this;
		self.app.post('/user/checkOldPwd',function(req,res) {
			var old_pwd = req.body.password;
			var uid = req.cookies['userid']; //用户id
			self.getUserList(function(result) {
				var rel = result.filter(function(item) {
	  				return uid === item.userid;
	  			});
	  			var obj = rel[0];
	  			if(obj.password === old_pwd){
	  				return res.json({'success':1,'message':"校验通过"});
	  			}else{
	  				return res.json({'success':0,'message':"旧密码错误"});
	  			}
			});
		});
	},
	saveNewNickName:function() {
		var self = this;
		self.app.post('/user/saveNewNickName',function(req,res) {
			var name = req.body.nickname;
			var uid = req.cookies['userid']; //用户id
			self.getUserList(function(result) {
				var rel = result.some(function(item) {
		  			return item.name === name;
		  		});
				if(rel){ //昵称已被使用
					return res.json({'success':0,message:"用户名已被使用！"})
				}else{
					result.map(function(item) {
						if(item.userid === uid) {
							item.name = name;
						}
					});
					self.addUser(JSON.stringify(result),function(_rel) {
	  					return res.json({'success':1,message:"修改成功",data:name});
	  				});
				}
			});
		});
	},
	saveNewPwd:function() {
		var self = this;
		self.app.post('/user/saveNewPwd',function(req,res) {
			var new_pwd = req.body.password;
			var uid = req.cookies['userid']; //用户id
			self.getUserList(function(result) {
				var rel = result.filter(function(item) {
	  				return uid === item.userid;
	  			});
	  			var obj = rel[0];
	  			if(obj.password === new_pwd){
	  				return res.json({'success':0,'message':"新旧密码一样"});
	  			}else{
	  				result.map(function(item) {
						if(item.userid === uid) {
							item.password = new_pwd;
						}
					});
					self.addUser(JSON.stringify(result),function(_rel) {
	  					return res.json(_rel);
	  				});
	  			}
			});
		});
	},
	getUserList:function(cb) {
	  	fs.readFile('data/user.json',function(err,data) {
	  		if (err) {
				console.error(err);return ;
			} else {
				cb(JSON.parse(data) || []);
			}
	  	});
	},
	addUser:function(data,callback) {
	  	fs.writeFile('data/user.json',data,function(err,data) {
	  		if (err) {
				callback({'success':0, 'message':'操作失败！'});
			} else {
				callback({'success':1, 'message':'操作成功！'});
			}
	  	})
	}
}

module.exports = new Help();