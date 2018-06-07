<template>
    <div style="height: 100%; min-height: 100%;">
        <div class="vor">
            <navbar></navbar>
            <el-col :span="24">
                <el-row class="addshop">
                    <el-col :span="12" :offset="4" style="min-height: 100%">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="店铺名称" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="详细地址" prop="region">
                                <el-input v-model="ruleForm.region"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone">
                                <el-input v-model="ruleForm.phone"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
        </div>
    </div>
</template>

<script>
//引入
import navbar from "@/page/navbar";

const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
//定义一个全局的变量
var validPhone = (rule, value, callback) => {
    if (!value) {
        callback(new Error("请输入电话号码"));
    } else if (!reg.test(value)) {
        callback(new Error("请输入正确的11位手机号码"));
    } else {
        callback();
    }
};

export default {
    data() {
        return {
            ruleForm: {
                name: "",
                region: "",
                phone: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ],
                region: [
                    {
                        required: true,
                        message: "请输入详细地址",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validPhone
                    }
                ]
            }
        };
    },
    components: {
        navbar
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
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

.el-menu--inline .el-menu-item {
    color: rgb(255, 255, 255);
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

.addshop {
    margin-top: 20px;
}
</style>