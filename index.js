var fs = require('fs');
var CodeGen = require('swagger-js-codegen').CodeGen;

var file = 'test/user.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
//var tsSourceCode = CodeGen.getTypescriptCode({ className: 'Test', swagger: swagger, imports: ['../../typings/tsd.d.ts'] });
var tsSourceCode =CodeGen.getCustomCode({
    moduleName: 'USERAPI',
    className: 'USERAPI',
    swagger: swagger,
    imports: ["request","bluebird","node","http"] ,
    lint:false,
    template:{
        class:fs.readFileSync('./template/tsd.mustache', 'utf-8'),
        method:"",
        type:fs.readFileSync('./template/type.mustache', 'utf-8')
    }
})
fs.writeFileSync("user.d.ts",tsSourceCode,"UTF-8");
process.exit(0);