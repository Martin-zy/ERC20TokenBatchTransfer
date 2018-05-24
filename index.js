var q = require('./lib/taskqueue');
var txSender = require('./lib/txSender');
var sleep = require('./lib/sleep');

function init(info) {
    txSender.init(info);
}

async function batchTransfer(sendList) {
    for (let i = 0; i < sendList.length; i++) {
        let send = sendList[i];
        let addr = send["to"];
        let amount = send["amount"];
        q.txQ.push({to: addr, amount: amount});
        if (i % 5 == 0) {
            await sleep(5 * 60 * 1000);
        }
    }
    // q.on('drain', function (){})
}

exports.init = init;
exports.batchTransfer = batchTransfer;

