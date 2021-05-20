import ZXDialogAlert from './ZXDialogAlert.vue'
import ZAlertFooter from './ZAlertFooter.vue';
// @ts-ignore
import {$ZAlert, $ZAlertOptions} from "../../../src/api/Interface";
import { Plugin, render, createApp, createVNode, h, defineComponent } from "vue"
import ElementPlus from 'element-plus';
import alertPlug from './index';
import airforcePlug from '../airforcePlug';
import store from '../../index';
const plugin:Plugin = {
    install (vue) {
        const $ZXDialogAlert = <$ZAlert>{
            show:(opts:$ZAlertOptions)=>{
                let $vm;
                if (!$vm) {
                    const container = document.createElement('div');
                    $vm = createApp(ZXDialogAlert)
                        .use(ElementPlus)
                        .use(store)
                        .use(airforcePlug)
                        .use(alertPlug)
                        // .component("ZAlertFooter", ZAlertFooter)
                        .mount(container);
                    document.body.appendChild(container);
                }
                vue.config.globalProperties.$ZAlert.vm[vue.config.globalProperties.$ZAlert.index] = $vm;
                vue.config.globalProperties.$ZAlert.index += 1;
                $vm.show = false;
                $vm.showBox = false;
                opts = (<any>Object).assign({},opts);
                opts.props = opts.props || {};
                opts._event = opts._event || {};
                opts.content = opts.content || null;
                opts.components = opts.components || null;
                let FilterField = {
                    onShow:true,
                    onHide:true,
                    onOpened:true,
                    onClosed:true,
                    _event:true,
                };
                for(var i in opts){
                    if(FilterField[i]){
                        if(typeof opts[i] === "function"){
                            $vm[i] = (function (key,callback) {
                                return function () {
                                    callback.call(this);
                                    opts[key].call(this);
                                }
                            })(i,$vm[i]);
                        }else {
                            $vm[i] = opts[i];
                        }
                    }else {
                        $vm.props[i] = opts[i];
                    }
                }
                $vm.show = true;
                $vm.showBox = true;
                return vue.config.globalProperties.$ZAlert.index-1;
            },
            alert:function (opts){
                opts = opts || {};
                this.show((<any>Object).assign({
                    layout:"right",
                    width:"90%"
                }, opts));
            },
            hide(){
                if(vue.config.globalProperties.$ZAlert.index <= 0){
                    return;
                }
                vue.config.globalProperties.$ZAlert.index -= 1;
                let $vm = vue.config.globalProperties.$ZAlert.vm[vue.config.globalProperties.$ZAlert.index];
                if($vm){
                    $vm.show = false;
                    $vm.showBox = false;
                }
                return new Promise(resolve=>{
                    $vm.$nextTick(()=>{
                        resolve();
                    })
                });
            },
            hideAll(){
                let $vmAll = vue.config.globalProperties.$ZAlert.vm;
                for(let k in $vmAll){
                    let $vm = $vmAll[k];
                    if($vm){
                        $vm.show = false;
                        $vm.showBox = false;
                    }
                }
            },
            vm:{},
            index:0,
        };
        if(!vue.config.globalProperties.$ZAlert){
            vue.config.globalProperties.$ZAlert =  $ZXDialogAlert;
        }
    }
}
export default plugin
export const install = plugin.install
