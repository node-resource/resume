/*
* created by liguang 
* @dec :读取文件操作
 */

var fs = require('fs');

module.exports = {
	readFile:function(path,callback) {
		fs.readFile(path, 'utf-8', function(err, data) {
			callback(err, data);
		});
	},
	writeFile:function(path,data,callback) {
		fs.writeFile(path, data, 'utf-8', function(err) {
			callback(err);
		});
	}
}