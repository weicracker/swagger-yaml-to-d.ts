### ASP 平台自动生成接口文档工具

#### 自动根据不同模块生成接口文档

##### 配置文件修改位置

```js
let basePath = "E:\\stations\\ASPPortal\\src\\browser\\typings"   //d.ts 文件输出位置根路径
let writeApiFilePath = "E:\\stations\\ASPPortal\\src";          //api.ts 文件输出位置根路径

let config = {
    "user":{
        "uri": "xxxx", //swagger 路径
        "dtsp":`${basePath}/user/api.d.ts`,
        "apip":path.join(writeApiFilePath,"system/launcher/modules/user/model/api.ts")
    },
}
```
##### 启动方式

> npm start