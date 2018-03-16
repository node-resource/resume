'use strict'

var express = require('express');
var body    = require('body-parser');
var cookie  = require('cookie-parser');
var session = require('express-session');

var route = require('./routes');

var app = express();

app.set('views',__dirname + '/static/views');//视图路径
app.set('port',process.env.PORT || 80);//设置端口
app.set('view engine','pug');//设置模版引擎

app.use(express.static(__dirname + '/static'));//设置静态文件目录
app.use(body()); //请求体
app.use(cookie());//设置cookie
app.use(session({
  'secret':'lilaotou',
  'cookie':{'maxAge': 60*60*1000} //60分钟后失效
}));

route.init(app);//启动路由

app.listen(app.get('port'),function() {
  console.log('\n')
  console.info('*************************  ^_^ start ^_^  *************************************')
  console.log('server has been startuped localhost:'+ app.get('port'));
  console.info('*************************  ^_^ end ^_^  *************************************')

});
