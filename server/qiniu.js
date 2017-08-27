const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const qiniu = require('qiniu')
const path = require('path')
const crypto = require('crypto')
const devConfg = require('../config/dev.config')
const config = devConfg.qiniu
const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
const qiniuConfig = new qiniu.conf.Config()
qiniuConfig.zone = qiniu.zone.Zone_z1
// 添加formidable
router.use(function (req, res, next) {
  const form = formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, './upload')
  form.keepExtensions = true
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err)
    }
    req.fields = fields
    req.files = files
    next()
  })
})

router.use('/upload', function (req, res, next) {
  const file = req.files.file
  const key = file.path.split(path.sep).pop()
  let putPolicy = new qiniu.rs.PutPolicy({
    scope: config.bucket + ':' + key,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  })
  const token = putPolicy.uploadToken(mac)
  const extra = new qiniu.form_up.PutExtra()
  const formUpload = new qiniu.form_up.FormUploader(qiniuConfig)
  formUpload.putFile(token, key, file.path, extra, function (err, ret) {
    if (err) {
      console.log(err)
    }
    res.json({
      token: token,
      ret: ret
    })
    next()
  })
})

router.use('/native', function (req, res, next) {
  const putPolicy = new Buffer(JSON.stringify({
    scope: config.bucket + ':' + req.query.key,
    deadline: Date.parse(new Date()) / 1000 + 3600,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  }))
  const encodePolicy = putPolicy.toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
  console.log(encodePolicy)
  const hmacSha1 = crypto.createHmac('sha1', config.secretKey)
  hmacSha1.update(encodePolicy)
  const hmacSha1Res = hmacSha1.digest('hex')
  console.log(hmacSha1Res)
  const uploadToken = new Buffer(hmacSha1Res).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
  res.json({
    token: config.accessKey + ':' + uploadToken + ':' + encodePolicy
  })
})

router.use('/upSignature', function (req, res, next) {
  const scope = config.bucket + (req.query.key ? ':' + req.query.key : '')
  console.log(scope)
  const options = {
    scope,
    expires: 7200,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(fname)"}'
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  res.json({
    upToken: uploadToken
  })
})

router.use('/manageSignature', function (req, res, next) {
  const url = req.query.url + '\n'
  const sign = qiniu.util.hmacSha1(url, config.secretKey)
  const encodeSign = qiniu.util.urlSafeToBase64(sign)
  res.json({
    token: config.accessKey + ':' + encodeSign
  })
})

module.exports = router
