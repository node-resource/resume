'use strict'

function Home() {
  this.app = null;
}

Home.prototype = {
  constructor:Home,
  init:function(app) {
  	this.app = app;
  	this.render();
  },
  render:function() {
  	var self = this;
  	self.app.get('/home',function(req,res) {
  		res.render('page/home');
  	})
  }
}

module.exports = new Home();