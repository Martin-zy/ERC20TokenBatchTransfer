var q = require('./lib/taskqueue');
var txSender = require('./lib/txSender');
var txEvent = require('./lib/taskqueue').txEvent;
var sleep = require('./lib/sleep');

function init(info) {
    txSender.init(info);
}

var recivedTxCount = 0;
var sentTxCount = 0;

txEvent.on('tx_success', function (tx) {
    recivedTxCount = recivedTxCount + 1;
});


txEvent.on('tx_fail', function (tx) {
    recivedTxCount = recivedTxCount + 1;
});

async function batchTransfer(sendList) {
    let total = sendList.length;
    let futureTxCount = 0;
    var myInterval = setInterval(function () {
        futureTxCount = sentTxCount - recivedTxCount;
        if (sentTxCount < total && futureTxCount < 5) {
            let send = sendList[sentTxCount];
            let addr = send["to"];
            let amount = send["amount"];
            q.txQ.push({to: addr, amount: amount});
            sentTxCount = sentTxCount + 1;
        }
        if (sentTxCount >= total) {
            clearTimeout(myInterval);
        }
    }, 1000);

    // q.on('drain', function (){})
}

exports.init = init;
exports.batchTransfer = batchTransfer;

