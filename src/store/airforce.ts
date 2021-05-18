import {Module} from "vuex"
import store from "./index"
import _ from "lodash"
export default <Module<any,any>>{
    state:{
        a:11,
        bb:{a:"AAAA"},
        cc:{},
        dd:[1,2,3],
        ee:{
            a:1,
            b:2,
            c:[6,3,8],
            d:{
                a:2,
                b:"asda"
            }
        },
        /**
         * 设置状态数据
         * @param ModuleName 模块名称
         * @param keyPathName 路径名称
         * @param value 路径值
         * @param replace 强制替换，当数据类型为object时候生效
         */
        input(ModuleName, keyPathName,value,replace){
            let goods = _.set({},keyPathName,value);
            let isMerge = true;
            if(undefined === value){
                goods = keyPathName;
                isMerge = false;
            }
            store.commit("airforceSet",{
                goods,
                ModuleName,
                isMerge,
                value,
                keyPathName,
                replace
            })
        }
    },
    mutations:{
        airforceSet(state, {goods,ModuleName,isMerge,value,keyPathName,replace}){
            switch (Object.prototype.toString.call(goods)){
                case "[object Object]":
                    if(isMerge){
                        let Obj = _.merge((state[ModuleName] || {}),goods)
                        state[ModuleName] = Obj;
                        if(replace){
                            state[ModuleName] = _.set(Obj,keyPathName,value);
                        }
                    }else {
                        state[ModuleName] = goods;
                    }
                    break;
                default:
                    state[ModuleName] = goods;
                    break;
            }
        }
    },
    actions:{

    }
}