/**
 * 支持上传图片到七牛的百度UMeditor编辑器
 *
 * @author 老雷 <leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');
var connect = require('connect');
var serveStatic = require('serve-static');
var qiniu = require('qiniu');
var debug = require('debug')('umeditor:qiniu');


var UMEDITOR_DIR = path.resolve(__dirname, '../umeditor');

function UMeditor (options) {
  options = options || {};
  this.options = options;

  options.path = options.path || '/umeditor';

  qiniu.conf.ACCESS_KEY = options.qiniu.accessKey;
  qiniu.conf.SECRET_KEY = options.qiniu.secretKey;

  var me = this;
  var mw = this.middleware = connect();
  mw.use(options.path + '/qiniu.init.js', function (req, res, next) {
    me._responseQiniuInit(res);
  });
  mw.use(options.path, serveStatic(UMEDITOR_DIR, options.static));
}

UMeditor.prototype._responseQiniuInit = function (res) {
  var putPolicy = new qiniu.rs.PutPolicy(this.options.qiniu.bucket);
  var token = putPolicy.token();
  res.end();
};

module.exports = exports = UMeditor;
