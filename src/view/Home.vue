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
            <el-tree ref="elTree" :data="leftNavMenus"
                     @node-click="nodeClick"
                     node-key="id"
                     :default-expanded-keys="defaultExpandedKeys"
                     :current-node-key="currentNodeKey"
            >
                <template #default="{data}">
                    <div class="leftNavItem">{{data.title}}</div>
                </template>
            </el-tree>
        </div>
        <div class="viewportMain">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Home",
    data(){
        return {
            activeNav:null,
            findPath:null
        }
    },
    computed:{
        menus(){
            return this.airforce.userInfo?.menus || [];
        },
        leftNavMenus(){
            return (this.menus.find(e=>e.id === this.activeNav) || {}).children || []
        },
        defaultExpandedKeys(){
            return (this.findPath || []).slice(1).map(e=>e.id)
        },
        currentNodeKey(){
            return this.defaultExpandedKeys.reverse()[0]
        }
    },
    watch:{
        currentNodeKey(){
            this.$refs.elTree?.setCurrentKey(this.currentNodeKey)
        }
    },
    mounted() {
        this.axios({
            url:"/User/Auth/getUserInfo",
            method:"get",
            ModuleName:"userInfo",
            ModuleFilter:(res: any)=> {
                this.$nextTick(()=>{
                    this.findPath = this.$utils.findPath(res.data.menus,{path:this.$route.path},"children");
                    if(this.findPath){
                        this.activeNav = this.findPath[0]?.id;
                    }else {
                        this.activeNav = res.data.menus[0]?.id;
                    }
                })
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
        },
        nodeClick(data){
            if(!data.children){
                if(data.path){
                    this.$router.push(data.path)
                }
            }
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
        @color:#0f9960;
        width: @leftNavWidth;
        position: fixed;
        left: 0;
        top: @h;
        height: calc(100% - @h);
        border-right: 1px solid #d8d8d8;
        transition: @transition;
        overflow: hidden;
        user-select: none;
        background-color: @color;
        z-index: 1;
        &.off{
            width: 0;
            border-right: transparent;
        }
        :deep(.el-tree){
            background-color: transparent;
            .el-tree__empty-text{
                display: none;
            }
            .el-tree-node__content{
                height: 40px;
                .leftNavItem{
                    color: #ffffff;
                }
                &:hover{
                    background-color:tint( @color, 50%);
                }
            }
            .el-tree-node{
                &:focus{
                    .el-tree-node__content{
                        background-color:transparent;
                    }
                }
                &.is-current{
                    &>.el-tree-node__content{
                        background-color:tint( @color, 50%);
                    }
                }
            }

        }

    }
    .viewportMain{
        position: fixed;
        z-index: 1;
        width: calc(100% - @leftNavWidth);
        height: calc(100% - @h);
        left: @leftNavWidth;
        top: @h;
        overflow-x: hidden;
    }
}
</style>