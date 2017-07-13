var fs = require('fs');
var CodeGen = require('swagger-js-codegen').CodeGen;
const args = require('minimist')(process.argv.slice(2));
console.log(args)
var file = args._[1];
let filename = args._[0];
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var tsSourceCode =CodeGen.getCustomCode({
    moduleName: filename,
    className: filename,
    swagger: swagger,
    imports: ["request","bluebird","node","http"] ,
    lint:false,
    template:{
        class:fs.readFileSync('./template/tsd.mustache', 'utf-8'),
        method:"",
        type:fs.readFileSync('./template/type.mustache', 'utf-8')
    }
})

let filePath = `${__dirname}/${filename}.d.ts`;
fs.writeFileSync(filePath,tsSourceCode,"UTF-8");
process.exit(0);