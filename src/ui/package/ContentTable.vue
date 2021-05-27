<template>
    <div class="ContentTable">
        <el-table
            :data="ContentTableData"
            @select-all="selectAll"
            ref="table"
        >
            <el-table-column
                v-for="(item,key) in columns" :key="key"
                :label="item.label"
                :width="widthInit(item)"
                :prop="item.prop"
                :show-overflow-tooltip="item.showOverflowTooltip"
                :type="item.type"
            >
                <template #default="{row,$index}">
                    <!--选择-->
                    <template v-if="['selection'].includes(item.type)">
                        <el-checkbox @change="checkboxRowChange" v-model="row.$ContentTableDataCheckbox"></el-checkbox>
                    </template>
                    <!--操作-->
                    <template v-if="['operate'].includes(item.type)">
                        <template v-for="(it,k) in item.btns" :key="k">
                            <ZButton
                                @click="emitInit(it.emit,row,it, item)"
                                :class="classNameInit(it,row,item)"
                                v-if="item.btns && (typeof it.show === 'function' ? it.show(row,item,it) : true)"
                                :config="it">
                            </ZButton>
                        </template>
                    </template>
                    <!--序号-->
                    <template v-else-if="['number'].includes(item.type)">
                        <span class="textType"
                              @click="emitInit(item.emit,row, item)"
                              :class="classNameInit(item,row, item)">
                            {{$index+1}}
                        </span>
                    </template>
                    <!--快捷编辑-->
                    <template v-else-if="['edit'].includes(item.type)">
                        <el-popover
                            :placement="item.popover_placement || 'bottom'"
                            :title="`【${item.label}】快捷修改`"
                            popper-class="contentTable-el-popover"
                            trigger="click"
                            v-model:visible="row[getKey($index,item.prop,key)]">
                            <template #reference>
                                <span class="textType" @click="popoverClick(item,row)">
                                    {{textInit(row,item)}}
                                    <i class="el-icon-edit-outline"></i>
                                </span>
                            </template>
                            <i class="el-icon-close" @click="row[getKey($index,item.prop,key)] = !row[getKey($index,item.prop,key)]"></i>
                            <el-input placeholder="请输入关键字" v-model="popoverValue"
                                      @change="row[getKey($index,item.prop,key)] = false , emitInit(item.emit,popoverValue,row, item)"></el-input>
                            <z-button :config="{name:(item.applyText || '应用')}"
                                      @click="row[getKey($index,item.prop,key)] = false , emitInit(item.emit,popoverValue,row, item)"></z-button>
                        </el-popover>
                    </template>
                    <!--tooltip-->
                    <template v-else-if="['tooltip'].includes(item.type)">
                        <el-tooltip class="item" effect="dark" placement="top">
                            <template #content>
                                {{textInit(row,item)}}
                            </template>
                            <span class="textType"
                                  @click="emitInit(item.emit,row, item)"
                                  :class="classNameInit(item,row, item)">
                                {{textInit(row,item)}}
                            </span>
                        </el-tooltip>
                    </template>
                    <!--popover-->
                    <template v-else-if="['popover'].includes(item.type)">
                        <el-popover
                            @show="emitInit('popover-show',row, item)"
                            :placement="item.popover_placement || 'top'"
                            :title="item.popover_title"
                            popper-class="contentTable-el-popover"
                            :trigger="item.popover_trigger || 'hover'">
                            <slot name="popover" :column="item" :index="$index" :row="row" :key="key">
                                <component :is="item.popoverComponent"
                                           v-if="item.popoverComponent"
                                           :column="item" :index="$index" :row="row" :key="key"></component>
                            </slot>
                            <template #reference>
                                <span class="textType" :class="classNameInit(item,row, item)"
                                      @click="emitInit(item.emit,row, item)">
                                    {{textInit(row,item)}}
                                </span>
                            </template>
                        </el-popover>
                    </template>
                    <!--默认-->
                    <template v-else>
                        <span class="textType"
                            @click="emitInit(item.emit,row, item)"
                            :class="classNameInit(item,row, item)">
                            {{textInit(row,item)}}
                        </span>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
export default{
    props:{
        columns:{
            type:Array,
            default:Array,
            required:true,
            validator(value){
                return ["[object Array]"].includes(Object.prototype.toString.call(value))
            }
        },
        data:{
            type:Array,
            default:Array,
            required:false,
            validator(value){
                return ["[object Array]"].includes(Object.prototype.toString.call(value))
            }
        }
    },
    name: "ContentTable",
    data(){
        return {
            popoverValue:null,
        }
    },
    mounted() {
    },
    methods:{
        getKey($index,prop,key){
            return `contentTable-el-popover-${$index}-${prop}-${key}`;
        },
        popoverClick(columns,row){
            if(columns.applyValue){
                this.popoverValue = row[columns.prop];
                return;
            }
            this.popoverValue = null;
        },
        selectAll(v){
            if(v.length === 0){
                this.ContentTableData.forEach(it=>{
                    it.$ContentTableDataCheckbox = false;
                });
            }else {
                v.forEach(it =>{
                    it.$ContentTableDataCheckbox = true;
                });
            }
            this.$emit("on-selection", this.ContentTableData.filter(e=>e.$ContentTableDataCheckbox))
        },
        checkboxRowChange(){
            if(this.ContentTableData.filter(e=>e.$ContentTableDataCheckbox).length < this.ContentTableData.length){
                this.$refs.table.clearSelection()
            }
            this.$emit("on-selection", this.ContentTableData.filter(e=>e.$ContentTableDataCheckbox))
        },
        widthInit(item){
            return {
                selection:item.width || "50px",
                number:item.width || "50",
            }[item.type] || item.width
        },
        textInit(row,item){
            if(typeof item.filter === 'function'){
                return item.filter(this.$utils.lodash.get(row,item.prop),row,item);
            }
            return this.$utils.lodash.get(row,item.prop);
        },
        classNameInit(it,row, item){
            return this.$utils.lodash.merge({
                "ellipsis-1":it.ellipsis1,
                "ellipsis-2":it.ellipsis2,
                "ellipsis-3":it.ellipsis3,
            },(it.className || "").split(" ").filter(e=>e).reduce((a,b)=>(a[b] = true) && a,{}),typeof it.classNameFilter === 'function' ? it.classNameFilter(row, item) || {} :{});
        },
        emitInit(emit,...args){
            return emit ? this.$emit(emit,...args) : ()=>void (0);
        }
    }
}
</script>

<style scoped lang="less">
.ContentTable{
    .ZButton{
        .colorInit();
    }
    .textType{
        .colorInit();
    }
}
</style>