<template>
    <el-col :span="24" class="navbar">
        <el-menu class="el-menu-demo navbox" mode="horizontal" text-color="#000">
            <el-breadcrumb separator="/" class="fl pages">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-submenu width="80px" index="2" class="fr avatorbox">
                <template width="80px" slot="title">
                    <span class="el-dropdown-link">
                        <img src="//elm.cangdu.org/img/default.jpg" class="avator">
                    </span>
                </template>
                <el-menu-item width="80px" index="2-1">
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item width="80px" index="2-2" @click="exit" class="exitBtn">
                    <span>退出</span>
                </el-menu-item>
            </el-submenu>
            <div class="clear"></div>
        </el-menu>
    </el-col>
</template>

<script>
export default {
    name: "navbar",
    mounted() {
        var a = document.getElementById("leftMenu");
        a.style.display = "block";
    },
    methods: {
        exit() {
            sessionStorage.isLogin = false;
            this.$router.push({ path: "/login" });
        }
    }
};
</script>

<style>
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    background-color: #eff2f7;
}
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    background-color: #eff2f7 !important;
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
    /*display: none;*/
    box-sizing: border-box;
}

.avatorbox .el-icon-arrow-down {
    display: none;
}

.el-menu--popup {
    min-width: 100px;
    text-align: center;
}
.exitBtn:hover {
    color: #eff2f7;
}
</style>