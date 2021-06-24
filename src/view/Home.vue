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
            <el-tree ref="elTree" :data="leftNavCurrentMenus"
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
        <div class="viewportMain" :class="{off:leftNavMenus.length === 0}">
            <div class="el-breadcrumb-box el-breadcrumb-tabs">
                <div class="el-breadcrumb-box-content">
                    <el-tabs class="menus" :model-value="currentActiveMenusKey" type="card" :closable="activeMenus.length > 1"
                             @tab-click="activeMenusChange(activeMenus[$event.index])"
                             @tab-remove="activeMenusRemove"
                    >
                        <el-tab-pane
                            v-for="(item, index) in activeMenus"
                            :key="item.name"
                            :label="item.title"
                            :name="item.id"
                        >
                        </el-tab-pane>
                    </el-tabs>
                    <el-dropdown class="dropdown">
                        <span class="el-dropdown-link">
                            <i class="el-icon-menu"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.native="showRouterViewInit">刷新当前页面</el-dropdown-item>
                                <el-dropdown-item @click.native="closeOtherPage">关闭其他页面</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="el-breadcrumb-box el-breadcrumb-row">
                <div class="el-breadcrumb-box-content">
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="findPath">
                        <el-breadcrumb-item :to="{ path: item.path }" v-for="(item,key) in findPath" :key="key">{{ item.title }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div class="viewportMainContent">
                <div class="viewportMainContentRouterView" v-if="showRouterView">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {WindowCommonAxiosRequestConfig} from "../store/request/AxiosClassInterface";

export default {
    name: "Home",
    data(){
        return {
            activeNav:null,
            findPath:null,
            activeMenus:[],
            showRouterView:true,
        }
    },
    computed:{
        menus(){
            return (this.airforce.userInfo?.menus || []).filter(e=>e.is_child_page === 1);
        },
        leftNavMenus(){
            return (this.menus.find(e=>e.id === this.activeNav) || {}).children || []
        },
        leftNavCurrentMenus(){
            return this.leftNavCurrentMenusInit(JSON.parse(JSON.stringify(this.leftNavMenus)));
        },
        defaultExpandedKeys(){
            return (this.findPath || []).slice(1).map(e=>e.id)
        },
        currentNodeKey(){
            return (this.findPath || []).filter(e=>e.is_child_page === 1).map(e=>e.id).reverse()[0]
        },
        currentActiveMenus(){
            if(this.findPath && this.findPath.length > 0) {
                return  this.findPath[this.findPath.length - 1];
            }else {
                return null;
            }
        },
        currentActiveMenusKey(){
            return (this.currentActiveMenus || {}).id;
        }
    },
    watch:{
        currentNodeKey(){
            this.$nextTick(()=>{
                this.$refs.elTree.setCurrentKey(this.currentNodeKey);
                this.$nextTick(()=>{
                    if(this.findPath && this.findPath.length > 0){
                        // const currentNode = this.findPath[this.findPath.length - 1];
                        if(!this.activeMenus.map(e=>e.id).includes(this.currentActiveMenusKey)){
                            this.activeMenus.push(this.currentActiveMenus);
                        }
                    }

                })
            })
        },
        $route(){
            this.init(this.airforce?.userInfo?.menus);
        }
    },
    mounted() {
        this.axios(<WindowCommonAxiosRequestConfig>{
            url:"/User/Auth/getUserInfo",
            method:"get",
            ModuleName:"userInfo",
            ModuleFilter:(res: any)=> {
                this.activeMenus = [];
                this.init(res.data.menus);
                return Promise.resolve(res.data)
            },
            data:{
                is_child_page:true,
            }
        })
    },
    methods:{
        showRouterViewInit(){
            this.showRouterView = false;
            this.$nextTick(()=>{
                this.showRouterView = true;
            })
        },
        closeOtherPage(){
            this.activeMenus = this.activeMenus.filter(e=>e.id === this.currentActiveMenusKey)
        },
        activeMenusRemove(id){
            const index = this.activeMenus.findIndex(e=>e.id === id);
            this.activeMenus.splice(index,1);
            const next = this.activeMenus[index-1] || this.activeMenus[index];
            if(next){
                this.$router.push(next.path);
            }else {
                this.$router.push("/")
            }
        },
        activeMenusChange(e){
            if(e.path){
                this.$router.push(e.path);
            }
        },
        init(menus){
            this.$nextTick(()=>{
                this.findPath = this.$utils.findPath(menus,{path:this.$route.path},"children");
                if(this.findPath){
                    this.activeNav = this.findPath[0]?.id;
                }else {
                    this.activeNav = menus[0]?.id;
                }
            })
        },
        leftNavCurrentMenusInit(options){
            return options.filter(e=>{
                if(e.children){
                    e.children = this.leftNavCurrentMenusInit(e.children);
                }
                return e.is_child_page === 1
            });
        },
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
                    if(this.$route.path !== data.path){
                        this.$router.push(data.path)
                    }else {
                        this.showRouterViewInit();
                    }
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
        @hh: @h - 10px;
        position: fixed;
        z-index: 1;
        width: calc(100% - @leftNavWidth);
        height: calc(100% - @h);
        left: @leftNavWidth;
        top: @h;
        overflow: hidden;
        transition: @transition;
        &.off{
            left: 0;
            width: 100%;
        }
        .el-breadcrumb-box{
            height:@hh;
            width: 100%;
            border-bottom: 1px solid #d8d8d8;
            margin-bottom: @unit15;
            .el-breadcrumb-box-content{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: @hh;
                overflow: hidden;
                display: flex;
                align-items: center;
                z-index: 2;
                background-color: #ffffff;
                .el-breadcrumb{
                    margin-left: @unit15;
                    flex: 1;
                }
                .el-dropdown-link{
                    margin-right: @unit15;
                    margin-left: @unit15;
                }
            }
            &.el-breadcrumb-row{
                border-bottom: none;
                .el-breadcrumb-box-content{
                    top:@hh+1px;
                }
            }
            &.el-breadcrumb-tabs{
                :deep(.el-tabs){
                    flex: 1;
                    max-width: calc(100% - 50px);
                    &>.el-tabs__header{
                      margin: 0;
                    }
                    .el-tabs__content{
                        display: none;
                    }
                }
            }
        }
        .viewportMainContent{
            @top:@hh*2 + 1px + @unit15;
            position: absolute;
            left: 0;
            top: @top;
            width: 100%;
            height: calc(100% - @top);
            overflow-x: hidden;
            z-index: 1;
            transition: @transition;
            .viewportMainContentRouterView{
                padding: @unit15;
                padding-top: 0;
            }
        }
    }
}
</style>