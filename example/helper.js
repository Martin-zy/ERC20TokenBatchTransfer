var log4js = require('log4js');


log4js.configure({
    appenders: [
        {
            type: "dateFile",
            absolute: true,
            filename: __dirname + "/logs/log.log",
            maxLogSize: 1024 * 1024,
            backup: 3,
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: true
        }, {
            type: "file",
            filename: __dirname + "/logs/log.log",
        }, {
            type: 'console',
            category: "console"
        }
    ],
    replaceConsole: true,
    levels: {
        "console": "info",
    }

});


var getLogger = function (moduleName) {
    var logger = log4js.getLogger(moduleName);
    logger.setLevel('DEBUG');
    return logger;
};

exports.getLogger = getLogger;