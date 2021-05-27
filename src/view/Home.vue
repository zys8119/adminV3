<template>
    <div class="Home">
        <div>全局样式测试</div>
        <el-button @click="aa">打开弹框</el-button>
        <content-table
            @test="test"
            @dataChange="dataChange"
            :columns="columns"
            ref="table"
            @on-selection="selection"
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
                {label:"45", type:"selection"},
                {label:"45", type:"number"},
                {label:"45", prop:"name"},
                {label:"a54sd", prop:"b",ellipsis3:true, type:"tooltip"},
                {label:"c", prop:"c.b.a", emit:"test", className:"primary_link", classNameFilter(row: any, column: any): any {
                    return {
                        orange:row.name === "A"
                    }
                }},
                {
                    label:"45",
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
                }
            ]
        }
    },
    mounted() {
        this.$refs.table.ContentTableData = [
            {name:"asdada",b:"测试数据"},
            {name:"A",b:"测试数据",c:{b:{a:"阿萨大大"}}},
            {name:"asdada", b:"阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨",c:{b:{a:"阿萨大大"}}},
        ];
    },
    methods:{
        selection(v){
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