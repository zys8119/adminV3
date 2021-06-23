import { AxiosPromise } from "axios"
import { ComponentInternalInstance } from "vue"
import {windowCommon, WindowCommonAxiosRequestConfig} from "../store/request/AxiosClassInterface";
// @ts-ignore
declare const window:Window &  Partial<windowCommon> & Partial<WindowInterface> & typeof globalThis;
export type apiOpt <T = any> = (this:ComponentInternalInstance,...args:any)=>AxiosPromise<T> | T;
export default{
    User:{
        Auth:{
            login(data){
                return this.axios(<WindowCommonAxiosRequestConfig>{
                    url:"/User/Auth/login",
                    method:"post",
                    ModuleName:"userInfo",
                    ModuleFilter:(res:any)=>res.data,
                    data
                }).then(res=>{
                    localStorage.setItem("userInfo",JSON.stringify(this.airforce.userInfo))
                    return res;
                })
            }
        }
    }
}
