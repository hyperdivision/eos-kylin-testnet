# eos-kylin-testnet

Helper to interact with the Kylin EOS testnet

```
npm install eos-kylin-testnet
```

## Usage

``` js
const testnet = require('eos-kylin-testnet')

testnet.createAccount(accountName, function (err, account) {
  // account has your keys and stuff
})

testnet.getToken(accountName, function (err) {
  // request some faucet tokens
})
```

## License

MIT
