import {DefineComponent, Prop,VNode} from "vue"
import { ConfigType } from "wangeditor/src/config"
import Editor from "wangeditor/src/editor/index";
import {ResType} from "wangeditor/src/menus/img/upload-img";
const Wangeditor:DefineComponent<{
    mapCenter?:Prop<number[], any>;
    searchOption?:Prop<object, any>;
    zoom?:Prop<number, any>;
    show?:Prop<boolean, any>;
    level?:Prop<number, any>;
    modelValue?:Prop<any[], any>;
    relative?:Prop<boolean, any>;
},any,any,any, {
    // init():void;
}, {

},any, {
    // "on-change"(html:string):void
    // "customInsert"(inserImg: (this: Editor, src: string) => void,
    //                result: ResType,
    //                editor: Editor):void
    // "success"(xhr: XMLHttpRequest, editor: Editor, result: ResType):void
    // "error"(xhr: XMLHttpRequest, editor: Editor):void
},any,any,any, any> = {};
export default Wangeditor;