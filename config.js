let basePath = "E:\\stations\\ASPPortal\\src\\browser\\typings"
let writeApiFilePath = "E:\\stations\\ASPPortal\\src";
var path = require("path");
let config = {
    "user":{
        "uri": "xxx",
        "dtsp":`${basePath}/user/api.d.ts`,
        "apip":path.join(writeApiFilePath,"system/launcher/modules/user/model/api.ts")
    },
}

module.exports = config;