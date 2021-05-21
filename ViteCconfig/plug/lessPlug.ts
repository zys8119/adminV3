import {
    PluginOption,
    TransformResult,
    ModuleNode,
    HmrContext,
} from 'vite'

import {readFileSync} from "fs"
import {resolve} from "path"


export default (options:string[])=>{
    const RelationshipFile = {};
    return <PluginOption>{
        enforce:"pre",
        name:"vue文件lees全局变量注入插件",
        transform(code: string, id: string,): Promise<TransformResult> | TransformResult {
            if(/\.less$/.test(id)){
                RelationshipFile[id.replace( resolve(__dirname,"../../").replace(/\\/g,"/"),"")] = true;
                return {
                    code:`${options.map(filePath => readFileSync(filePath, "utf-8")).join("\\n")}${code}`,
                    map:null
                }
            }
            return {
                code,
                map:null
            }
        },
        handleHotUpdate(ctx: HmrContext): Array<ModuleNode> | void | Promise<Array<ModuleNode> | void> {
            if(options.includes(ctx.file.replace(/\//g,"\\"))){
                const modules = Object.keys(RelationshipFile).map(key=>ctx.server.moduleGraph.urlToModuleMap.get(key)).filter(e=>e)
                return modules;
            }
            return ctx.modules;
        }
    }
}