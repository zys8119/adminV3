import { AxiosPromise } from "axios"
import { ComponentInternalInstance } from "vue"
export type apiOpt <T = any> = (this:ComponentInternalInstance,...args:any)=>AxiosPromise<T> | T;
export default <Partial<apiOpt>>{
    User:{
        Auth:{
            login(){
                return window.common.Axios({
                    url:"/User/Auth/login",
                    method:"post",
                })
            }
        }
    }
}
