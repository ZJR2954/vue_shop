<template>
    <div>
        <!--面包屑导航区域-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>统计数据</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--卡片视图区域-->
        <el-card>
            <div id="main" style="width: 600px;height:400px;"></div>
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "report",
        data() {
            return {
                options: {
                    title: {text: "用户来源"},
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross",
                            label: {
                                backgroundColor: '#e9eef3'
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        data: [],
                        name: 'x轴'
                    },
                    yAxis: {
                        name: 'y轴'
                    },
                    series: []
                }
            }
        },
        created() {
        },
        // async mounted() {
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            // const {data: res} = await this.$http.get('reports/type/1');
            const {data: res} = {
                data: {
                    data: {
                        params: ['data01', 'data02', 'data03', 'data04', 'data05', 'data06'],
                        datas: [
                            {
                                name: '统计量01',
                                type: 'line',
                                data: [5, 20, 36, 10, 10, 20],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true
                                        }
                                    }
                                }
                            }, {
                                name: '统计量02',
                                type: 'line',
                                data: [1, 2, 3, 4, 5, 6],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    meta: {status: 200}
                }
            };

            if (res.meta.status !== 200) {
                return this.$message.error('获取折线图数据失败');
            }

            this.options.xAxis.data = res.data.params;
            this.options.series = res.data.datas;

            myChart.setOption(this.options);
        },
        methods: {}
    }
</script>

<style lang="less" scoped>

</style>