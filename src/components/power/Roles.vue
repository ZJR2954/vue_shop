<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图-->
        <el-card>
            <!--添加角色按钮区域-->
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <!--角色列表区域-->
            <el-table :data="rolelist" border stripe>
                <!--展开列-->
                <el-table-column type="expand">
                    <template v-slot="scope">
                        <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '']" v-for="(item1, i1) in scope.row.children"
                                :key="item1.id" class="vcenter">
                            <!--渲染一级权限-->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!--渲染二级和三级权限-->
                            <el-col :span="19">
                                <el-row :class="[i2 === 0 ? '' : 'bdtop']" v-for="(item2, i2) in item1.children"
                                        :key="item2.id" class="vcenter">
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">
                                            {{item2.authName}}
                                        </el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag v-for="(item3, i3) in item2.children" :key="item3.id" type="warning"
                                                closable @close="removeRightById(scope.row, item3.id)">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template v-slot="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini"
                                   @click="showSetRightDialog(scope.row)">分配权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--分配权限的对话框-->
        <el-dialog
                title="分配权限"
                :visible.sync="setRightDialogVisible"
                width="50%" @close="setRightDialogClosed">
            <!--树形控件-->
            <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" :default-expand-all="true"
                     :default-checked-keys="defKeys" ref="treeRef"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        components: {ElRow},
        name: "roles",
        data() {
            return {
                //所有角色列表数据
                rolelist: [],
                //控制分配权限对话框的显示与隐藏
                setRightDialogVisible: false,
                //所有权限的数据
                rightsList: [],
                //树形控件的属性绑定对象
                treeProps: {
                    label: 'authName',
                    children: 'children'
                },
                //默认选中的节点Id值数组
                defKeys: [],
                //当前即将分配权限的角色Id
                roleId: ''
            }
        },
        created() {
            this.getRolesList();
        },
        methods: {
            // async getRolesList() {
            getRolesList() {
                // const {data: res} = await this.$http.get('roles');
                const {data: res} = {
                    data: {
                        data: [
                            {
                                id: 1,
                                roleDesc: "技术负责人",
                                roleName: "主管",
                                children: [
                                    {
                                        id: 101,
                                        authName: "商品管理",
                                        path: null,
                                        children: [
                                            {
                                                id: 102,
                                                authName: "商品列表",
                                                path: null,
                                                children: [
                                                    {
                                                        id: 103,
                                                        authName: "添加商品",
                                                        path: null
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 2,
                                roleDesc: "测试角色描述",
                                roleName: "测试角色",
                                children: [
                                    {
                                        id: 101,
                                        authName: "商品管理",
                                        path: null,
                                        children: [
                                            {
                                                id: 102,
                                                authName: "商品列表",
                                                path: null,
                                                children: [
                                                    {
                                                        id: 103,
                                                        authName: "添加商品",
                                                        path: null
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        meta: {status: 200}
                    }
                };
                if (res.meta.status !== 200) {
                    return this.$message.error('获取角色列表失败');
                }
                this.rolelist = res.data;
            },
            async removeRightById(role, rightId) {
                //弹框提示用户是否要删除
                const confirmResult = await this.$confirm('此操作将永久删除，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err);
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消了删除');
                }
                // const {data: res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
                const {data: res} = {data: {meta: {status: 200}}};
                if (res.meta.status !== 200) {
                    return this.$message.error('删除权限失败');
                }
                role.children = res.data;
            },
            //展示分配权限的对话框
            // async showSetRightDialog() {
            showSetRightDialog(role) {
                //获取所有权限的数据
                // const {data: res} = await this.$http.get('rights/tree');
                this.roleId = role.id;
                const {data: res} = {
                    data: {
                        data: [
                            {
                                id: 101,
                                authName: "商品管理",
                                path: null,
                                children: [
                                    {
                                        id: 102,
                                        authName: "商品列表",
                                        path: null,
                                        children: [
                                            {
                                                id: 103,
                                                authName: "添加商品",
                                                path: null
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        meta: {status: 200}
                    }
                };
                if (res.meta.status !== 200) {
                    return this.$message.error('获取权限数据失败');
                }
                //把获取到的权限数据保存到data中
                this.rightsList = res.data;

                //递归获取三级节点的id
                this.getLeafKeys(role, this.defKeys);

                this.setRightDialogVisible = true;
            },
            //通过递归的形式获取角色下所有三级权限的id，并保存到kefKeys
            getLeafKeys(node, arr) {
                if (!node.children) {
                    return arr.push(node.id);
                }
                node.children.forEach(item => {
                    this.getLeafKeys(item, arr);
                })
            },
            //监听分配权限对话框的关闭事件
            setRightDialogClosed() {
                this.defKeys = [];
            },
            //点击为角色分配权限
            // async allotRights() {
            allotRights() {
                const keys = [
                    ...this.$refs.treeRef.getCheckedKeys(),
                    ...this.$refs.treeRef.getHalfCheckedKeys()
                ];
                console.log(keys);
                const idStr = keys.join(',');
                // const {data: res} = await this.$http.post(`roles/${this.roleId}/rights`, {rids: idStr});
                const {data: res} = {data: {data: {}, meta: {status: 200}}};
                if (res.meta.status !== 200) {
                    this.$message.error('分配权限失败');
                }
                this.$message.success('分配权限成功');
                this.getRolesList();
                this.setRightDialogVisible = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-tag {
        margin: 7px;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>