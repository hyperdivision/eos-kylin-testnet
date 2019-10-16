const get = require('simple-get')

exports.createAccount = function (name, cb) {
  get.concat({ url: 'http://faucet.cryptokylin.io/create/' + name, json: true }, function (err, res, body) {
    err = checkError(err, res, body)
    if (err) return cb(err)
    if (!body.data && !body.data.account) return cb(new Error('No account returned'))
    cb(null, body.data.account)
  })
}

exports.getToken = function (name, cb) {
  get.concat({ url: 'http://faucet.cryptokylin.io/get_token/' + name, json: true }, function (err, res, body) {
    err = checkError(err, res, body)
    if (err) return cb(err)
    if (body && body.data && body.data.account === name) return cb(null)
    cb(new Error('Could not get token'))
  })
}

function checkError (err, res, body) {
  if (err) return err
  if (res.statusCode !== 200) {
    let m = null
    if (body && body.msg && body.msg.error && body.msg.error.error) {
      m = body.msg.error.error.what
    }
    if (!m && body && body.msg && body.msg[0]) {
      m = body.msg[0].message
    }
    return new Error(m || 'Bad status: ' + res.statusCode)
  }
  return null
}
