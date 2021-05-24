import { AxiosPromise } from "axios"
import { ComponentInternalInstance } from "vue"
export type apiOpt <T = any> = (this:ComponentInternalInstance)=>AxiosPromise<T> | T;
export default <Partial<apiOpt>>{

}
