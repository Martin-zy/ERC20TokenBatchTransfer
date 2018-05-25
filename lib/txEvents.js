var EventEmitter = require('events').EventEmitter;
var txEvent = new EventEmitter();

function txSuccess(input) {
    txEvent.emit('tx_success', input);
}

function txFail(input) {
    txEvent.emit('tx_fail', input);
}

function txSendErr(input) {
    txEvent.emit('tx_send_err', input);
}

function invalidAddr(input) {
    txEvent.emit('invalidAddress', input);
}

function subscribe(event, cb) {
    txEvent.on(event, cb)
}

exports.txSuccess = txSuccess;
exports.txFail = txFail;
exports.invalidAddr = invalidAddr;
exports.txSendErr = txSendErr;
exports.subscribe = subscribe;