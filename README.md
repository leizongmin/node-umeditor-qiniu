node-umeditor-qiniu
===================

[![Greenkeeper badge](https://badges.greenkeeper.io/leizongmin/node-umeditor-qiniu.svg)](https://greenkeeper.io/)

支持上传图片到七牛的百度UMeditor编辑器

## 原理

源码目录中的`umeditor`目录为修改过的UMeditor编辑器（版本为1.2.2，只修改了图片上传功能，
文件为`umeditor/dialogs/image/image.js`），在创建编辑器实例前需要定义以下两个全局变量：

+ `QINIU_TOKEN` 上传文件的`upToken`
+ `QINIU_BUCKET_DOMAIN` bucket的域名

以上两个文件通过加载文件`/umeditor/qiniu.init.js`，由服务器自动生成。在实际使用中可以
不依赖Node.js，只要加载修改过的UMeditor，并自行生成`upToken`即可。


## 使用方法

安装：

```bash
$ npm install umeditor-qiniu
```

服务器端代码：

```javascript
var express = require('express');
var UMeditor = require('umeditor-qiniu');

// 初始化编辑器
var editor = new UMeditor({
  path: '/umeditor',  // 路径，可选，默认为 /umeditor
  qiniu: {            // 七牛配置，必须
    accessKey: 'xxx',
    secretKey: 'xxx',
    bucket:    'xxx',
    bucketHost:'xxx.qiniudn.com',
  },
  static: {          // serve-static模块配置，可选
    maxAge:   0,
    hidden:   false,
    redirect: true,
    index:    'index.html',
  }
});

var app = express();

// 在express或connect实例中使用中间件editor.middleware
app.use(editor.middleware);

app.listen(8080);
```

网页代码：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>支持上传图片到七牛的百度UMeditor编辑器</title>
</head>
<body>

  <div id="example-editor"></div>

</body>
</html>
<!-- 载入UMeditor，以下文件可存放在CDN -->
<link rel="stylesheet" href="/umeditor/themes/default/css/umeditor.css">
<script src="/umeditor/third-party/jquery.min.js"></script>
<script src="/umeditor/umeditor.config.js"></script>
<script src="/umeditor/umeditor.min.js"></script>
<script src="/umeditor/plupload/plupload.full.min.js"></script>
<script src="/umeditor/qiniu.min.js"></script>

<!-- 初始化七牛插件，必须由服务器动态生成 -->
<script src="/umeditor/qiniu.init.js"></script>

<!-- 创建编辑器 -->
<script>
var um = UM.getEditor('example-editor');
</script>
```

可参考示例文件： http://127.0.0.1:8080/umeditor/example.html


## License

```
The MIT License (MIT)

Copyright (c) 2014-2016 Zongmin Lei (雷宗民) <leizongmin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
