var q = require('./lib/taskqueue');
var txSender=require('./lib/txSender');

function init(info) {
    txSender.init(info);
}
async function batchTransfer(sendList) {
    for (let i = 0; i < sendList.length; i++) {
        let send = sendList[i];
        let addr = send["to"];
        let amount = send["amount"];
        q.txQ.push({to:addr,amount:amount})
    }
    // q.on('drain', function (){})
}

exports.init = init;
exports.batchTransfer = batchTransfer;

