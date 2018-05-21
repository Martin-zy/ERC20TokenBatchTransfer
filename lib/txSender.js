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

async function sendTxInter(toAddress, amount, gasLimitHex, gasPriceHex, nonceHex) {
    toAddress = toAddress.trim();
    if (web3.isAddress(toAddress)) {
        toAddress = util.handleAddress(toAddress);
        amount = util.handleAmount(amount);
    } else {
        console.info(`address: ${toAddress} is not validate`);
        return {hash: null, nonce: null, gasLimitHex: null, gasPriceHex: null};
    }

    var tx_transfer = {
        "from": senderAddress,
        "to": contractAddress,
        "nonce": nonceHex,
        "data": "0xa9059cbb" + toAddress + amount,
        "gasPrice": gasPriceHex,
        "gasLimit": gasLimitHex
    };

    var tx = new Tx(tx_transfer);

    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    var hash = await new Promise(function (resolve, reject) {
        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (error, hash) {
            if (error) {
                console.info(`err:${error},gas:${gasLimitHex},gasprice:${gasPriceHex}`)
                // reject(null);
                resolve(null);
            } else {
                resolve(hash);
            }
        });
    });

    return {hash: hash, nonceHex: nonceHex, gasLimitHex: gasLimitHex, gasPriceHex: gasPriceHex};
}

async function sendTx(toAddress, amount) {

    var gasPrice = web3.eth.gasPrice;
    var gasPriceHex = web3.toHex(gasPrice);

    var nonceHex = web3.toHex(nonce);


    // var gas = estimateGas(tx_transfer);
    // estimateGas
    // var gasLimitHex = web3.toHex(gas);
    // fixed gas
    var gasLimitHex = web3.toHex("100665");


    nonce = nonce + 1;

    return await sendTxInter(toAddress, amount, gasLimitHex, gasPriceHex, nonceHex);


}

// util methods
function hexToInt(num) {
    let number = web3.toDecimal(num);
    return number;
}

function intToHex(h) {
    let hex = web3.toHex(h);
    return hex;
}

function addPercent(num, per) {
    num = (1 + per) * num;
    return num;
}

function addGasPrice(gp) {
    let gpInt = hexToInt(gp);
    gpInt = addPercent(gpInt, 0.1); // 1.1 * prevPrice
    let gpHex = intToHex(gpInt);
    return gpHex;
}


function getTransactionReceipt(hash) {
    let receipt = web3.eth.getTransactionReceipt(hash);
    return receipt;
}

function track(t) {
    let now = Date.now();
    let elapse = now - t;
    if (elapse > 5 * 60 * 1000) {//  5 minutes
        // overwrite
        return true;
    } else {
        return false;
    }
}

exports.init = init;
exports.sendTx = sendTx;
exports.sendTxInter = sendTxInter;
exports.getTransactionReceipt = getTransactionReceipt;
exports.track = track;
exports.addGasPrice = addGasPrice;

