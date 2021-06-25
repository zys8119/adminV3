<template>
    <div class="ApplicationTypeManagement">
        <filter-content v-model="params.search"></filter-content>
        <content-table :columns="columns"></content-table>
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
    methods:{
    }
}
</script>

<style scoped lang="less">
.ApplicationTypeManagement{
}
</style>