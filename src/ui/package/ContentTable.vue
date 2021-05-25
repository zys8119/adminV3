<template>
    <div class="ContentTable">
        <el-table
            :data="ContentTableData"
        >
            <el-table-column
                v-for="(item,key) in columns" :key="key"
                :label="item.label"
                :prop="item.prop"
            >
                <template #default="{row}">
                    <!--操作-->
                    <template v-if="['operate'].includes(item.type)">
                        <ZButton v-if="item.btns" v-for="(it,k) in item.btns" :config="it"></ZButton>
                    </template>
                    <template v-else>
                        {{$utils.lodash.get(row,item.prop)}}
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
    }
}
</script>

<style scoped lang="less">
.ContentTable{
}
</style>