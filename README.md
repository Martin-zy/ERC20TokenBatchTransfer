
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
var txEvent=require('erc20TokenBatchTransfer/lib/txEvents');


txEvent.subscribe('tx_success', function (tx) {
    logger.debug(`success: ${JSON.stringify(tx)}`);
});


txEvent.subscribe('tx_fail', function (tx) {
    logger.debug(`fail: ${JSON.stringify(tx)}`);
});

txEvent.subscribe('invalidAddress',function (addr) {
    logger.debug(`invalid addr: ${JSON.stringify(addr)}`);
});

txEvent.subscribe('tx_send_err',function (addr) {
    logger.debug(`tx_send_errdr: ${JSON.stringify(addr)}`);
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

FAQ:

Question 1:
```
err:Error: insufficient funds for gas * price + value,gas:0x18939,gasprice:0x2d1375900.0000218def416bdb1a6d

```
Answer 1:
when system detected a sent tx time out ,system will try resend the tx with same nonce
(actually the tx has been added to the block),so you get the error .