var Queue = require('better-queue');
var txSender = require('./txSender');
var EventEmitter = require('events').EventEmitter;
var txEvent = new EventEmitter();


//{from:"",to:"",amount:"",hash:"",nonceHex:"",timestamp:"",gasLimitHex:"",gasPriceHex:"",history:[]}
var txHashQ = new Queue(function (input, cb) {
    let hash = input.hash;
    let receipt = txSender.getTransactionReceipt(hash);
    if (receipt == null) {
        // gas price to low,resend the tx with same nonceHex
        // txSend.sendTx(tx|| nonceHex)
        let timeout = txSender.track(input.timestamp);
        if (timeout) {
            console.info(`hash: ${input.hash} time out,nonce ${input.nonceHex}`);
            // resend tx
            input.history.push(hash);
            txQ.push({
                from: input.from,
                to: input.to,
                amount: input.amount,
                gasLimitHex: "0x18939",
                gasPriceHex: txSender.addGasPrice(input.gasPriceHex),
                nonceHex: input.nonceHex,
                history: input.history,
                resend: true
            })
        } else {
            txHashQ.push(input);
        }

        cb(null, null);
    } else if (receipt.status == "0x1") {
        input.history.push(hash);
        txEvent.emit('tx_success',{hash:hash});
        console.info(`hash history: [${input.history}], hash: ${hash} success`);
        cb(null, "success");
    } else if (receipt.status == "0x0") {
        input.history.push(hash);
        console.info(`hash history: [${input.history}], hash: ${hash} fail ,repeat times: ${input.history.length}`);
        if (input.history.length < 4) {
            txQ.push({from: input.from, to: input.to, amount: input.amount, history: input.history});
        }
        cb(null, "fail")
    }

});

//{from:"",to:"",amount:"",hash:"",nonceHex:"",timestamp:"",gasLimitHex:"",gasPriceHex:"",history:[]}
var txQ = new Queue(async function (input, cb) {
    let to = input.to;
    let amount = input.amount;
    let resend = input.resend == null ? false : input.resend;
    let txObj;
    if (resend) {
        txObj = await  txSender.sendTxInter(to, amount, input.gasLimitHex, input.gasPriceHex, input.nonceHex);
    } else {
        txObj = await txSender.sendTx(to, amount);
    }

    let nonceHex = txObj.nonceHex;
    let hash = txObj.hash;
    let gasLimitHex = txObj.gasLimitHex;
    let gasPriceHex = txObj.gasPriceHex;

    if (!hash) {
        cb(null, null);//invalidate address
    } else {

        if (input.history == null) {
            input.history = [];
        }

        txHashQ.push({
            from: input.from,
            to: to,
            amount: amount,
            hash: hash,
            nonceHex: nonceHex,
            gasLimitHex: gasLimitHex,
            gasPriceHex: gasPriceHex,
            timestamp: Date.now(),
            history: input.history
        });

        cb(null, hash);
    }


});

exports.txQ = txQ;
exports.txHashQ = txHashQ;
exports.txEvent = txEvent;