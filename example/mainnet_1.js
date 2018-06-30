var transfer = require('../index.js');
var txEvent = require('../lib/txEvents');
var log = require('./helper.js');
var logger = log.getLogger("mainnet");

txEvent.subscribe('tx_success', function (tx) {
    logger.debug(`success: ${JSON.stringify(tx)}`);
});


txEvent.subscribe('tx_fail', function (tx) {
    logger.debug(`fail: ${JSON.stringify(tx)}`);
});

txEvent.subscribe('invalidAddress', function (addr) {
    logger.debug(`invalid addr: ${JSON.stringify(addr)}`);
});

txEvent.subscribe('tx_send_err', function (addr) {
    logger.debug(`tx_send_errdr: ${JSON.stringify(addr)}`);
});

transfer.init({
    senderAddress: "0xe299e1847E9CcD723e756D2dC5d7099941DF51ea",
    privateKey: "579ae56b06136d489dece341bd3b811dfbbf7a071bee2f2a9f8c05138ba189f4",
    contractAddress: "0xbc647aad10114b89564c0a7aabe542bd0cf2c5af",
    provider: "https://mainnet.infura.io"
});

transfer.batchTransfer([


    {to:"0xf11fca028c79b7772f172fcf315f9417f3adcbd0",amount:1},
    {to:"0xe15ac06141f0eadf163ee902ff1fb7be58fce2ed",amount:1},
    {to:"0x4cef30b8319977bee673aba73244a29ff2844738",amount:1},
    {to:"0x24fc1a3ba03c7ddbbd7933cdcde457b04fa92e9c",amount:1},
    {to:"0x8e393b04dd54ba7636cb1aaea860c9a64705fd43",amount:1},
    {to:"0x1985496043fac60d7bccf637981d0cfd13d0fcff",amount:1},
    {to:"0xcb87a184565672f2883f057d6ab3d840444b9c5b",amount:1},
    {to:"0x2d75e9ee90d3a11a7d008b0a6ed3a412b8271e74",amount:1},
    {to:"0x36effa5055dc88179aacc0d4d6c4e5d9bbc87d14",amount:1},
    {to:"0x5dc852a147c664ab83581f880daf8b3bd98aed37",amount:1},
    {to:"0x3e6644aa63779c027f1ce7c4e2bcfceb6edd33aa",amount:1},
    {to:"0x4605b43e4f9e969c945d334d17d45d397eb00354",amount:1},
    {to:"0xe0980796d2cf02d098d05e20da7bf8708608ff2d",amount:1},
    {to:"0x8a7d2fac45de9cf05ac2687fadb43ddd68b4c945",amount:1},
    {to:"0x395e641750ac65192cd9ed55151de07b0d6f26d7",amount:1},
    {to:"0xd1dde7d6fbf4e2a4bc8a530db656bc1c16f1a2cf",amount:1},
    {to:"0x744401d424c10156fc067497576110aa623376df",amount:1},
    {to:"0xed9caefa8828ec87f24fa483d9840c8c7af24441",amount:1},
    {to:"0x95253b93c30f8f044ac71b26ae8054fffe8faa2c",amount:1},
    {to:"0x729080e959033e456cc831ae97b301311208f2f3",amount:1},
    {to:"0xb3df3c4d41dab1fc101c4a47a1ad23c566cd4a38",amount:1},
    {to:"0x9c6ff7a30723e4e70c539bdb69f440da30857484",amount:1},
    {to:"0x64e26f9db4b5f1cc9a410bcbc6c86829a8eec055",amount:1},
    {to:"0x0986691d3f1f1d139de9229e7ccc297b066703ca",amount:1},
    {to:"0xe722b30ee01a96176fa73d1576cbaeaed01cb907",amount:1},
    {to:"0xf6a8a3179a56873bb3871988f7040b08b69481e4",amount:1},
    {to:"0x26a62a21d83096b6487bed2394256f56560a6866",amount:1},
    {to:"0x77f2cd0d8a9496d5f0d44fe1f2c23b4f8e0c264e",amount:1},
    {to:"0x60d854ea04d70c2f4f10868663d954e900391a48",amount:1},
    {to:"0xe365f58378518eb5bfd7cf3377426ac98a7326c5",amount:1},
    {to:"0xbae369b0f082cc3ba181e0297086f96bce36a966",amount:1},
    {to:"0x65f0692b7fe58de0b6beaabe994945dcaa860fa1",amount:1},
    {to:"0x9ad0fd586b2c5e2f9855e58e8ab6806c061edf6e",amount:1},
    {to:"0x558355f4aa3eb2c23741a27359ffffb9490f7b64",amount:1},
    {to:"0xe39ef8a06ff3bda6736c0bc704b72b62b13fa319",amount:1},
    {to:"0xbaef6ac74186ea7741e7d37d4433dc9f2f5d71fc",amount:1},
    {to:"0xa03f96e735442b26d30f88b510336815b12b57f4",amount:1},
    {to:"0xc5ebc560ffab541c1b2fc37fb48f8f501c2943d8",amount:1},
    {to:"0xdee84ec28af94ad0fa72c0d24f1ee25bfc020214",amount:1},
    {to:"0xc25f1dcb50dccb6023e515f35636a56c8551c486",amount:1},
    {to:"0x06849b79180c098d94935b936473040ac25f47eb",amount:1},
    {to:"0x64e9ff62fb9dfb57361ff391afdd8dfdd5113a7f",amount:1},
    {to:"0x3718521a0957e632f7889fe3d20eecf4263319a3",amount:1},
    {to:"0x35fc3731e22f60a7c67ec51650b355b2ca4bf2cc",amount:1},
    {to:"0xc37e0bf0bebc5ba3a00396943c0ca02470b607b8",amount:1},
    {to:"0xbc69e729ae043bd2dde675cfec35f8dbcb26cce8",amount:1},
    {to:"0x45686c6aa6420767f6ecb72e13cf7487ddcd1b19",amount:1},
    {to:"0xc48fcea009e3e826e9fc0b029e64d01451e75b96",amount:1},
    {to:"0x19d0d19015866be8f56ba4dee456b2842adb3db6",amount:1},
    {to:"0x611ba33b9df752d42b616e62a70717e69a410fc5",amount:1},
    {to:"0x329da3619ebe67edf306880379577983ff69a6d2",amount:1},
    {to:"0x8e1ceef583a8974eb4c6882aba1e7aa6468428c0",amount:1},
    {to:"0xe81c6ad593093c983b61f099427523f460286c46",amount:1},
    {to:"0xe97ba21658fa261fa1fef0bf6cb8759eb26f3fd0",amount:1},
    {to:"0xa8ee8df3b22623267cc8c332df21543b0421b2fd",amount:1},
    {to:"0xca1ea56df963cccb621bc29edce29533f0962367",amount:1},
    {to:"0x89091e7b6aba9434af7c0bf7f01cb54e0d0f7ccc",amount:1},
    {to:"0x3f99e2fd3598d17395e5441215de137f3e2828ba",amount:1},
    {to:"0x19f982a6233556d4af3595df88959ace349825a1",amount:1},
    {to:"0x48956cd159162fca26ca0dccdde6fab2617f5616",amount:1},
    {to:"0x5308d8853118e61c55f8b876fd40aed5aa13b4e2",amount:1},
    {to:"0x6161ec9c85f7d945c8af94e47faba6d09395c5c6",amount:1},
    {to:"0xe08e088fda71cd9bf08de5b4ace858d05622d955",amount:1},
    {to:"0x60c35ac356913a17264defdc095d9d6bffecddd0",amount:1},
    {to:"0xed4c99804cc6b8ab94ba2607b365280607bc591c",amount:1},
    {to:"0xa3c7e4f4d25f1e784895b8b0218ea4a199a4a15c",amount:1},
    {to:"0x8739202dbb8df2201c23ce24fa3506139d1b1293",amount:1},
    {to:"0xb3c7776fef7c5125b185732bf2d0832fa6dddf5c",amount:1},
    {to:"0x7fb6f161cf11bc13b47e593fbfc9b440aac70b6d",amount:1},
    {to:"0x96f507da74228ac5b8df53e8d4117477ba1dac09",amount:1},
    {to:"0xb87b97750c7d1b02c6e055667a66102b3ec2aef7",amount:1},
    {to:"0xe0fb5b36d56d478e7699450cea22d1158909fe4d",amount:1},
    {to:"0x0aa2e7450131cd475ef95613d8b851003064bd10",amount:1},
    {to:"0x2d81c37837648dc81be4147de600ff866f595864",amount:1},
    {to:"0xab8d1593bc31c6a34691d4f97ac7e845edc3aecc",amount:1},
    {to:"0x7cd5ba53e04d828d04e361dbeb19652944dc06a5",amount:1},

]);