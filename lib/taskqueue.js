var Queue = require('better-queue');
var txSender = require('./txSender');


//{from:"",to:"",amount:"",hash:"",history:[]}
var txHashQ = new Queue(function (input, cb) {
    let hash = input.hash;
    let receipt = txSender.getTransactionReceipt(hash);
    if (receipt == null) {
        txHashQ.push(input);
        cb(null, null);
    } else if (receipt.status == "0x1") {
        cb(null, "success")
        input.history.push(hash);
        console.info(`hash history: ${input.history}, hash: ${hash} success`);
    } else if (receipt.status == "0x0") {
        input.history.push(hash);
        console.info(`hash history: ${input.history}, hash: ${hash} fail ,repeat times: ${input.history.length}`);
        if (input.history.length < 4) {
            txQ.push({from: input.from, to: input.to, amount: input.amount, history: input.history});
        }
        cb(null, "fail")
    }

});

//{from:"",to:"",amount:"",history:[]}
var txQ = new Queue(async function (input, cb) {
    let to = input.to;
    let amount = input.amount;
    let hash = await txSender.sendTx(to, amount);
    if (input.history == null) {
        input.history = [];
    }

    txHashQ.push({from: input.from, to: to, amount: amount, hash: hash, history: input.history});
    cb(null, hash);
});

exports.txQ = txQ;
exports.txHashQ = txHashQ;