import {mock, Random} from "mockjs"
import {v4 as uuid} from "uuid"
class mockData {
    userId = uuid();
    constructor(){

    };
    success(data){
        return {
            code:200,
            data
        }
    }

    getUserInfo(){
        return this.success({
            name:"管理员",
            id:this.userId,
            ...JSON.parse(localStorage.getItem("userInfo")),
            // token:this.userId,
            menus:[
                {
                    path:"/home",
                    title:"首页",
                    name:uuid(),
                    id:uuid(),
                    is_child_page:1,
                },
                {
                    path:null,
                    title:"个人中心",
                    name:uuid(),
                    id:uuid(),
                    is_child_page:1,
                    children:[
                        {
                            path:"/user/my-message",
                            title:"我的消息",
                            name:uuid(),
                            id:uuid(),
                            is_child_page:1,
                        },
                    ]
                },
                {
                    path:null,
                    title:"系统管理",
                    name:uuid(),
                    id:uuid(),
                    is_child_page:1,
                    children:[
                        {
                            path:null,
                            title:"授权管理",
                            name:uuid(),
                            id:uuid(),
                            is_child_page:1,
                            children:[
                                {
                                    path:"/system-management/authorization-management/menu-management",
                                    title:"菜单管理",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/authorization-management/user-management",
                                    title:"用户管理",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/authorization-management/user-authorization",
                                    title:"用户授权",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/authorization-management/role-permissions",
                                    title:"角色权限",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/authorization-management/log-management",
                                    title:"日志管理",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                            ]
                        },
                        {
                            path:null,
                            title:"业务配置",
                            name:uuid(),
                            id:uuid(),
                            is_child_page:1,
                            children: [
                                {
                                    path:"/system-management/business-configuration/unit-information",
                                    title:"单位信息",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/business-configuration/whole-clan-management",
                                    title:"全宗管理",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/business-configuration/institutional-setting",
                                    title:"机构设置",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/business-configuration/file-type",
                                    title:"文件类型",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/business-configuration/archives-category",
                                    title:"档案门类",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                                {
                                    path:"/system-management/business-configuration/mechanism-icon-management",
                                    title:"机构图标管理",
                                    name:uuid(),
                                    id:uuid(),
                                    is_child_page:1,
                                },
                            ]
                        },
                    ]
                },
                {
                    path:"/test",
                    title:"测试",
                    name:uuid(),
                    id:uuid(),
                    is_child_page:1,
                }
            ]
        })
    }

    getUserTestData(o){
        let no_page: boolean;
        let body:any = {};
        try {
            body = JSON.parse(o.body)
            no_page = body.no_page;
        }catch (e) {
            no_page = false;
        }
        const data = new Array(10).fill(0).map(()=>({
            "name": "测试内容"+parseInt((Math.random()*1000).toString()),
            "content|1-100": "大量测试内容"+parseInt((Math.random()*1000).toString()),
            time:Random.date('yyyy-MM-dd HH:mm:ss')
        }))
        return {
            code:0,
            data:no_page ? data : {
                body,
                list:data,
                total:100,
            }
        }
    }
}
const md = new mockData();
mock(/\/User\/Auth\/login/,md.getUserInfo())

mock(/\/User\/Auth\/getUserInfo/,md.getUserInfo())

mock(/\/User\/Auth\/test/,o=>md.getUserTestData(o))