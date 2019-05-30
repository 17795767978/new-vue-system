# nocturne.vue.platform

##  文档
这里提供了一份详细的文档说明，[点此查看](https://nocturne-doc.vicco.wang/)

##  使用指南

### 启动项目

我们一般习惯在第一次获取项目后首先执行以下代码来获取项目相关依赖

```
npm i
```

在获取完毕依赖后,我们即可启动项目了:

```
// start mockserver
npm run mockServer

// start project
npm start
```

启动完毕后,如果一切正常,你应该能看到控制台打印如下代码:

```
DONE Compiled successfully in 23713ms

  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.0.1:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.

```

OK! 大功告成, 我们可以通过以上地址访问项目了. :P


#### 生产环境打包

我们通过以下指令即可完成生产环境的打包
```
npm run build:admin
```

#### 打包文件结构分析
如果我们想查看打包后的文件结构,可以执行以下指令
```
npm run analyz:admin
```
