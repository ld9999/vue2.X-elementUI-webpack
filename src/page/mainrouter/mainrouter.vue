<template>
    <div style="height: 100%; min-height: 100%;">
        <div class="vor">
            <navbar></navbar>
            <el-col :span="24">
                <h2 class="analyst">数据统计</h2>
                <x-chart :id="id" :option="option"></x-chart>
            </el-col>
        </div>
    </div>
</template>

<script>
// 导入chart组件
import XChart from "@/components/chart";
//	import
import navbar from "@/page/navbar";

export default {
    name: "mainrouter",
    data() {
        return {
            id: "test",
            option: {
                chart: {
                    type: "line"
                },
                title: {
                    text: "网站日常访问量"
                },
                subtitle: {
                    text: "数据来源: ManagementSystem Analytics" //表头下文字
                },
                xAxis: {
                    //x轴显示的内容
                    categories: [
                        "2018.05.13",
                        "2018.05.14",
                        "2018.05.15",
                        "2018.05.16",
                        "2018.05.17",
                        "2018.05.18",
                        "2018.05.19",
                        "2018.05.20",
                        "2018.05.21",
                        "2018.05.22",
                        "2018.05.23",
                        "2018.05.24"
                    ]
                },
                yAxis: [
                    {
                        // 第一个 Y 轴，放置在左边（默认在坐标）
                        title: {
                            text: null
                        },
                        labels: {
                            align: "left",
                            x: 3,
                            y: 16,
                            format: "{value:.,0f}"
                        },
                        showFirstLabel: false
                    },
                    {
                        // 第二个坐标轴，放置在右边
                        linkedTo: 0,
                        gridLineWidth: 0,
                        opposite: true, // 通过此参数设置坐标轴显示在对立面
                        title: {
                            text: null
                        },
                        labels: {
                            align: "right",
                            x: -3,
                            y: 16,
                            format: "{value:.,0f}"
                        },
                        showFirstLabel: false
                    }
                ],
                legend: {
                    align: "left",
                    verticalAlign: "top",
                    y: 20,
                    floating: true,
                    borderWidth: 0
                },
                plotOptions: {
                    cursor: "pointer",
                    line: {
                        dataLabels: {
                            enabled: true // 开启数据标签
                        },
                        enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    }
                },
                series: [
                    {
                        //两条数据
                        name: "访问量（PV）",
                        data: [
                            37,
                            69,
                            57,
                            145,
                            85,
                            215,
                            252,
                            142,
                            233,
                            183,
                            139,
                            103
                        ]
                    },
                    {
                        name: "访问量（UV）",
                        data: [
                            119,
                            42,
                            95,
                            184,
                            119,
                            152,
                            170,
                            166,
                            265,
                            96,
                            66,
                            48
                        ]
                    }
                ]
            }
        };
    },
    components: {
        navbar,
        XChart
    }
};
</script>

<style>
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    background-color: #eff2f7;
}
.el-dropdown-menu__item--divided:before,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    background-color: #eff2f7;
}
.clear {
    clear: both;
}
.fl {
    float: left;
}
.fr {
    float: right !important;
}
.navbox {
    background-color: #eff2f7;
    width: 100%;
    height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
}
.avatorbox {
    line-height: 60px;
    position: relative;
    background-color: #eff2f7;
    width: 80px;
}
.avator {
    width: 36px;
    height: 36px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
}
.pages {
    line-height: 60px;
}
.droplists {
    width: 100px;
    height: 86px;
    position: absolute;
    top: 60px;
    right: 50px;
    z-index: 2011;
    box-sizing: border-box;
}
.avatorbox .el-icon-arrow-down {
    display: none;
}
.el-menu--popup {
    min-width: 100px;
    text-align: center;
}
.analyst {
    text-align: center;
}
</style>