/*
* 关于数据请求
* created by liguang
* @params 参数列表参照ajax
 */

var Http = function(opt) {
	this.url = opt.url || "";
	this.type = opt.type || 'get';
	this.dataType = opt.dataType || 'json';
	this.data = opt.data || {};
	this.timeout = 10*1000;
	this.async = opt.async !== false;
	this.cache = opt.cache !== false;
	this.contentType = opt.contentType || "application/x-www-form-urlencoded";

	this.beforeSend = opt.beforeSend || null;
	this.success = opt.success || null;
	this.error = opt.error || null;
	this.complete = opt.complete || null;

	this.send();
}
Http.prototype = {
	constructor:Http,
	send:function() {
		var self = this;
		$.ajax({
			url:self.url,
			type:self.type,
			dataType:self.dataType,
			data:self.data,
			timeout:self.timeout,
			async:self.async,
			cache:self.cache,
			contentType:self.contentType,
			beforeSend:function() {
				self.beforeSend && self.beforeSend();
			},
			success:function(result) {
				self.success && self.success(result);
			},
			error:function(result) {
				self.error && self.error(result);
			},
			complete:function() {
				self.complete && self.complete();
			}
		});
	}
}

//module.exports = Http;