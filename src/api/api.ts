import { AxiosPromise } from "axios"
import { ComponentInternalInstance } from "vue"
export type apiOpt <T = any> = (this:ComponentInternalInstance,...args:any)=>AxiosPromise<T> | T;
export default <Partial<apiOpt>>{
    test(data){
        return Promise.resolve({
            data:{
                list:[
                    {name:"asd"},
                    {name:"asd"},
                ],
                pageNo:1,
                pageSize:10,
                total:100
            }
        })
    }
}
