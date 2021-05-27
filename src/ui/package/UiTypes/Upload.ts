import {DefineComponent, Prop, PropType, Component, Ref,VNode} from "vue"
const ContentTable:DefineComponent<{
    action?:Prop<string, any>;
    autoUpload?:Prop<boolean, any>;
    disabled?:Prop<boolean, any>;
    limit?:Prop<number, any>;
    headers?:Prop<object | any, any>;
    withCredentials?:Prop<boolean, any>;
    showFileList?:Prop<boolean, any>;
    data?:Prop<object | any, any>;
    name?:Prop<string, any>;
    multiple:Prop<boolean, any>;
    listType:Prop<string, any>;
    drag:Prop<boolean, any>;
    accept:Prop<string, any>;
    fileList:Prop<any[], any>;
    beforeUpload:Prop<FunctionConstructor, any>;
    beforeRemove:Prop<FunctionConstructor, any>;
    customizeFileType:Prop<boolean, any>;
    needTesting:Prop<FunctionConstructor, any>;
    isQueueUpload:Prop<boolean, any>;
    AxiosOtpions:Prop<object | any, any>;
},any,any,any, {
    submit():void;
}, {
    empty?():VNode[];
    trigger?():VNode[];
    tip?():VNode[];
},any, {
    "on-success"(...args:any):void
    "on-error"(...args:any):void
    "on-remove"(...args:any):void
    "on-progress"(...args:any):void
    "on-change"(...args:any):void
},any,any,any, any> = {};
export default ContentTable;

export interface columns {
    type?:columns_type;
    ellipsis1?:boolean;
    ellipsis2?:boolean;
    ellipsis3?:boolean;
    className?:columns_className;
    label?:string;
    prop?:string;
    emit?:string;
    width?:any;
    btns?:columns_btns[];
    show?(row:any,column:any,btnItem:any):boolean;
    filter?(value:any,row:any,column:any):any;
    classNameFilter?(row:any,column:any):any;
    applyText?:string;
    applyValue?:boolean;
    popoverComponent?:Ref<Component>;
    popover_trigger?:TriggerType;
    popover_title?:string;
    popover_placement?:Placement;
    placeholder?:string;
    selectData?:selectDataObj[];
    clearable?:boolean;
    sortable?:boolean;
    minWidth?:any;
    fixed?:string;
    align?:string;
    columns?:columns[]
}

export type columns_className = string | null
    | "default" | 'success' | 'delete' | 'primary' | 'orange' | 'black'
    | "default_link" | 'success_link' | 'delete_link' | 'primary_link' | 'orange_link' | 'black_link'
    | "default_bg_init" | 'success_bg_init' | 'delete_bg_init' | 'primary_bg_init' | 'orange_bg_init' | 'black_bg_init'
    | "default_bg" | 'success_bg' | 'delete_bg' | 'primary_bg' | 'orange_bg' | 'black_bg';

export type columns_type = string| null | 'custom' | 'switch' | "edit" | "operate" | 'tooltip' | 'number' | 'selection' | 'popover' | 'select';

export type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export type TriggerType = 'click' | 'hover' | 'focus' | 'manual'
export  type AutoPlacement = "auto" | "auto-start" | "auto-end";
export  type VariationPlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";
export  type BasePlacement = "top" | "bottom" | "right" | "left" | "auto";
export  type Placement = AutoPlacement | BasePlacement | VariationPlacement;

export interface columns_btns {
    [key:string]:any;
    name?:string;
    ellipsis1?:boolean;
    ellipsis2?:boolean;
    ellipsis3?:boolean;
    className?:columns_className;
    type?: "primary" | "success" | "warning" | "danger" | "info" | "text" | "default";
    size?: {
        type: PropType<ComponentSize>;
        validator: (val: string) => boolean;
    };
    icon?: {
        type: StringConstructor;
        default: string;
    };
    nativeType?: {
        type: PropType<"button" | "submit" | "reset">;
        default: string;
        validator: (val: string) => boolean;
    };
    loading?: BooleanConstructor;
    disabled?: BooleanConstructor;
    plain?: BooleanConstructor;
    autofocus?: BooleanConstructor;
    round?: BooleanConstructor;
    circle?: BooleanConstructor;
}

export type selectDataObj = {
    [key:string]:any;
    label?:any;
    value?:any;
}