import {DefineComponent, Prop} from "vue"
const ContentTable:DefineComponent<{
    columns:Prop<Array<columns>, Array<any>>;
    data?:Prop<Array<any>, Array<any>>;
},any,any,any, {
},any,any, {
    onSelection(selectionData:any[]):void
},any,any,any,any> = {};
export default ContentTable;

export interface columns {
    type?:columns_type;
    ellipsis1?:boolean;
    ellipsis2?:boolean;
    ellipsis3?:boolean;
    className?:columns_className;
    prop?:string;
    emit?:string;
    width?:any;
}

export type columns_className = string | null
    | "default" | 'success' | 'delete' | 'primary' | 'orange' | 'black'
    | "default_link" | 'success_link' | 'delete_link' | 'primary_link' | 'orange_link' | 'black_link'
    | "default_bg_init" | 'success_bg_init' | 'delete_bg_init' | 'primary_bg_init' | 'orange_bg_init' | 'black_bg_init'
    | "default_bg" | 'success_bg' | 'delete_bg' | 'primary_bg' | 'orange_bg' | 'black_bg';

export type columns_type = string| null | "operate" | 'tooltip' | 'number' | 'selection';