<template>
    <div class="TransferTree">
        <el-input @change="searchChange" v-model="search" v-if="showSearch" :placeholder="searchPlaceholder"></el-input>
        <div class="TransferTreeNode" v-if="showCheckbox">
            <div>
                <el-checkbox v-model="checkboxAll" @change="checkboxChangeAll($event)"></el-checkbox>
                <span>全选</span>
            </div>
        </div>
        <template v-for="(item,key) in currentOptions" :key="key">
            <div class="TransferTreeNode" v-if="item.is_open" @click="nodeClick(item,'nodeClick')">
                <div :style="{marginLeft:search ? null : `${(item.level-1)*15}px`}">
                    <el-checkbox v-model="item.checkbox" @change="checkboxChange($event, item)"  v-if="showCheckbox"></el-checkbox>
                    <slot v-bind:="item">
                        <span>{{item.data[fieldName]}}</span>
                    </slot>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">

export default {
    name: "TransferTree",
    data(){
        return {
            checkboxAll:false,
            currentOptionsMap:{},
            search:null,
        }
    },
    props:{
        fieldName:{type:String,default:"name"},
        childrenFieldName:{type:String,default:"children"},
        showSearch:{type:Boolean,default:true},
        showCheckbox:{type:Boolean,default:true},
        searchPlaceholder:{type:String,default:"请输入关键字"},
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
        copyOptions:{
            get(){
                return this.options;
            },
            set(value){
                return value;
            }
        },
        currentOptions:{
            get(){
                return this.getCurrentOptions();
            },
            set(val){
                return val;
            }
        }
    },
    methods:{
        getCurrentOptions(){
            let result = [];
            this.currentOptionsMap = {};
            this.currentOptionsInit((JSON.parse(JSON.stringify(this.copyOptions || []))),result,{});
            return result;
        },
        currentOptionsInit(options,result,extra:any = {}){
            options.forEach((it,key)=>{
                const node = {
                    data:it,
                    level:extra.level || 1,
                    is_open:Object.prototype.toString.call(extra.is_open) === "[object Boolean]" ? extra.is_open : true,
                    deep:extra.deep ? (<Array<number>>extra.deep).concat([key]) : [key],
                    checkbox:false,
                }
                this.currentOptionsMap[JSON.stringify(node.deep)] = node;
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
        nodeClick(item, type, extra:any = {}){
            let parentNode = null;
            const itemChildren = this.currentOptions.filter(e=>{
                if(JSON.stringify(item.deep.slice(0,item.deep.length -1)) === JSON.stringify(e.deep)){
                    parentNode = e;
                }
                let bool = item.deep.length+1 === e.deep.length;
                if(type === "checkbox"){
                    bool = true;
                }
                return e !== item && bool && JSON.stringify((<number[]>e.deep).slice(0,item.deep.length)) === JSON.stringify(item.deep);
            });
            itemChildren.forEach(it=>{
                if(type === "checkbox"){
                    it.checkbox = extra.val;
                }else {
                    it.is_open = !it.is_open;
                }
            })
            this.$forceUpdate();
            this.$emit(type,item, parentNode,extra);
        },
        checkboxChange(val, item){
            this.nodeClick(item, "checkbox", {val})
            this.getNodeDeep(item)
        },
        checkboxChangeAll(val){
            this.currentOptions.forEach(it=>{
                it.checkbox = val;
            });
            this.$forceUpdate();
            this.$emit("checkbox",{val});
        },
        getSelection(){
            return this.currentOptions.filter(e=>e.checkbox)
        },
        getNodeDeep(node){
            return node.deep.map((e,k)=>{
                return this.currentOptionsMap[JSON.stringify(node.deep.slice(0,k+1))];
            })
        },
        searchChange(val){
            if(val){
                this.currentOptions.forEach(it=>{
                    it.is_open = it.data[this.fieldName].indexOf(val) > -1;
                });
            }else {
                this.currentOptions = this.getCurrentOptions();
            }
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