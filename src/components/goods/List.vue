<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--卡片视图区域-->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddPage">添加商品</el-button>
                </el-col>
            </el-row>

            <!--表格区域-->
            <el-table :data="goodslist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
                <el-table-column label="创建时间" prop="add_time" width="140px">
                    <template slot-scope="scope">
                        {{scope.row.add_time | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="removeById(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total" background>
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                //查询参数对象
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 10
                },
                //商品列表
                goodslist: [],
                //总数据条数
                total: 0
            }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            // async getGoodsList() {
            getGoodsList() {
                // const {data: res} = await this.$http.get('goods', {params: this.queryInfo});
                const {data: res} = {
                    data: {
                        data:
                            {
                                goods: [
                                    {
                                        goods_id: 962,
                                        cat_id: null,
                                        goods_name: "name1",
                                        goods_price: 99,
                                        goods_weight: 10,
                                        add_time: 1512954923
                                    },
                                    {
                                        goods_id: 961,
                                        cat_id: null,
                                        goods_name: "name2",
                                        goods_price: 98,
                                        goods_weight: 11,
                                        add_time: 1512954923
                                    },
                                    {
                                        goods_id: 960,
                                        cat_id: null,
                                        goods_name: "name3",
                                        goods_price: 9,
                                        goods_weight: 20,
                                        add_time: 1512954923
                                    },
                                    {
                                        goods_id: 959,
                                        cat_id: null,
                                        goods_name: "name4",
                                        goods_price: 99,
                                        goods_weight: 22,
                                        add_time: 1512954923
                                    },
                                    {
                                        goods_id: 958,
                                        cat_id: null,
                                        goods_name: "name5",
                                        goods_price: 9.9,
                                        goods_weight: 10,
                                        add_time: 1512954923
                                    }
                                ],
                                pagenum: "1",
                                total: 926
                            },
                        meta: {status: 200}
                    }
                };
                if (res.meta.status !== 200) {
                    this.$message.error('获取商品列表失败');
                }
                this.$message.success('获取商品列表成功');
                console.log(res.data);
                this.goodslist = res.data.goods;
                this.total = res.data.total;
            },
            //
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize;
                this.getGoodsList();
            },
            //
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                this.getGoodsList();
            },
            //根据id删除
            async removeById(row) {
                const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err);
                if(confirmResult !== 'confirm') {
                    return this.$message.info('已经取消删除');
                }
                // const {data: res} = await this.$http.delete(`goods/${id}`);
                const {data: res} = {data: {meta: {status: 200}}};
                if(res.meta.status !== 200) {
                    return this.$message.error('删除失败');
                }
                this.$message.success('删除成功');
                this.getGoodsList();
            },
            //
            goAddPage() {
                this.$router.push('/goods/add');
            }
        }
    }
</script>

<style lang="less" scoped>

</style>