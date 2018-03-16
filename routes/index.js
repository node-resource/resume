'use strict'

var login = require('./action/login'); //登录相关路由
var help = require('./action/help'); //帮助中心相关路由
var home = require('./page/home'); //登录成功后首页路由

function Router() {
	this.app = null;
}

Router.prototype = {
	constructor:Router,
	init:function(app) {
		this.app = app;
		this.startup();
	},
	startup:function() {
	   var app = this.app;
       login.init(app);
       home.init(app);
       help.init(app);
	}
}

module.exports = new Router();