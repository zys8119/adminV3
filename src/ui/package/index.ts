import {App, Component} from "vue"
const importFn =  (vue:App, Component:()=>Promise<Component>)=>{
    (async ()=>{
        const ComponentObj = (<any>await Component()).default;
        vue.component(ComponentObj.name, ComponentObj);
    })();
}
export default (vue:App)=>{
    importFn(vue,()=>import("./ContentTable.vue"));
    importFn(vue, ()=>import("./AA.vue"));
}