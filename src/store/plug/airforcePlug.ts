import { Plugin } from "vue"
import request from "../request/request"
import {WindowCommonAxiosRequestConfig,airforcePlugOptionsType} from "../request/AxiosClassInterface"
import store from "../index"
import _ from "lodash"

const airforcePlug:Plugin = {
    install(App,opts:airforcePlugOptionsType){
        new request(_.merge({},opts.requestBaseOptions || {}));
        App.config.globalProperties.airforce = store.state.airforce;
        App.config.globalProperties.axios = (options:WindowCommonAxiosRequestConfig)=>{
            return store.dispatch("axios",options);
        }
        if(opts.install){
            opts.install(App,opts);
        }
    }
}
export default <Plugin> airforcePlug;