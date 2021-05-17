import {Module} from "vuex"
import store from "./index"
import _ from "lodash"
export default <Module<any,any>>{
    state:{
        a:11,
        input(ModuleName, keyPathName,value = {}){

            store.commit("airforceSet",_.merge({},value))
        }
    },
    mutations:{
        airforceSet(state, payload){
            console.log(state,payload,333)
        }
    },
    actions:{

    }
}