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
                    <!--操作-->
                    <template v-if="['selection'].includes(item.type)">
                        <el-checkbox @change="checkboxRowChange" v-model="row.$ContentTableDataCheckbox"></el-checkbox>
                    </template>
                    <!--操作-->
                    <template v-if="['operate'].includes(item.type)">
                        <ZButton
                            @click="emitInit(it.emit,row,it, item)"
                            :class="classNameInit(it)"
                            v-if="item.btns"
                            v-for="(it,k) in item.btns" :key="k" :config="it">
                        </ZButton>
                    </template>
                    <!--序号-->
                    <template v-else-if="['number'].includes(item.type)">
                        <span class="textType"
                              @click="emitInit(item.emit,row, item)"
                              :class="classNameInit(item)">
                            {{$index+1}}
                        </span>
                    </template>
                    <!--tooltip-->
                    <template v-else-if="['tooltip'].includes(item.type)">
                        <el-tooltip class="item" effect="dark" placement="top">
                            <template #content>
                                {{textInit(row,item)}}
                            </template>
                            <span class="textType"
                                  @click="emitInit(item.emit,row, item)"
                                  :class="classNameInit(item)">
                                {{textInit(row,item)}}
                            </span>
                        </el-tooltip>
                    </template>
                    <!--默认-->
                    <template v-else>
                        <span class="textType"
                            @click="emitInit(item.emit,row, item)"
                            :class="classNameInit(item)">
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
    mounted() {
    },
    methods:{
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
            return this.$utils.lodash.get(row,item.prop);
        },
        classNameInit(it){
            return this.$utils.lodash.merge({
                "ellipsis-1":it.ellipsis1,
                "ellipsis-2":it.ellipsis2,
                "ellipsis-3":it.ellipsis3,
            },(it.className || "").split(" ").filter(e=>e).reduce((a,b)=>(a[b] = true) && a,{}));
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