<template>
    <div class="ApplicationTypeManagement">
        <filter-content v-model="params.search" @AAA="aa" :rightBtns="[
            {name:'asdasd',emit:'AAA'}
        ]"></filter-content>
        {{params.search}}
        <content-table :columns="columns"></content-table>
        <div v-for="i in 100">{{i}}</div>
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

            ]
        }
    },
    methods:{
        aa(it){
            console.log(it)
        }
    }
}
</script>

<style scoped lang="less">
.ApplicationTypeManagement{
}
</style>