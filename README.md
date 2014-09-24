node-umeditor-qiniu
===================

支持上传图片到七牛的百度UMeditor编辑器

## 使用方法

服务器端代码：

```javascript
var express = require('express');
var UMeditor = require('umeditor-qiniu');

var editor = new UMeditor(
  path: '/umeditor',  // 路径
  qiniu: {            // 七牛配置
    accessKey: 'xxx',
    secretKey: 'xxx',
    bucket:    'xxx',
    bucketHost:'xxx.qiniudn.com',
  },
  static: {          // serve-static模块配置
    maxAge:   0,
    hidden:   false,
    redirect: true
    index:    'index.html'
  }
);

var app = express();
app.use(editor.middleware);

app.listen(8080);
```

网页代码：

```html
<!-- 载入UMeditor，以下文件可存放在CDN -->
<link rel="stylesheet" href="/umeditor/themes/default/css/umeditor.css">
<script src="/umeditor/third-party/jquery.min.js"></script>
<script src="/umeditor/umeditor.config.js"></script>
<script src="/umeditor/umeditor.min.js"></script>
<script src="/umeditor/qiniu.js"></script>

<!-- 初始化七牛插件，必须由服务器动态生成 -->
<script src="/umeditor/qiniu.init.js"></script>
```
