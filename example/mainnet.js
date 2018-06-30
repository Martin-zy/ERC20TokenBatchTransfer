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
    senderAddress: "0x38C6558bA8b5A3d50a45c49198B2f029A22cD94F",
    privateKey: "ee1f54a251690fdf84c47b629bb818db2b4613488d2f5b6b2f4591cb009dfc3a",
    contractAddress: "0xbc647aad10114b89564c0a7aabe542bd0cf2c5af",
    provider: "https://mainnet.infura.io"
});

transfer.batchTransfer([





]);