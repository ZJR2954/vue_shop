<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图区域-->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
                </el-col>
            </el-row>

            <!--表格-->
            <tree-table :data="catList" :columns="columns" :selection-type="false" :expand-type="false"
                        :show-index="true" index-text="#" border :show-row-hover="false" class="treeTable">
                <!--是否有效-->
                <template slot="isok" slot-scope="scope">
                    <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>
                    <i class="el-icon-edit" v-else style="color: lightgreen;"></i>
                </template>
                <!--排序-->
                <template slot="order" slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                    <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                    <el-tag type="warning" size="mini" v-else-if="scope.row.cat_level === 2">三级</el-tag>
                </template>
                <!--操作-->
                <template slot="opt" slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </tree-table>
            <!--分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[3, 5, 10, 15]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
        <!--添加分类的对话框-->
        <el-dialog
                title="添加分类"
                :visible.sync="addcatDialogVisible"
                width="50%"
                @close="addCateDialogClosed">
            <!--添加分类的表单-->
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类：">
                    <el-cascader
                            v-model="selectedKeys"
                            :options="parentCateList"
                            :props="cascaderProps"
                            @change="parentCateChange"
                            clearable
                            change-on-select>
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addcatDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "cat",
        data() {
            return {
                //商品分类的数据列表，默认为空
                catList: [],
                //查询条件
                queryInfo: {type: 3, pagenum: 1, pagesize: 5},
                //总数据条数
                total: 0,
                //为table指定列的定义
                columns: [
                    {
                        label: '分类名称',
                        prop: 'cat_name'
                    },
                    {
                        label: '是否有效',
                        type: 'template',
                        //表示当前这一列使用模板名称
                        template: 'isok'
                    },
                    {
                        label: '排序',
                        type: 'template',
                        //表示当前这一列使用模板名称
                        template: 'order'
                    },
                    {
                        label: '操作',
                        type: 'template',
                        //表示当前这一列使用模板名称
                        template: 'opt'
                    }
                ],
                //控制添加分类对话框的显示与隐藏
                addcatDialogVisible: false,
                //添加分类的表单数据对象
                addCateForm: {
                    //分类名
                    cat_name: '',
                    //父级分类的id
                    cat_pid: 0,
                    //分类的等级，默认是一级分类
                    cat_level: 0
                },
                //添加分类表单的验证规则对象
                addCateFormRules: {
                    cat_name: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ]
                },
                //父级分类的列表
                parentCateList: [],
                cascaderProps: {
                    expandTrigger: 'hover',
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                },
                //选中的父级分类的id数组
                selectedKeys: []
            }
        },
        created() {
            this.getCateList();
        },
        methods: {
            //获取商品分类数据
            // async getCateList() {
            getCateList() {
                // const {data: res} = await this.$http.get('catgories', {params: this.queryInfo});
                const {data: res} = {
                    data: {
                        data:
                            {
                                pagenum: 0,
                                pagesize: 5,
                                result: [
                                    {
                                        cat_id: 1,
                                        cat_name: "大家电",
                                        cat_pid: 0,
                                        cat_level: 0,
                                        cat_deleted: false,
                                        children: [
                                            {
                                                cat_id: 2,
                                                cat_name: "电视",
                                                cat_pid: 1,
                                                cat_level: 1,
                                                cat_deleted: false,
                                                children: [
                                                    {
                                                        cat_id: 3,
                                                        cat_name: "曲面电视",
                                                        cat_pid: 2,
                                                        cat_level: 2,
                                                        cat_deleted: false
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                total: 30
                            },
                        meta: {status: 200}
                    }
                };
                if (res.meta.status !== 200) {
                    return this.$message.error('获取商品分类失败');
                }
                this.catList = res.data.result;
                this.total = res.data.total;
                console.log(this.catList);
            },
            //监听pagesize改变
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize;
                this.getCateList();
            },
            //监听pagenum改变
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                this.getCateList();
            },
            //点击按钮，显示添加分类的对顾客
            showAddCateDialog() {
                //先获取父级分类的数据列表
                this.getParentCateList();
                this.addcatDialogVisible = true;
            },
            //获取父级分类的数据
            // async getParentcatList() {
            getParentCateList() {
                // const {data: res} = await this.$http.get('catgories', {params: {type: 2}});
                const {data: res} = {
                    data: {
                        data: [
                            {
                                cat_id: 1,
                                cat_name: "家电",
                                cat_pid: 0,
                                cat_level: 0,
                                cat_deleted: false,
                                children: [
                                    {
                                        cat_id: 3,
                                        cat_name: "电视",
                                        cat_pid: 1,
                                        cat_level: 1,
                                        cat_deleted: false
                                    }
                                ]
                            },
                            {
                                cat_id: 2,
                                cat_name: "服装",
                                cat_pid: 0,
                                cat_level: 0,
                                cat_deleted: false,
                                children: [
                                    {
                                        cat_id: 4,
                                        cat_name: "上衣",
                                        cat_pid: 2,
                                        cat_level: 1,
                                        cat_deleted: false
                                    }
                                ]
                            }
                        ], meta: {status: 200}
                    }
                };
                if (res.meta.status !== 200) {
                    return this.$message.error('获取父级分类数据失败');
                }
                this.parentCateList = res.data;
            },
            //选择项发生变化出发这个函数
            parentCateChange() {
                console.log(this.selectedKeys);
                if (this.selectedKeys.length > 0) {
                    this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1];
                    this.addCateForm.cat_level = this.selectedKeys.length;
                    return
                } else {
                    this.addCateForm.cat_pid = 0;
                    this.addCateForm.cat_level = 0;
                }
            },
            //点击按钮添加新的分类
            addCate() {
                // this.$refs.addCateFormRef.validate(async valid => {
                this.$refs.addCateFormRef.validate(valid => {
                    if (!valid) return
                    // const {data: res} = await this.$http.post('categories', this.addCateForm);
                    const {data: res} = {data: {meta: {status: 201}}};
                    if (res.meta.status !== 201) {
                        return this.$message.error('添加分类失败');
                    }
                    this.$message.success('添加分类成功');
                    this.getCateList();
                    this.addcatDialogVisible = false;
                });

            },
            //监听对话框的关闭事件
            addCateDialogClosed() {
                this.$refs.addCateFormRef.resetFields();
                this.selectedKeys = [];
                this.addCateForm.cat_name = '';
                this.addCateForm.cat_level = 0;
                this.addCateForm.cat_pid = 0;
            }
        }
    }
</script>

<style lang="less" scoped>
    .treeTable {
        margin-top: 15px;
    }

    .el-cascader {
        width: 100%;
    }
</style>