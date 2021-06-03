<template>
    <div class="TransferTree">
        <template v-for="(item,key) in currentOptions" :key="key">
            <div class="TransferTreeNode" v-if="item.is_open" @click="nodeClick(item,'nodeClick')">
                <div :style="{marginLeft:`${(item.level-1)*15}px`}">
                    <el-checkbox v-model="item.checkbox" @change="checkboxChange($event, item)"></el-checkbox>
                    <span>{{item.data[fieldName]}}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">

import fa from "element-plus/packages/locale/lang/fa";

export default {
    name: "TransferTree",
    data(){
        return {
        }
    },
    props:{
        fieldName:{type:String,default:"name"},
        childrenFieldName:{type:String,default:"children"},
        options:{
            type:Array,
            default:()=>[
                {name:"1",id:"1444"},
                {name:"2",id:"1444",children:[
                    {name:"2-1",id:"1444"},
                    {name:"2-2",id:"1444"},
                    {name:"2-3",id:"1444"},
                ]},
                {name:"3",id:"1444",children:[
                    {name:"3-1",id:"1444"},
                    {name:"3-2",id:"1444"},
                    {name:"3-3",id:"1444",children:[
                        {name:"3-3-1",id:"1444",children:[
                            {name:"3-3-1-1",id:"1444",children:[

                            ]},
                        ]},
                    ]},
                    {name:"3-4",id:"1444"},
                ]},
                {name:"4",id:"1444"},
            ]
        }
    },
    computed:{
        currentOptions:{
            get(){
                let result = [];
                this.currentOptionsInit((this.options || []),result,{});
                return result;
            },
            set(val){
                return val;
            }
        }
    },
    methods:{
        currentOptionsInit(options,result,extra:any = {}){
            options.forEach((it,key)=>{
                const node = {
                    data:it,
                    level:extra.level || 1,
                    is_open:Object.prototype.toString.call(extra.is_open) === "[object Boolean]" ? extra.is_open : true,
                    deep:extra.deep ? (<Array<number>>extra.deep).concat([key]) : [key],
                    checkbox:false,
                }
                result.push(node);
                if(it[this.childrenFieldName] && Object.prototype.toString.call(it[this.childrenFieldName]) === "[object Array]"){
                    this.currentOptionsInit(it[this.childrenFieldName], result,{
                        ...node,
                        level:node.level+1,
                        is_open:false,
                    });
                }
            })
        },
        nodeClick(item, type){
            let parentNode = null;
            const itemChildren = this.currentOptions.filter(e=>{
                if(JSON.stringify(item.deep.slice(0,item.deep.length -1)) === JSON.stringify(e.deep)){
                    parentNode = e;
                }
                return e !== item && item.deep.length+1 === e.deep.length && JSON.stringify((<number[]>e.deep).slice(0,item.deep.length)) === JSON.stringify(item.deep);
            });
            itemChildren.forEach(it=>{
                it.is_open = !it.is_open;
            })
            this.$forceUpdate();
            this.$emit(type,item, parentNode);
        },
        checkboxChange(val, item){
            console.log(item)
            // this.nodeClick(val, item)
            this.$forceUpdate();
        }
    }
}
</script>

<style scoped lang="less">
.TransferTree{
    .TransferTreeNode{
        line-height: 30px;
        user-select: none;
        transition: all ease-in-out 300ms;
        &+.TransferTreeNode{
            border-top: 1px solid #d8d8d8;
            &:hover{
                background-color: #999999;
            }
        }
        .el-checkbox{
            margin-right: @unit10;
        }
    }
}
</style>