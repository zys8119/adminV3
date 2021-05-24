import ZXDialogAlert from './ZXDialogAlert.vue'
import ZAlertFooter from './ZAlertFooter.vue';
import {$ZAlert, $ZAlertOptions} from "./Interface";
import { Plugin, createApp } from "vue"
import ElementPlus from 'element-plus';
import airforcePlug from '../airforcePlug';
import store from '../../index';
const optsInitData:$ZAlertOptions = {
    components:null,
    props: {},
    content: null,
    title: null,
    width: "50%",
    fullscreen: null,
    top: "15vh",
    modal: true,
    modalAppendToBody: true,
    appendToBody:  false,
    lockScroll: true,
    customClass:  null,
    closeOnClickModal:  false,
    closeOnPressEscape:  true,
    showClose:  true,
    beforeClose:  null,
    center:  false,
    destroyOnClose:  false,
    slotTitle:  null,
    slotFooter: null,
    maxHeight:  1,
    layout: "conter",
}
const plugin:Plugin = {
    install (vue) {
        vue.component("ZAlertFooter", ZAlertFooter);
        const $ZXDialogAlert = <$ZAlert>{
            show:(opts:$ZAlertOptions)=>{
                opts = (<any>Object).assign(<$ZAlertOptions>optsInitData,opts);
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
                    if(!FilterField[i]){
                        // @ts-ignore
                        ZXDialogAlert.props[i] = ZXDialogAlert.props[i] || {};
                        // @ts-ignore
                        ZXDialogAlert.props[i].default = opts[i]
                    }
                }
                let $vm;
                if (!$vm) {
                    const container = document.createElement('div');
                    $vm = createApp(<any>ZXDialogAlert)
                        .use(ElementPlus)
                        .use(store)
                        .use(airforcePlug)
                        .use({
                            install($vmVue){
                                $vmVue.config.globalProperties.$ZAlert = $ZXDialogAlert;
                            }
                        })
                        .component("ZAlertFooter", ZAlertFooter)
                        .mount(container);
                    document.body.appendChild(container);
                }
                vue.config.globalProperties.$ZAlert.vm[vue.config.globalProperties.$ZAlert.index] = $vm;
                vue.config.globalProperties.$ZAlert.index += 1;
                $vm.show = false;
                $vm.showBox = false;
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
                    }
                }
                $vm.show = true;
                $vm.showBox = true;
                return vue.config.globalProperties.$ZAlert.index-1;
            },
            alert:function (opts){
                opts = opts || {};
                return this.show((<any>Object).assign({
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
                return new Promise(resolve=> {
                    let $vmAll = vue.config.globalProperties.$ZAlert.vm;
                    for(let k in $vmAll){
                        let $vm = $vmAll[k];
                        if($vm){
                            $vm.show = false;
                            $vm.showBox = false;
                        }
                    }
                    setTimeout(()=>{
                        resolve();
                    })
                })
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
