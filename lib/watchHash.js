var sleep=require('./sleep')
function watch(web3, hash) {
    let receipt = null;
    while (receipt == null) {
        receipt = web3.eth.getTransactionReceipt(hash);
        sleep(1000)
    }

    if(receipt.status=="0x01"){
        console.info(`hash ${hash} success`)
    }else if(receipt.status=="0x00"){
        console.info(`hash ${hash} fail`)
    }
}

module.exports=watch;