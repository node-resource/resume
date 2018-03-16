# Resume

## you can run this project like below step by step
 
> 安装依赖

  npm install 

> 运行查看

  npm start

#####################################

### 结构目录

```
|---- static
|     |---- image //网站静态图片资源管理
|     |---- views
|           |---- actions
|                 |---- login.pug //登录页面
|                 |---- register.pug //注册页面
|                 |---- resetPwd.pug //重置密码页面
|                 |---- resetNickName.pug //重置用户昵称
|           |---- page
|                 |---- home.pug //页面主页  
|           |---- common
|                 |---- header.pug //头部文件
|                 |---- nav.pug //导航菜单
|                 |---- footer.pug //底部文件
|                 |---- style.pug //样式文件
|                 |---- script.pug //脚本文件
|     |---- style
|           |---- common.css //公共文件
|     |---- js
|           |---- common
|                 |---- page.js // 控制页面公共头部，菜单栏，底部区域
|           |---- components //放各个自定义组件
|                 |---- http.js //封装请求
|                 |---- dialog.js // 封装弹框
|           |---- modules	// 放各个模块
|                 |---- file.js //用于读取文件
|           |---- plugins // 引入的各个第三方插件
|           |---- page 
|                 |---- login.js //登录相关 
|                 |---- register.js //注册相关
|                 |---- resetPwd.js //重置密码
|                 |---- resetNickName.js //重置用户名
|---- data
|     |---- user.json  //用户数据
|---- routes
|     |---- action //表示动作，如登录，退出等
|           |---- login.js //登录相关路由
|           |---- help.js //帮助中心路由  如：修改昵称，修改密码
|     |---- page
|           |---- home.js //主页
|     |---- index.js  // 页面路由
|---- logs

``` 







































#####################################

### 热更新 （用于检测代码更新，重新启动服务）

> supervisor

 全局安装：npm i -g supervisor

 查看使用：supervisor --help

 启动服务：supervisor app.js


### express node官网指定的唯一框架

> 
