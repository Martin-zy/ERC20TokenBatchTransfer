var Web3 = require("web3");
var web3 = new Web3();

var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

function handleAmount(amount) {
    let amountWei = web3.toWei(amount);
    let amountWeiHex = web3.toHex(amountWei);
    return _.pad(amountWeiHex.slice(2), 64, '0');
}

function handleAddress(address) {
    return _.pad(address.slice(2), 64, '0');
}

exports.handleAmount = handleAmount;
exports.handleAddress = handleAddress;