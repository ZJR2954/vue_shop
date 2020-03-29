<template>
    <el-container class="home-container">
        <!--头部区域-->
        <el-header>
            <div>
                <img src="../assets/logo.png"/>
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!--页面主体区-->
        <el-container>
            <!--侧边栏-->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu background-color="#333744"
                         text-color="#fff"
                         active-text-color="#409efe"
                         :unique-opened="true"
                         :collapse="isCollapse"
                         :collapse-transition="false"
                         :router="true"
                         :default-active="activePath">
                    <!--一级菜单-->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <!--一级菜单模板区-->
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                                      @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--右侧内容主体-->
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "home",
        created() {
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem('activePath');
        },
        data() {
            return {
                menulist: [],
                isCollapse: false,
                activePath: ''
            }
        },
        methods: {
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            //获取所有的菜单
            // async getMenuList() {
            getMenuList() {
                // const{data: res} = await this.$http.get('menus');
                const {data: res} = {
                    data: {
                        data: [
                            {
                                id: 101,
                                authName: "用户管理",
                                path: "users",
                                children: [
                                    {
                                        id: 1,
                                        authName: "用户列表",
                                        path: "users",
                                    }
                                ]
                            },
                            {
                                id: 102,
                                authName: "权限管理",
                                path: "rights",
                                children: [
                                    {
                                        id: 2,
                                        authName: "权限列表",
                                        path: "rights",
                                    },
                                    {
                                        id: 3,
                                        authName: "角色列表",
                                        path: "roles",
                                    }
                                ]
                            },
                            {
                                id: 103,
                                authName: "商品管理",
                                path: "",
                                children: [
                                    {
                                        id: 4,
                                        authName: "商品列表",
                                        path: "4",
                                    },
                                    {
                                        id: 5,
                                        authName: "分类参数",
                                        path: "5",
                                    },
                                    {
                                        id: 6,
                                        authName: "商品分类",
                                        path: "categories",
                                    }
                                ]
                            },
                            {
                                id: 104,
                                authName: "订单管理",
                                path: "orders",
                                children: []
                            },
                            {
                                id: 105,
                                authName: "统计数据",
                                path: "reports",
                                children: []
                            }
                        ], meta: {msg: "获取菜单列表成功", status: 200}
                    }
                };
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
                this.menulist = res.data;
            },
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            //保存激活链接的激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath);
                this.activePath = activePath;
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between; //左右贴边对齐
        padding-left: 0;
        align-items: center; //按钮垂直居中
        color: #ffffff;
        font-size: 20px;
        > div {
            display: flex;
            align-items: center;
            span {

            }
        }
    }

    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #eaedf1;
    }

    .icon-font {
        padding: 10px;
    }

    .toggle-button {
        background-color: #4a5064;
        size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>