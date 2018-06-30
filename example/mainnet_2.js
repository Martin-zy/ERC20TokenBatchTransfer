var transfer = require('../index.js');
var txEvent = require('../lib/txEvents');
var log = require('./helper.js');
var logger = log.getLogger("mainnet");

txEvent.subscribe('tx_success', function (tx) {
    logger.debug(`success: ${JSON.stringify(tx)}`);
});


txEvent.subscribe('tx_fail', function (tx) {
    logger.debug(`fail: ${JSON.stringify(tx)}`);
});

txEvent.subscribe('invalidAddress', function (addr) {
    logger.debug(`invalid addr: ${JSON.stringify(addr)}`);
});

txEvent.subscribe('tx_send_err', function (addr) {
    logger.debug(`tx_send_errdr: ${JSON.stringify(addr)}`);
});

transfer.init({
    senderAddress: "0x3C29F59f351F3B749F9710EcF6b127C5E577a09f",
    privateKey: "d8c080e66610066bf04f39043ddbe0117d0dbe8480d5cc13dca73a96b16e5705",
    contractAddress: "0xbc647aad10114b89564c0a7aabe542bd0cf2c5af",
    provider: "https://mainnet.infura.io"
});

transfer.batchTransfer([



    {to:"0xedab531edd6185c4dacd89e2d77c205a060ef68c",amount:5},
    {to:"0x0365afd1dd363804a2421290bec45614d3771d51",amount:5},
    {to:"0xf9ea7b99d201e1a1c54ab04c760bb7e9cdf45102",amount:5},
    {to:"0x3b2966d0457603c62b0790f09aa67c3a44993cac",amount:5},
    {to:"0x91061b3d8cb8301e96b53c81a5e59265d45cd506",amount:5},
    {to:"0x15d7cc4480cf429315cfb2c2fe1393a744969bd1",amount:5},
    {to:"0x4a7327ce6dbe123b84e4618a646fe8e1fbe80cbf",amount:5},
    {to:"0x5a6d54ac72c7e06f9c313c12b6e3936792993179",amount:5},
    {to:"0xcd1a19f9d50ff4cf253c7b26532f5606af3b6115",amount:5},
    {to:"0xbc3314fc6dc3b8c54338142e96233ef9ef305506",amount:5},
    {to:"0xf9d4a4e36e369e4e5681de18e19035962ff85eb7",amount:5},


]);