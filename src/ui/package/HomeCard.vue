<template>
    <div class="HomeCard content">
        <div class="content-title">
            <div class="left">
                {{title}}
            </div>
            <div class="right">
                <slot name="header-right"></slot>
                <el-tooltip v-if="tooltip && icon" effect="dark" :content="tooltip" placement="bottom">
                    <span class="iconfont" @click="$emit('export')" v-html="icon"></span>
                </el-tooltip>
                <span v-if="!tooltip && icon" class="iconfont" @click="$emit('export')"  v-html="icon"></span>
            </div>
        </div>
        <div class="HomeCardContent" :style="{height:height}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeCard",
    props:{
        // 卡片标题
        title:{
            type:String,
            default:null
        },
        // 提示文字
        tooltip:{
            type:[String,Boolean],
            default:"导出数据"
        },
        // 图标
        icon:{
            type:[String,Boolean],
            default:"&#xe60d;"
        },
        // 高度
        height:{
            type:[String,Boolean],
            default:false
        },
    }
}
</script>

<style scoped lang="less">
@import "../../src/assets/style/less/constant";
.HomeCard{
    &.content {
        padding: 10px;
        background: #ffffff;
        .content-title {
            display: flex;
            justify-content: space-between;
            padding: 0 10px 10px;
            align-items: center;
            border-bottom: 1px solid @border-color;
            .left {
                position: relative;
                color: @main-color;
                font-size: @title-font-size;
                padding-left: 15px;
            }
            .left:before {
                content: '';
                width: 5px;
                height: 20px;
                background: @main-color;
                position: absolute;
                display: inline-block;
                left: 0;
                top: 0;
            }
            .right {
                font-weight: bold;
                font-size: 20px;
                cursor: pointer;
            }
        }
        .HomeCardContent{
            overflow-x: hidden;
        }
    }
}
</style>
