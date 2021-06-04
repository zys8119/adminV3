<template>
    <div class="TransferTree">
        <el-input @change="searchChange" v-model="search" v-if="showSearch" :placeholder="searchPlaceholder"></el-input>
        <div class="TransferTreeNode" v-if="showCheckbox && !search">
            <div>
                <el-checkbox v-model="checkboxAll" @change="checkboxChangeAll($event)"></el-checkbox>
                <span>全选</span>
                <span>{{currentOptions.length}}</span>
            </div>
        </div>
        <div class="TransferTreeNodeContent">
            <template v-for="(item,key) in currentOptions" :key="key">
                <div class="TransferTreeNode" v-if="item.is_open" @click="nodeClick(item,'nodeClick')">
                    <div :style="{marginLeft:search ? null : `${(item.level-1)*15}px`}">
                        <el-checkbox v-model="item.checkbox" @click.stop="()=>{}" @change="checkboxChange($event, item)"  v-if="showCheckbox"></el-checkbox>
                        <slot v-bind:="item">
                            <span>{{$utils.lodash.get(item.data,fieldName)}}</span>
                        </slot>
                    </div>
                </div>
            </template>
        </div>
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
        nodeId:{type:String,default:null},
        showSearch:{type:Boolean,default:true},
        showCheckbox:{type:Boolean,default:true},
        searchPlaceholder:{type:String,default:"请输入关键字"},
        options:{type:Array, default:()=>[]},
        filterInit:{type:Function, default:()=>true},
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
                return this.getCurrentOptions(this.copyOptions,true);
            },
            set(val){
                return val;
            }
        }
    },
    methods:{
        getCurrentOptions(options:any[],ClearMap?:boolean){
            let result = [];
            if(ClearMap){
                this.currentOptionsMap = {};
            }
            this.currentOptionsInit((JSON.parse(JSON.stringify(options || []))),result,{});
            return result;
        },
        currentOptionsInit(options,result,extra:any = {}){
            options.forEach((it,key)=>{
                const deepkey = this.nodeId && it[this.nodeId] ? it[this.nodeId] : key;
                const node = {
                    data:it,
                    level:extra.level || 1,
                    is_open:Object.prototype.toString.call(extra.is_open) === "[object Boolean]" ? extra.is_open : true,
                    deep:extra.deep ? (<Array<number>>extra.deep).concat([deepkey]) : [deepkey],
                    checkbox:false,
                }
                if(this.filterInit(node, it,key)){
                    this.currentOptionsMap[JSON.stringify(node.deep)] = node;
                    result.push(node);
                    if(it[this.childrenFieldName] && Object.prototype.toString.call(it[this.childrenFieldName]) === "[object Array]"){
                        this.currentOptionsInit(it[this.childrenFieldName], result,{
                            ...node,
                            level:node.level+1,
                            is_open:false,
                        });
                    }
                }
            })
        },
        nodeClick(item, type, extra:any = {}){
            const itemChildren = this.currentOptions.filter(e=>{
                return e !== item && JSON.stringify((<number[]>e.deep).slice(0,item.deep.length)) === JSON.stringify(item.deep);
            });
            itemChildren.forEach(it=>{
                if(type === "checkbox"){
                    it.checkbox = extra.val;
                }else {
                    if(item.deep.length+1 === it.deep.length){
                        it.is_open = !it.is_open;
                    }else {
                        it.is_open = false;
                    }
                }
            })
            this.$forceUpdate();
            this.$emit(type,item,extra);
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
                    it.is_open = this.$utils.lodash.get(it.data,this.fieldName).indexOf(val) > -1;
                });
            }else {
                this.currentOptions = this.getCurrentOptions(this.copyOptions,true);
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