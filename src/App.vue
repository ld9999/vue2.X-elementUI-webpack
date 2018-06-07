<template>
    <div id="app" class="fillcontain">
        <div class="manage_page fillcontain">
            <el-col id='leftMenu' :span="4" style="height: 100%;">
                <leftmenu></leftmenu>
            </el-col>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import leftmenu from "@/page/leftMenu";

export default {
    name: "App",
    components: {
        leftmenu
    }
};
</script>

<style>
.bgblue {
    background-color: #324057;
}
body,
p {
    margin: 0;
}
html,
body,
.fillcontain {
    width: 100%;
    height: 100%;
}

.manage_page .tac {
    height: 100%;
}
.fillcontain,
.vor {
    height: 100%;
    overflow-y: scroll;
}
.fillcontain::-webkit-scrollbar,
.vor::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.fillcontain::-webkit-scrollbar-thumb,
.vor::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
}
.fillcontain::-webkit-scrollbar-track,
.vor::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
}
</style>
