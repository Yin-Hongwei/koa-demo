<h1 align="center">koa-demo</h1>
## Screenshot

![food](https://github.com/Yin-Hongwei/koa-demo/blob/master/static/001.jpg)<br/>

![food](https://github.com/Yin-Hongwei/koa-demo/blob/master/static/002.jpg)<br/>



## Function

前台用vue实现用户登录和列表项的添加、信息修改、删除的操作。

后台用koa实现前台需要的接口。



## Technologies

> koa

> vue



## Build Setup

将sql文件夹中的文件导入数据库

下载本项目到本地

```
git clone https://github.com/Yin-Hongwei/koa-demo.git
```

安装依赖

```
npm install
```

进入server目录，运行下面命令启动服务器（启动前去koa-demo/server/config/db.js中修改Sequelize的前三个参数

```
node app.js
```

再运行下面命令启动前台项目

```
npm run dev
```