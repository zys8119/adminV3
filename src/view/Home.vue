<template>
    <div class="Home">
        <div class="topNav">
            <div class="topNavHeader">日志监控中台</div>
            <el-tabs class="menus" v-model="activeNav" type="card">
                <el-tab-pane
                    v-for="(item, index) in menus"
                    :key="item.name"
                    :label="item.title"
                    :name="item.id"
                >
                </el-tab-pane>
            </el-tabs>
            <el-dropdown class="dropdown">
                <span class="el-dropdown-link">
                  {{ airforce.userInfo?.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item divided>用户中心</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="leftNav" :class="{off:leftNavMenus.length === 0}">
            <el-tree :data="leftNavMenus">
                <template #default="{data}">{{data.title}}</template>
            </el-tree>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Home",
    data(){
        return {
            activeNav:"160576915126284",
        }
    },
    computed:{
        menus(){
            return this.airforce.userInfo?.menus || [];
        },
        leftNavMenus(){
            return (this.menus.find(e=>e.id === this.activeNav) || {}).children || []
        }
    },
    mounted() {
        this.axios({
            url:"/User/Auth/getUserInfo",
            method:"get",
            ModuleName:"userInfo",
            ModuleFilter(res: any) {
                return Promise.resolve(res.data)
            }
        })
    },
    methods:{
        logout(){
            localStorage.clear();
            this.airforce.input("userInfo", null,{},true);
            setTimeout(()=>{
                this.$router.push("/login")
            })
        }
    }
}
</script>

<style scoped lang="less">
.Home{
    @h:50px;
    @leftNavWidth:160px;
    @transition:all ease-in 300ms;
    .topNav{
        display: flex;
        align-items: center;
        background-color: @themeColor;
        height: @h;
        overflow: hidden;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1;
        .topNavHeader{
            width: @leftNavWidth;
            text-align: center;
            background-color: @themeColor;
            line-height: @h;
            color: #ffffff;
        }
        :deep(.menus){
            flex: 1;
            height: @h;
            overflow: hidden;
            .el-tabs__header{
                border: none;
                margin: 0;
                .el-tabs__nav{
                    border:none;
                }
            }
            .el-tabs__content{
                display: none;
            }
            .el-tabs__item{
                height: @h;
                border: none;
                line-height: @h;
                color: #606266;
                &.is-active{
                    background-color: #ffffff;
                    border-bottom: 1px solid @themeColor;
                }
            }
        }
        .dropdown{
            .el-dropdown-link{
                padding: 0 @unit15;
            }
        }
    }
    .leftNav{
        width: @leftNavWidth;
        position: fixed;
        left: 0;
        top: @h;
        height: calc(100% - @h);
        border-right: 1px solid #d8d8d8;
        transition: @transition;
        overflow: hidden;
        user-select: none;
        &.off{
            width: 0;
            border-right: transparent;
        }
        :deep(.el-tree__empty-text){
            display: none;
        }
    }
}
</style>