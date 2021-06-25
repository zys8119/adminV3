<template>
    <div class="ApplicationTypeManagement">
        <filter-content v-model="params.search" :btns="[
            {name:'新增应用类型', emit:'add'}
        ]" @add="add"></filter-content>
        <content-table
            ref="table"
            :apiPath="api.LogNakadai.ApplicationType.list"
            :columns="columns"
        ></content-table>
    </div>
</template>

<script lang="ts">
import {columns} from "../../ui/package/UiTypes/ContentTable";

export default {
    name: "ApplicationTypeManagement",
    data(){
        return {
            params:{},
            columns:<Array<columns>>[
                {label:"应用名称", prop:"name"},
                {label:"应用id", prop:"name"},
                {label:"操作", type:"operate", btns:[
                    {name:"编辑", type:"text", className:"primary"},
                    {name:"删除", type:"text", className:"default"},
                ]},
            ]
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            this.reset()
        },
        reset(){
            this.params = {};
            this.search();
        },
        search(){
            this.$refs.table.init();
        },
        add(){
            this.$ZAlert.show({
                title:"新增应用类型",
                width:"500px",
                _components:()=>import("./Alert/AddType.vue"),
                _event:{
                    onSave:this.reset
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.ApplicationTypeManagement{
}
</style>