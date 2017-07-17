var fs = require('fs-extra');
var request = require("request");
var extract = require('extract-zip');
var path = require("path");

let config = require("./config");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var CodeGen = require('swagger-js-codegen').CodeGen;
let remoteJSON = JSON.parse(fs.readFileSync("./remote.json"));
let i = 0;
for (let key in config) {
    // 下载远程API文件
    dlAPIfile(key, config[key].uri,config[key].apip);
    //生成d.ts 文件
    request.get(config[key].uri, (res, body) => {
        let swagger = JSON.parse(body.body);
        let filename = key;
        let source = useHttp(swagger, filename);
        fs.outputFileSync(config[key].dtsp, tsSourceCode, "UTF-8");
        console.log(`共计${Object.keys(config).length}，当前正在执行${key}模块,已完成${++i}个任务`)
        if (Object.keys(config).length == i) {
            // process.exit(0);
        }
    })
}

function dlAPIfile(filename, uri,apip) {
    let apiFilePath = __dirname + "/" + filename + ".zip";
    remoteJSON.swaggerUrl = uri;
    let strJSON = JSON.stringify(remoteJSON);
    let unzipPath = `${__dirname}/${filename}`;
    request.post({
        url: "http://generator.swagger.io/api/gen/clients/typescript-node",
        body: strJSON,
        headers: {
            "content-type": "application/json",
        }
    }, (res, body) => {
        let link = JSON.parse(body.body).link;
        request(link).on('response', function (res) {
            res.pipe(fs.createWriteStream(apiFilePath)).on("close", () => {
                console.log("下载完成")
                extract(apiFilePath, {
                    dir: unzipPath
                }, function (err) {
                    if(err){
                        console.log(`${apiFilePath}解压失败`)
                    }else{
                        fs.copySync(`${unzipPath}/typescript-node-client/api.ts`,apip);//将解压或的api文件复制到响应的目录
                        fs.removeSync(apiFilePath);//删除压缩文件
                        fs.removeSync(`${unzipPath}`);//删除解压后文件
                        console.log(`${apip},文件下载完成`);
                    }
                })
            });
        });
    })
}

function useHttp(swagger, filename) {
    return tsSourceCode = CodeGen.getCustomCode({
        moduleName: filename,
        className: filename,
        swagger: swagger,
        imports: ["request", "bluebird", "node", "http"],
        lint: false,
        template: {
            class: fs.readFileSync('./template/tsd.mustache', 'utf-8'),
            method: "",
            type: fs.readFileSync('./template/type.mustache', 'utf-8')
        }
    })
}