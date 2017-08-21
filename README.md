# simpchat

> websocket

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 安装注意:
  
1. 安装过程中需要对node文件进行编译，因此需要电脑安装安装有个下列模块:

* node-gyp
* node-pre-gyp

可以通过 `npm list -g --depth=0` 来查看电脑的顶级模块是否安装

2. 项目中使用了vue-cli的脚手架，因此安装过程中可能回报如下错误`[PhantomJS not found on PATH]`

解决办法:
 
 * linux/macos:
    
        在用户目录下打开`.npmrc`文件，在文件末尾添加:
        
        sass_binary_site = https://npm.taobao.org/mirrors/node-sass/
        phantomjs_cdnurl = https://npm.taobao.org/mirrors/phantomjs/
  
 在项目中也使用了node-sass和sass-loader因此需要安装sass，在安装中也可能会报错不能下载一个压缩包，需要手动在`.npmrc`中配置下载地址
