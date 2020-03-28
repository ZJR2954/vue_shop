<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图-->
        <el-card>
            <el-table :data="rightsList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template v-slot="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
                        <el-tag v-else-if="scope.row.level === '2'" type="warning">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "rights",
        data() {
            return {
                //权限列表
                rightsList: []
            }
        },
        created() {
            //获取所有权限
            this.getRightsList();
        },
        methods: {
            //获取权限列表
            // async getRightsList() {
            getRightsList() {
                // const {data: res} = await this.$http.get('rights/list');
                const {data: res} = {
                    data: {
                        data:
                            [
                                {authName: "商品管理", id: 1, level: '0', path: 'goods', pid: ''},
                                {authName: "订单管理", id: 2, level: '0', path: 'orders', pid: ''},
                                {authName: "权限管理", id: 3, level: '0', path: 'rights', pid: ''},
                                {authName: "商品列表", id: 4, level: '1', path: 'goods', pid: ''},
                                {authName: "添加商品", id: 5, level: '2', path: 'goods', pid: ''},
                                {authName: "订单列表", id: 6, level: '1', path: 'orders', pid: ''},
                                {authName: "添加订单", id: 7, level: '2', path: 'orders', pid: ''}
                            ]
                        , meta: {status: 200}
                    }
                }
                if (res.meta.status !== 200) {
                    return this.$message.error('获取权限列表失败');
                }

                this.rightsList = res.data;
            }
        }
    }
</script>

<style lang="less" scoped>

</style>