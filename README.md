
```
npm install github:
```


```js
var transfer = require('../index.js')

transfer.init({
    senderAddress: "0x38C6558bA8b5A3d50a45c49198B2f029A22cD94F",
    privateKey: "ee1f54a251690fdf84c47b629bb818db2b4613488d2f5b6b2f4591cb009dfc3a",
    contractAddress: "0x92e831bbbb22424e0f22eebb8beb126366fa07ce",
    provider: "https://ropsten.infura.io"
});

transfer.batchTransfer([
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10}
]).then(function (result) {
    console.info(result)
});
```