node-umeditor-qiniu
===================

支持上传图片到七牛的百度UMeditor编辑器

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
var editor = new UMeditor(
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
    redirect: true
    index:    'index.html'
  }
);

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


