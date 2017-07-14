var fsextra = require('fs-extra');
var request = require("request");
let httpURL = {
    user: ""
}

var CodeGen = require('swagger-js-codegen').CodeGen;
let i=0;
for( let key in httpURL){
    request.get(httpURL[key],(res,body)=>{
        let swagger = JSON.parse(body.body);
        let filename = key;
        let source = useHttp(swagger,filename);
        let filePath = `${__dirname}/${key}/api.d.ts`;
        fsextra.outputFileSync(filePath, tsSourceCode, "UTF-8");
        console.log(`已完成${++i}个任务，当前正在执行${key}模块,共计${Object.keys(httpURL).length}`)
    })
    
    if(Object.keys(httpURL).length==i){
        process.exit(0);
    }
}


function useHttp(swagger,filename) {
    return tsSourceCode = CodeGen.getCustomCode({
        moduleName: filename,
        className: filename,
        swagger: swagger,
        imports: ["request", "bluebird", "node", "http"],
        lint: false,
        template: {
            class: fsextra.readFileSync('./template/tsd.mustache', 'utf-8'),
            method: "",
            type: fsextra.readFileSync('./template/type.mustache', 'utf-8')
        }
    })
}

