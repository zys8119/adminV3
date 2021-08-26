<template>
    <div class="ApplicationTypeManagement">
        <filter-content v-model="params.search" :btns="[
            {name:'新增应用类型', emit:'add'}
        ]" @add="add()" @search="search" @reset="reset"></filter-content>
        <content-table
            ref="table"
            :apiPath="api.LogNakadai.ApplicationType.list"
            :columns="columns"
            :params="params"
            @editRow="add"
            @deleteRow="deleteRow"
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
                {label:"应用id", prop:"id"},
                {label:"操作", type:"operate", btns:[
                    {name:"编辑", type:"text", className:"primary", emit:'editRow'},
                    {name:"删除", type:"text", className:"default", emit:'deleteRow'},
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
            this.params = {
                search:null
            };
            this.search();
        },
        search(){
            this.$refs.table.init();
        },
        add(row){
            this.$ZAlert.show({
                title:row ? "编辑" :"新增应用类型",
                width:"500px",
                _components:()=>import("./Alert/AddType.vue"),
                props:{
                    row:row,
                },
                _event:{
                    onSave:this.reset
                }
            })
        },
        deleteRow(row){
            this.$confirm('是否删除该类型吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.api.LogNakadai.ApplicationType.delete({id:row.id}).then(()=>{
                    this.$message({type:"success",message:"删除成功"})
                    this.search();
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.ApplicationTypeManagement{
}
</style>