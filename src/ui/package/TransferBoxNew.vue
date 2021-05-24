<template>
    <div class="TransferTest">
        <div class="TransferLeft">
            <div class="TreeSearchBox">
                <el-input class="TreeSearch"
                          prefix-icon="el-icon-search"
                          v-model="search"
                          @change="searchChange(index)"
                          @keyup.native.enter="searchChange(index)"
                          clearable
                          placeholder="请输入关键字">
                </el-input>
                <div class="TransferTestTitle" v-if="$scopedSlots.title">
                    <slot name="title" :type="type" :index="index"></slot>
                </div>
            </div>
            <div class="TransferBox" :style="{height:height-85-(($scopedSlots.title)?30:0) - 2+'px'}">
                <slot name="header"></slot>
                <el-tree
                        v-if="index > 0"
                        :indent="indent"
                        :data="lazy? null : currentOptions"
                        show-checkbox
                        :node-key="nodeIdField"
                        :props="{
                        label:showNameField,
                        children:childrenField,
                        isLeaf:(data)=>isLeaf ? isLeaf(data) : node_type(data),
                    }"
                        :check-strictly="checkStrictly"
                        :filter-node-method="filterNodeMethod"
                        @check="checkChange"
                        @node-expand="nodeExpand"
                        :load="lazyLoad"
                        :lazy="lazy"
                        ref="elTree"
                >
                    <template slot-scope="{node, data}">
                        <slot :data="data" :node="node">
                            <div>
                                <slot name="icon" :data="data" :node="node">
                                    <img class="m-r-5" v-if="data.node_type === 0" :src="img5" alt="">
                                    <img class="m-r-10" v-if="data.node_type === 20" :src="img3" alt="">
                                    <img class="m-r-10" v-else-if="data.node_type === 21 || data.node_type === 32" :src="img4" alt="">
                                    <span class="m-r-10" v-else-if="data.node_type !== 0 && data.node_type !== 1701">
                                        <img v-if="node.expanded" :src="img2" alt="">
                                        <img v-else :src="img1" alt="">
                                    </span>
                                </slot>
                                <span :title="`${label?label(data[showNameField],data,_self):data[showNameField]}`">{{label?label(data[showNameField],data,_self):data[showNameField]}}</span>
                            </div>
                        </slot>
                    </template>
                </el-tree>
                <template v-else>
                    <slot name="header">
                        <el-checkbox class="checkAll" :indeterminate="currentValue.length > 0 && currentOptionsChosen.length !== currentValue.length" v-model="checkAll" @change="handleCheckAllChange">
                            全选 <span>已选：{{currentValue.length}}/{{currentOptionsChosen.length}}</span>
                            <span class="del" @click.stop="delAll">全部删除</span>
                        </el-checkbox>
                    </slot>
                    <el-checkbox-group  v-model="currentValue">
                        <div class="right-list" v-for="(item,key) in currentOptionsChosen" :key="key" v-if="item[showNameField]?item[showNameField].indexOf(search) > -1:false">
                            <el-checkbox :label="item[nodeIdField]" :key="key" @change="handleCheckedCitiesChange">
                                <slot :data="item" :node="{data:item}">
                                    {{label?label(item[showNameField],item,_self):item[showNameField]}}
                                </slot>
                            </el-checkbox>
                        </div>
                    </el-checkbox-group>
                </template>
            </div>
        </div>
        <div class="TransferRight" v-if="index > 0">
            <div class="TransferRightItem" v-for="i in index" :key="i">
                <div class="TransferContent">
                    <el-button icon="el-icon-arrow-right" class="arrowRight" @click="arrowRight(i)"></el-button>
                    <el-button icon="el-icon-arrow-left" class="arrowLeft"  @click="arrowLeft(i)"></el-button>
                </div>
                <div class="TransferRightContent">
                    <transfer-box
                            :index="0"
                            :options="mapVal[i] || []"
                            :height="height/index"
                            :ref="`transfer${i}`"
                            :showNameField="showNameField"
                            :childrenField="childrenField"
                            :nodeIdField="nodeIdField"
                            :node_type="node_type"
                            :arrowsIcon="arrowsIcon"
                            :quantity="quantity"
                            :checkStrictly="checkStrictly"
                            type="right"
                            :refIndex="i"
                            :label="label"
                            :key="i"
                            :isLeaf="isLeaf"
                            @lazyLoad="lazyLoad"
                    >
                        <slot slot="title" name="title" type="right" :index="i"></slot>
                        <slot slot="header" name="header"></slot>
                        <template slot-scope="{data, node}">
                            <slot :data="data" :node="node"></slot>
                        </template>
                        <template slot="icon" slot-scope="{data, node}">
                            <slot name="icon" :data="data" :node="node"></slot>
                        </template>
                    </transfer-box>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * node_type: 20 (代表城市 宁波市本级) ，
 *            21/31 （代表组织架构），
 *            0（代表人员），
 *            1701(代表文件)，
 *            1702(代表文件目录)。
 *            其他值 都是已文件夹形式展示
 */
export default {
    name: "transfer-box",
    props:{
        options:{type:Array,default:Array},
        showNameField:{type:String,default:"node_name"},
        childrenField:{type:String,default:"children"},
        nodeIdField:{type:String,default:"node_id"},
        node_type:{type:Function,default:data=>(data.node_type === 0)},
        arrowsIcon:{type:Boolean,default:true},
        quantity:{type:Boolean,default:true},
        height:{type:Number,default:500},
        index:{type:Number,default:1},
        type:{type:String,default:"left"},
        value:{type:Array,default:Array},
        refIndex:{type:Number,default:null},
        label:{type:Function,default:null},
        line:{type:Boolean,default:false},
        indent:{type:Number,default:5},
        arrow:{type:Function,default:()=>false},
        checkStrictly:{type:Boolean,default:false},
        isLeaf:{type:Function,default:null},
    },
    data(){
        return {
            img1: require('./assets/images/1.png'),
            img2: require('./assets/images/2.png'),
            img3: require('./assets/images/3.png'),
            img4: require('./assets/images/4.png'),
            img5: require('./assets/images/5.png'),
            checkbox:false,
            map:{},
            currentValue:[],
            search:"",
            currentOptions:[],
            mapVal:{},
            currentCheckedNodes:[],
            checkAll:false,
            nodeExpandInfo:null,
        }
    },
    computed:{
        // 是否开启懒加载
        lazy(){
            if(this && this._events){
                return !!this._events.lazyLoad
            }
            return false;
        },
        currentOptionsChosen(){
            if(this.lazy){
                return this.options;
            }
            return this.currentOptions;
        }
    },
    watch:{
        // 监听数据
        options(){
            this.initOptions();
        },
        // 监听value
        value(a,b){
            this.initOptions(true);
        }
    },
    mounted() {
        // 初始数据
        this.initOptions();
    },
    methods:{
        // v-model
        setInput(bool){
            this.$nextTick(()=>{
                setTimeout(()=>{
                    let val = [];
                    for(let i = 0 ; i < this.index ; i++){
                        val.push([]);
                    }
                    Object.keys(this.mapVal).forEach(e => {
                        val[parseInt(e) - 1] = this.mapVal[e].map(e => e[this.nodeIdField]);
                    });
                    if(this.index === 1){
                        val = this.$utils.lodash.flattenDeep(val)
                    }
                    if(!bool){
                        this.$emit("input",val);
                        this.$emit("on-change",val);
                    }
                })
            });
        },
        // 左侧复选回调
        checkChange(data,node){
            this.currentValue = node.checkedKeys;
            this.currentCheckedNodes = node.checkedNodes;
            if(data){
                let currentCheckedNodes = node.checkedNodes.map(e=>this.$refs.elTree.getNode(e)).filter(e=>e && e.visible).map(e=>e.data)
                this.currentValue = currentCheckedNodes.map(e=>e[this.nodeIdField]);
                this.currentCheckedNodes = currentCheckedNodes;
            }
        },
        // 搜索过滤
        filterNodeMethod(value, data){
            if (!value) return true;
            return data[this.showNameField]?data[this.showNameField].indexOf(value) !== -1:false;
        },
        // 搜索逻辑分离
        searchChange(i){
            if(i !== 0){
                this.$nextTick(()=>{
                    if(this.$refs.elTree){
                        this.$refs.elTree.filter(this.search);
                    }
                });
            }
        },
        // 全选状态判断
        handleCheckAllChange(val){
            if(val){
                this.currentValue = this.options.map(e=>e[this.nodeIdField]);
            }else {
                this.currentValue = [];
            }
            return Promise.resolve()
        },
        // 右侧人员回退并恢复数据
        resume(tree,_vm){
            tree.$utils.lodash.flattenDeep(_vm.currentValue.map(e=>tree.map[e])).forEach(e=>{
                tree.$refs.elTree.append(e.data, e.parentNode);
            });
        },
        // 删除全部
        delAll(){
            this.handleCheckAllChange(true).then(()=>{
                this.checkAll = false;
                setTimeout(()=>{
                    this.$parent.arrowLeft(this.refIndex);
                })
            });
        },
        // 右侧全选状态关联处理
        handleCheckedCitiesChange(){
            this.checkAll = this.currentOptionsChosen.length === this.currentValue.length;
        },
        // 懒加载向左移动
        lazyArrowLeft(tree,_vm){
            let selectData = tree.$utils.lodash.flattenDeep(_vm.currentValue.map(e=>tree.map[e]))
            let elTree = tree.$refs.elTree;
            let store = elTree.store;
            const resolve = function (children) {
                this.doCreateChildren(children);
                this.store._initDefaultCheckedNodes();
            };
            selectData.forEach(({data,parentNode})=>{
                if(!parentNode.childNodes.some(e=>e.data === data)){
                    resolve.call(parentNode,[data]);
                }
            })
        },
        // 向左移动
        arrowLeft(i){
            if(this.arrow({
                val:this.currentValue,
                data:this.currentCheckedNodes,
                _self:this,
                parent:this.$parent,
                type:"right",
                arrow:"left",
            })){return};
            let _vm = this.$refs[`transfer${i}`][0];
            if(this.lazy){
                this.lazyArrowLeft(this, _vm);
            }else {
                this.resume(this, _vm);
            }
            this.$set(this.mapVal,i,this.mapVal[i].filter(e=>_vm.currentValue.indexOf(e[this.nodeIdField]) === -1));
            _vm.currentValue = [];
            _vm.checkAll = false;
            this.setInput();
        },
        // 向右移动
        arrowRight(i,bool){
            if(this.arrow({
                val:this.currentValue,
                data:this.currentCheckedNodes,
                _self:this,
                parent:null,
                type:"left",
                arrow:"right",
            })){return};
            let oldMap = this.mapVal[i] || [];
            oldMap = oldMap.concat(this.currentCheckedNodes.filter(this.node_type));
            oldMap = [...new Set(oldMap.map(e=>e[this.nodeIdField]))].map(nodeIdField=>{
                let res = oldMap.find(e=>e[this.nodeIdField] === nodeIdField);
                return res;
            });
            this.$set(this.mapVal,i,oldMap);
            this.getCheckedNodes();
            oldMap.forEach(e=>{
                this.$nextTick(()=>{
                    let Node = this.$refs.elTree.store.nodesMap[e[this.nodeIdField]];
                    this.removeChildInterceptor(Node).then(()=>{
                        this.$refs.elTree.remove(Node);
                    });
                });
            });
            this.$refs.elTree.setCheckedKeys([]);
            this.$refs[`transfer${i}`][0].checkAll = false;
            this.$refs[`transfer${i}`][0].currentValue = [];
            this.setInput(bool);
        },
        getCheckedNodes(leafOnly = false, includeHalfChecked = false, removeChild = false) {
            const traverse = function(node,_vm) {
                const childNodes = node.root ? node.root.childNodes : node.childNodes;
                childNodes.forEach((child) => {
                    if(!removeChild){
                        if(child.indeterminate){
                            child.indeterminate = false;
                        }
                        if ((child.checked || (includeHalfChecked && child.indeterminate)) && (!leafOnly || (leafOnly && child.isLeaf)) || _vm.currentValue.indexOf(child.data[_vm.nodeIdField]) > -1) {
                            if(_vm.node_type(child.data)){
                                _vm.$nextTick(()=>{
                                    if(_vm.map[child.data[_vm.nodeIdField]]){
                                        _vm.map[child.data[_vm.nodeIdField]].push({
                                            data:child.data,
                                            parentNode:child.parent
                                        })
                                    }else {
                                        _vm.map[child.data[_vm.nodeIdField]] = [{
                                            data:child.data,
                                            parentNode:child.parent
                                        }];
                                    }
                                    try {
                                        const data = _vm.$refs.elTree.store.nodesMap[child.parent.data[_vm.nodeIdField]]
                                        if(data){
                                            _vm.removeChildInterceptor(child).then(()=>{
                                                data.removeChild(child)
                                            });
                                        }
                                    }catch (e) {/*err*/}

                                })
                            }else {
                                _vm.$nextTick(()=> {
                                    _vm.$refs.elTree.setChecked(child.data, false, true);
                                });
                            }
                        }
                    }else {
                        removeChild(child);
                    }

                    traverse(child,_vm);
                });
            };

            traverse(this.$refs.elTree.store, this);

        },
        // 节点展开事件
        nodeExpand(data, node, vm){
            this.nodeExpandInfo = node;
            this.$emit("node-expand", data, node, vm)
        },
        // 删除子节点拦截器
        removeChildInterceptor(node){
            return new Promise((resolve, reject) => {
                if(node && node.data && this.currentValue.indexOf(node.data[this.nodeIdField]) > -1){
                    resolve();
                }else {
                    reject();
                }
            });
        },
        // 初始化数据
        initOptions(bool){
            if(this.lazy){return ;}
            this.currentValue = [];
            this.map = {};
            if(!bool || !this.lazy){
                this.mapVal = {};
            }
            this.currentOptions = [];
            this.currentOptions = JSON.parse(JSON.stringify(this.options));
            setTimeout(()=>{
                this.searchChange();
                this.initValue();
            })
        },
        // 初始化value下一步公共逻辑
        nextValue(val,index){
            this.$refs.elTree.setCheckedKeys(val);
            this.$refs.elTree.$nextTick(()=>{
                this.checkChange(null,{
                    checkedKeys:this.$refs.elTree.getCheckedKeys(),
                    checkedNodes:this.$refs.elTree.getCheckedNodes(),
                });
                this.$nextTick(()=>{
                    this.arrowRight(index, true);
                });
            })
        },
        // 初始化value
        initValue(){
            if(this.index !== 0){
                if(this.index === 1){
                    this.$nextTick(()=>{
                        this.nextValue(this.value || [],1)
                    });
                }else {
                    this.$nextTick(()=> {
                        this.value.forEach((e,index) => {
                            setTimeout(()=>{
                                this.nextValue(e || [], index + 1);
                            })
                        })
                    });
                }
            }
        },
        // 兼容老版
        updateValue(){},
        // 懒加载
        lazyLoad(node, resolve){
            let data = {
                get_children:false,
            };
            if(node.data){
                data[this.nodeIdField] = node.data[this.nodeIdField];
                data["node_type"] = node.data["node_type"];
            }
            /**
             * 懒加载拦截
             */
            this.$emit("lazyLoad", data, (...arg)=>{
                resolve(...arg);
                // 清除新数据的checked状态
                this.$nextTick(()=>{
                    if(this.nodeExpandInfo){
                        this.nodeExpandInfo.childNodes.forEach(e=>{
                            e.checked = false;
                        })
                    }
                });
            }, node, this);
        },
    }
}
</script>

<style scoped lang="less">
.TransferTest{
    overflow: hidden;
    @w:20%;
    @w2:70px;
    /deep/ .el-tree-node__content {
        height: 25px;
    }
    .TransferLeft{
        float: left;
        width: (100% - @w) / 2;
        width: ~"calc((100% - @{w2}) / 2 - 4px)";
        border: 1px solid #e5e5e5;
        .TransferBox{
            padding: @unit15;
            height: 500px;
            overflow: auto;
        }
        .TreeSearchBox{
            padding: @unit15;
            padding-bottom: 0;
        }
    }
    .TransferRight{
        .TransferLeft;
        float: right;
        width: (100% - @w) / 2 + @w;
        width: ~"calc((100% - @{w2}) / 2 + @{w2} - 2px)";
        border: none;
        .right-list {
            line-height: 30px;
        }
        .TransferRightItem{
            overflow: hidden;
            width: 100%;
            position: relative;
            .TransferContent{
                float: left;
                text-align: center;
                width:@w;
                width:~"calc(@{w2})";
                position: absolute;
                left: -2px;
                top: 25%;
                top:~"calc(50%)";
                transform: translateY(-50%);
                .arrowLeft{
                    display: block;
                    margin: 0 auto;
                    margin-top: @unit15;
                }
                .arrowRight{
                    .arrowLeft;
                    margin-top: 0;
                }
            }
            .TransferRightContent{
                float: right;
                width: (100% - @w);
                width:~"calc(100% - @{w2})";
            }
            .checkAll{
                width: 100%;
                line-height: 35px;
                &/deep/ .el-checkbox__label{
                    .del{
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }

            }
        }
        .TransferTest{
            border:none;
            .TransferLeft{
                width: 100%;
                width: ~"calc(100% - 2px)";
            }
        }
    }
    span.checkbox{
        float: left;
        @s:16px;
        @transition:background-color,color ease-in 80ms;
        width: @s;
        height: @s;
        margin: 0 @unit15;
        margin-top: (50px - @s) /2;
        border-radius: 2px;
        box-shadow: inset 0 0 0 1px #d8d8d8;
        user-select: none;
        line-height: @s;
        text-align: center;
        font-size: 12px;
        color: transparent;
        position: relative;
        z-index: 1;
        &.checkbox{
            background-color: #009FF5;
            color:#ffffff;
            //transition: @transition;
        }
        &.uncheckbox{
            background-color: tint(#d8d8d8,90%);
            color: transparent;
            //transition: @transition;
        }
    }
    .tree_header{
        line-height: 50px;
    }
    span{
        &.quantity{
            color: #999999;
            margin-left: @unit10;
        }
        &.icon{
            color: @themeColor;
            font-size: 18px;
            margin-right: @unit10;
        }
        &.close{
            float: right;
            margin-right: @unit15;
            color: #666666;
            display: none;
            &:hover{
                color: @themeColor;
            }
        }
    }
    img {
        width: 16px;
    }
    .TransferTestTitle{
        line-height: 30px;
        height: 30px;
        overflow: hidden;
        font-size: 16px;
    }
}
</style>
