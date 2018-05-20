var Web3 = require("web3");
var web3 = new Web3();

var util = require('./util');

var Tx = require('ethereumjs-tx');

var _ = require('underscore');


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
    toAddress = toAddress.trim();
    if (web3.isAddress(toAddress)) {
        toAddress = util.handleAddress(toAddress);
        amount = util.handleAmount(amount);
    } else {
        console.info(`address: ${addr} is not validate`)
        return null;
    }


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
    // var gasLimitHex = web3.toHex("100665");


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

    nonce = nonce + 1;

    return hash;

}

function getTransactionReceipt(hash) {
    let receipt = web3.eth.getTransactionReceipt(hash);
    return receipt;
}

exports.init = init;
exports.sendTx = sendTx;
exports.getTransactionReceipt = getTransactionReceipt;

