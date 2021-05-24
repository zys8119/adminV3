<template>
    <div class="Home">
        <div>全局样式测试</div>
        <el-button @click="aa">打开弹框</el-button>
        <content-table @dataChange="dataChange" :columns="columns" ref="table"></content-table>
    </div>
</template>

<script lang="ts">
import ContentTable from "../ui/package/ContentTable.vue";
export default {
    name: "Home",
    components: {ContentTable},
    data(){
        return {
            columns:[
                {label:"asd", prop:"name"},
                {label:"asd", prop:"b"},
                {label:"asd", type:"operate", btns:[
                    {name:"Asd", type:"text"}
                ]},
            ]
        }
    },
    mounted() {
        this.$refs.table.ContentTableData = [
            {name:"asdada",b:"测试数据"},
        ]
    },
    methods:{
        aa() {
            this.$ZAlert.show({
                title:"adsa",
                components:()=>import("./Alert/Alert.vue"),
                _event:{
                    onSaveA:val=>{
                        console.log(val,2)
                    }
                }
            })
        },
        dataChange(d){
            console.log(d)
            return true
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