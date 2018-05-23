
## install

```shell
$ mkdir my_project
$ cd my_project
$ npm init -y
$ npm install web3@0.18.4 --save
$ npm install git://github.com/ionchain/ERC20TokenBatchTransfer.git --save
```

## example

```javascript
var transfer = require('erc20TokenBatchTransfer');
var txEvent=require('erc20TokenBatchTransfer/lib/taskqueue').txEvent;

txEvent.on('tx_success',function(obj) {
  
});

// first ,set some parameters
transfer.init({
    senderAddress: "sender's Address",
    privateKey: "sender's privateKey",
    contractAddress: "your erc20 contract address",
    provider: "https://ropsten.infura.io"
});

// format:[{to:"receiver's address",amount:"amount to send"}]
transfer.batchTransfer([
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10},
    {to: "0xf7171d1ea98f698e22ef0ebfb5498d0c2ca83890", amount: 10}
]);
```