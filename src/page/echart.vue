<template>
    <div style="height: 100%; min-height: 100%;">
        <div class="vor">
            <navbar></navbar>
            <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
        </div>
    </div>
</template>
<script>
import navbar from "@/page/navbar";

export default {
    name: "",
    data() {
        return {
            charts: "",
            opinion: [
                "直接访问",
                "邮件营销",
                "联盟广告",
                "视频广告",
                "搜索引擎"
            ],
            opinionData: [
                { value: 335, name: "直接访问" },
                { value: 310, name: "邮件营销" },
                { value: 234, name: "联盟广告" },
                { value: 135, name: "视频广告" },
                { value: 1548, name: "搜索引擎" }
            ]
        };
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById("myChart")
            );
            // 绘制图表
            myChart.setOption({
                title: { text: "在Vue中使用echarts" },
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        }
    },
    //调用
    mounted() {
        this.drawLine();
    },
    components: {
        navbar
    }
};
</script>
<style>
</style>