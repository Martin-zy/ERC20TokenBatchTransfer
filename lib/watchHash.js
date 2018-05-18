var sleep=require('./sleep');
function watch(web3, hash) {
    let receipt = null;
    while (receipt == null) {
        receipt = web3.eth.getTransactionReceipt(hash);
        sleep(500)
    }

    console.info(JSON.stringify(receipt))
    if(receipt.status=="0x1"){
        console.info(`hash: ${hash} success`)
    }else if(receipt.status=="0x0"){
        console.info(`hash: ${hash} fail`)
    }
}

module.exports=watch;