<template>
	<el-col :span="24" style="min-height: 100%; height: 100%; background-color: #324057;">
		<el-menu default-active="1" class="el-menu-vertical-demo el-menu--dark" style="min-height: 100%;" @open="handleOpen" @close="handleClose" background-color="rgb(50, 64, 87)" text-color="#bfcbd9" active-text-color="#20a0ff">
			<el-menu-item index="1" class="pads">
				<router-link to='/home' tag='li' class='pad0 pa-left-20'>
					<i class="el-icon-menu"></i>
					<span class="title">首页</span>
				</router-link>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-document"></i>
					<span>数据管理</span>
				</template>
				<el-menu-item index="2-1">用户列表</el-menu-item>
				<el-menu-item index="2-2">
					<router-link to="/echarts" tag="li">商家列表</router-link>
				</el-menu-item>
				<el-menu-item index="2-3">
					<router-link to="/goodslist" tag="li">食品列表</router-link>
				</el-menu-item>
				<el-menu-item index="2-4">订单列表</el-menu-item>
				<el-menu-item index="2-5">管理员列表</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-plus"></i>
					<span>添加数据</span>
				</template>
				<el-menu-item index="3-1">
					<router-link to="/addshop" tag="li">添加商铺</router-link>
				</el-menu-item>
				<el-menu-item index="3-2">
					<router-link to="/addgoods" tag="li">添加商品</router-link>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-star-on"></i>
					<span>图表</span>
				</template>
				<el-menu-item index="4-1">用户分布</el-menu-item>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-edit"></i>
					<span>编辑</span>
				</template>
				<el-menu-item index="5-1">文本编辑</el-menu-item>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title">
					<i class="el-icon-setting"></i>
					<span>设置</span>
				</template>
				<el-menu-item index="6-1">管理员设置</el-menu-item>
			</el-submenu>
			<el-submenu index="7">
				<template slot="title">
					<i class="el-icon-warning"></i>
					<span>说明</span>
				</template>
				<el-menu-item index="7-1">说明</el-menu-item>
			</el-submenu>
		</el-menu>
	</el-col>
</template>

<script>
export default {
    name: "leftmenu",
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style>
.pans .el-menu-item {
    padding: 0 !important;
}
.elWidth a {
    display: block;
    color: #ffffff;
    padding: 0 40px;
}
.el-menu--dark {
    width: 100%;
}
.pads:hover,
.el-submenu .el-menu-item:hover,
.el-submenu__title:hover,
.el-menu-item.is-active:hover {
    background-color: #48576a !important;
}

.el-menu--dark .el-submenu .el-menu-item {
    background-color: #1f2d3d !important;
}
.el-icon-arrow-down {
    font-size: 16px;
    color: #bfcbd9;
}
</style>