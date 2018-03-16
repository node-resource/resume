'use strict'

var fs = require('../../static/js/modules/file');

function Login() {
  this.app = null;
}

Login.prototype = {
  constructor:Login,
  init:function(app) {
  	this.app = app;
  	this.paintLoginPage();//登录页
  	this.paintRegisterPage();//注册页面
  	this.login(); //开始登录
  	this.register();//开始注册
  	this.logout();//开始退出
  },
  paintLoginPage:function() {
  	var self = this;
  	self.app.get('',function(req,res) {
  		if(req.session.token && req.session.token == req.cookies.token){ //如果已经登录
  			res.redirect('/home');
  		}else{
  			res.render('actions/login');
  		}
  	});
  },
  login:function() {
  	var self = this;
  	self.app.post('/user/login',function(req,res,next) {
  		var user = {
  			'name' : req.body.name,
  			'password' : req.body.password
  		};
  		self.getUserList(function(result) {
  			var rel = result.filter(function(item) {
  				return user.name === item.name;
  			});
  			if(rel.length > 0){
  				var _data = rel[0];
  				if(_data.password === user.password){
  					req.session.token = Date.now() + "";
		  			req.session.user = _data.name;
		  			res.cookie('token',req.session.token,{'maxAge':30*60*1000}); 
		  			res.cookie('userid',_data.userid,{'maxAge':30*60*1000});
		  			return res.json({'success':1,'message':"",'data':_data.name});
  				}else{
  					return res.json({'success':0,'message':"用户密码错误"});
  				}  				
  			}else{
  				return res.json({'success':0,'message':"用户名不存在！"})
  			}
	  	});
  	});
  },
  logout:function() {
  	var self = this;
  	self.app.post('/user/logout',function(req,res) {
  		console.log(req.cookies['userid'])//获取cookie信息
  		res.clearCookie('token');
  		res.clearCookie('userid');
  		res.json({success:1,message:""});
  	});
  },
  paintRegisterPage:function() {
  	this.app.get('/user/register',function(req,res) {
  		res.render('actions/register');
  	});
  },
  register:function() {
  	var self = this;
  	self.app.post('/user/register',function(req,res,next) {
  		var user = {
  			'name' : req.body.name,
  			'password' : req.body.password
  		};
  		self.getUserList(function(result) {
  			var rel = result.some(function(item) {
	  			return item.name === user.name;
	  		});
	  		if(rel){
  				return res.json({'success':0,message:"用户名已被使用！"})
	  		}else{
	  			user.userid = Date.now() +"";
	  			result.push(user);
  				self.addUser(JSON.stringify(result),function(_rel) {
  					return res.json({success:1,data:user.name});
  				});
	  		}
	  	});
  	});
  },
  addUser:function(data,callback) {
  	fs.writeFile('data/user.json',data,function(err,data) {
  		if (err) {
			callback({'success':0, 'message':'用户信息写入失败！'});
		} else {
			callback({'success':1, 'message':'添加用户成功！'});
		}
  	})
  },
  getUserList:function(cb) {
  	fs.readFile('data/user.json',function(err,data) {
  		if (err) {
			console.error(err);return ;
		} else {
			cb(JSON.parse(data) || []);
		}
  	});
  }
}

module.exports = new Login();