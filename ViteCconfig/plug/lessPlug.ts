import {
    PluginOption,
    TransformResult,
} from 'vite'

import {readFileSync} from "fs"
export default (options:string[])=>{
    const globalVars = options.map(filePath=>readFileSync(filePath,"utf-8")).join("\n");
    return <PluginOption>{
        enforce:"pre",
        name:"vue文件lees全局变量注入插件",
        transform(code: string, id: string,): Promise<TransformResult> | TransformResult {
            if(/\.less$/.test(id)){
                return {
                    code:`${globalVars}${code}`,
                    map:null
                }
            }
            return {
                code,
                map:null
            }
        },
    }
}