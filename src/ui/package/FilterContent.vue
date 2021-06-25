<template>
    <div class="FilterContent">
        <div class="FilterContentBox">
            <div class="FilterContentLeft">
                <el-input placeholder="请输入关键字" v-model="modelValue" @update:modelValue="$emit('update:modelValue',$event)"></el-input>
                <el-button type="primary" @click="$emit('search', modelValue)">搜索</el-button>
                <el-button @click="$emit('reset')">重置</el-button>
            </div>
            <div class="FilterContentRight">
                <ZButton type="primary" v-for="(item,key) in rightBtns" :key="key" :config="item" @click="item.emit ? $emit(item.emit,item) : ()=>{}"></ZButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "FilterContent",
    props:{
        rightBtns:{type:Array, default:()=>[]},
        modelValue:{type:String,default:null}
    }
}
</script>

<style scoped lang="less">
.FilterContent{
    margin-bottom: @unit15;
    width: 100%;
    .FilterContentBox{
        display: flex;
        .FilterContentLeft{
            flex: 1;
            .el-input{
                width: 200px;
            }
            .el-button{
                margin-left: 0;
            }
            &>*{
                margin-right: @unit10;
                margin-bottom: @unit15;
            }
        }
        .FilterContentRight{
            margin-left: @unit15;
            &>*{
                margin-left: @unit10;
                margin-bottom: @unit15;
            }
        }
    }
}
</style>