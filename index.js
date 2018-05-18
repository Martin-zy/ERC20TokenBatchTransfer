var Web3 = require("web3");
var web3 = new Web3();

var util = require('./lib/util');

var Tx = require('ethereumjs-tx');

var _ = require('underscore');

var sleep=require('./lib/sleep');
var watch=require('./lib/watchHash')

var senderAddress;
var privateKey;

var contractAddress;

var nonce;

function init(info) {
    senderAddress = info.senderAddress;
    privateKey = new Buffer(info.privateKey, 'hex');
    contractAddress = info.contractAddress;
    web3.setProvider(new Web3.providers.HttpProvider(info.provider));
    nonce = web3.eth.getTransactionCount(senderAddress, 'pending');
}

function estimateGas(tx) {
    var gas = web3.eth.estimateGas(tx);
    return gas;
}

async function sendTx(toAddress, amount) {
    var gasPrice = web3.eth.gasPrice;
    var gasPriceHex = web3.toHex(gasPrice);

    var nonceHex = web3.toHex(nonce);

    var tx_transfer = {
        "from": senderAddress,
        "to": contractAddress,
        "nonce": nonceHex,
        "data": "0xa9059cbb" + toAddress + amount
    };

    var gas = estimateGas(tx_transfer);
    var gasLimitHex = web3.toHex(gas);



    tx_transfer = _.extend(tx_transfer, {
        "gasPrice": gasPriceHex,
        "gasLimit": gasLimitHex
    });


    var tx = new Tx(tx_transfer);

    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    var hash = await new Promise(function (resolve, reject) {
        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (error, hash) {
            if (error) {
                reject(error);
            } else {
                resolve(hash);
            }
        });
    });

    watch(web3,hash);

    nonce = nonce + 1;
    // sleep(1000*17);

    return hash;

}

async function batchTransfer(sendList) {
    var hashArr=[];
    for (let i = 0; i < sendList.length; i++) {
        let send = sendList[i];

        let h= await sendTx(util.handleAddress(send["to"]), util.handleAmount(send["amount"]));
        hashArr.push(h);
    }
    return hashArr;
}

exports.init = init;
exports.sendTx = sendTx;
exports.batchTransfer = batchTransfer;

