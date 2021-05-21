import {PluginOption, TransformResult, HmrContext, ModuleNode} from 'vite'
import {parse} from '@vue/compiler-sfc'
import less from "less"
import {resolve} from "path"
import {readFileSync} from "fs"

export default ()=>{
    const globalVars = readFileSync(resolve(__dirname,"../../src/assets/less/constant.less"),"utf-8");
    return <PluginOption>{
        enforce:"pre",
        name:"vue文件lees全局变量注入插件",
        transform(code: string, id: string,): Promise<TransformResult> | TransformResult {
            if(/Home\.vue$/.test(id)){
                const lessStyle = parse(code).descriptor.styles[0].content
                return {
                    code:code.replace(lessStyle, `${globalVars}${lessStyle}`),
                    map:null
                }
            }
            return {
                code,
                map:null
            }
        },
        handleHotUpdate(ctx: HmrContext): Array<ModuleNode> | void | Promise<Array<ModuleNode> | void> {
            if(/Home\.vue$/.test(ctx.file)){
                return new Promise(resolve1 => {
                    (async ()=>{
                        // const code = await ctx.read();
                        // const lessStyle = parse(code).descriptor.styles[0].content;
                        // const transformCode = code.replace(lessStyle, `${globalVars}${lessStyle}`);
                        // console.log(ctx)
                        // ctx.server.ws.send({
                        //     type:"update",
                        //     updates:[
                        //         {
                        //             type:"js-update",
                        //             path:ctx.file,
                        //             acceptedPath:ctx.file,
                        //             timestamp:ctx.timestamp,
                        //         }
                        //     ]
                        // })
                        ctx.server.ws.send({type:"full-reload"})
                        resolve1(null)
                    })()
                })
            }
            return  Promise.resolve(ctx.modules);
        }
    }
}