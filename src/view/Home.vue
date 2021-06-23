<template>
    <div class="Home">
        <div class="topNav">
            <div class="topNavHeader">日志监控中台</div>
            <el-tabs class="menus" v-model="editableTabsValue" type="card">
                <el-tab-pane
                    v-for="(item, index) in menus"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
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
                        <el-dropdown-item divided @click.native="logout">推出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>

<script lang="ts">
export default {
    name: "Home",
    data(){
        return {
            editableTabsValue:null,
        }
    },
    computed:{
        menus(){
            return this.airforce.userInfo?.menus || [];
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
            this.airforce.input("userInfo",null);
            setTimeout(()=>{
                this.$router.push("/login")
            })
        }
    }
}
</script>

<style scoped lang="less">
.Home{
    .topNav{
        display: flex;
        align-items: center;
        background-color: @themeColor;
        @h:50px;
        .topNavHeader{
            width: 160px;
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
}
</style>