<template>
    <div class="Home">
        <div>全局样式测试</div>
        <div>

            <el-button @click="aa">打开弹框</el-button>
        </div>
        <div>
            <Upload>
                <el-button type="success">文件上传</el-button>
            </Upload>
        </div>
        <content-table
            @test="test"
            @dataChange="dataChange"
            :columns="columns"
            ref="table"
            :apiPath="api.test"
            @on-selection="selection"
            :config="{
                rowKey:'b',
            }"
        >
        </content-table>
    </div>
</template>

<script lang="ts">
import {columns} from "../ui/package/UiTypes/ContentTable";
import {h, shallowRef} from "vue"
export default {
    name: "Home",
    data(){
        return {
            columns:<Array<columns>>[
                {type:"selection"},
                {label:"数字", type:"number"},
                {label:"普通数据", prop:"name"},
                {label:"tooltip", prop:"b",ellipsis3:true, type:"tooltip"},
                {label:"样式过滤", prop:"c.b.a", emit:"test", className:"primary_link", classNameFilter(row: any, column: any): any {
                    return {
                        orange:row.name === "A"
                    }
                }},
                {
                    label:"操作",
                    type:"operate",
                    btns:[
                    {
                        name:"Asd",
                        type:"text",
                        className:"delete_link",
                        emit:'test'
                    },
                    {name:"Asd", type:"text", className:"primary", show:row=>row.c},
                ]},
                {
                    type:"edit",
                    label:"快捷编辑",
                    prop:"name",
                    applyValue:true,
                    emit:"test"
                },
                {
                    type:"edit",
                    label:"快捷编辑",
                    prop:"name",
                    emit:"test"
                },
                {
                    type:"popover",
                    label:"弹出框",
                    prop:"name",
                    emit:"test",
                    popover_placement:"left",
                    popoverComponent:shallowRef({
                        props:{
                          row:{}
                        },
                        render(){
                            return h("div",this.row.name)
                        },
                    })
                },
                {
                    type:"select",
                    label:"下拉选择",
                    prop:"name",
                    selectData:[
                        {
                            label:"asdad",
                            value:"A"
                        },
                        {
                            label:"asa",
                            value:"B"
                        }
                    ],
                    emit:"on-selection"
                },
                {
                    label:"开关",
                    prop:"name1",
                    type:"switch",
                    emit:"on-selection"
                },
                {
                    label:"合并表头",
                    align:"center",
                    columns:[
                        {
                            label:"合并表头子集",
                            prop:"name"
                        },
                        {
                            label:"合并表头子集",
                            prop:"name"
                        },
                        {
                            label:"合并表头子集",
                            prop:"name"
                        }
                    ]
                }
            ]
        }
    },
    mounted() {
        // this.$refs.table.ContentTableData = [
        //     {name:"asdada",b:"测试数据"},
        //     {name:"A",b:"测试数据",c:{b:{a:"阿萨大大"}}},
        //     {name:"asdada", b:"阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨",c:{b:{a:"阿萨大大"}}},
        // ];
        this.$refs.table.init();
    },
    methods:{
        selection(v,row,item){
            if(row){
                row[item.prop] = v;
            }
            console.log(v)
        },
        aa() {
            this.$ZAlert.show({
                title:"adsa",
                _components:()=>import("./Alert/Alert.vue"),
                _event:{
                    onSaveA:val=>{
                        console.log(val,2)
                    }
                },
                _props:{},
            })
        },
        dataChange(d){
            console.log(d)
            return true
        },
        test(e){
            console.log(e,11)
        }
    }
}
</script>

<style scoped lang="less">
.Home{
    div{
        color: @themeColor;
        //color: @success;
        font-size: @unit15;
    }
}
</style>