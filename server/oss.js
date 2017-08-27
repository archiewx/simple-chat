const express = require('express')
const router = express.Router()
const base64 = require('crypto-js/enc-base64')
const hmacSha1 = require('crypto-js/hmac-sha1')
const utf8 = require('crypto-js/enc-utf8')

const config = {
  id: 'LTAIfgmlXhG201N8',
  key: 'JRf704OYAa2RyaTvVzTt7rcpt5RB7k',
  host: 'http://wxd-private.oss-cn-beijing.aliyuncs.com',
  dir: 'test/'
}

router.use('/signature', function (req, res, next) {
  let expires = Date.parse(new Date()) / 1000 + 30
  let expiration = new Date(Number(expires + '000')).toJSON()
  let condition = ['content-length-range', 0, 1048576000]
  let policy = JSON.stringify({expiration, condition})
  let base64Policy = base64.stringify(utf8.parse(policy))
  let signature = base64.stringify(hmacSha1(base64Policy, config.key, {asBytes: true}))

  res.json({
    success: true,
    data: {
      accessId: config.id,
      host: config.host,
      expires: expires,
      dir: config.dir,
      policy: base64Policy,
      signature
    }
  })
  next()
})

module.exports = router
