<template>
    <div class="Home">
        <div>全局样式测试</div>
        <el-button @click="aa">打开弹框</el-button>
        <content-table @dataChange="dataChange"  :columns="columns" ref="table"></content-table>
    </div>
</template>

<script lang="ts">
export default {
    name: "Home",
    data(){
        return {
            columns:[
                {label:"45", prop:"name"},
                {label:"a54sd", prop:"b"},
                {label:"c", prop:"c.b.a"},
                {label:"45", type:"operate", btns:[
                    {name:"Asd", type:"text"}
                ]},
            ]
        }
    },
    mounted() {
        this.$refs.table.ContentTableData = [
            {name:"asdada",b:"测试数据"},
            {name:"asdada",b:"测试数据",c:{b:{a:"阿萨大大"}}},
        ];
    },
    methods:{
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