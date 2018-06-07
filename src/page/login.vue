<template>
    <div class="login_page fillcontain">
        <section class="form_contianer" v-show="showLogin">
            <div class="manage_tip">
                <p>elm后台管理系统</p>
            </div>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="50px" class="demo-ruleForm">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="用户名">
                        <span></span>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('ruleForm2')">登录</el-button>
                    <el-button class="submit_btn" @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
            <p class="tip">温馨提示：</p>
            <p class="tip">未登录过的新用户，自动注册</p>
            <p class="tip">注册过的用户可凭账号密码登录</p>
        </section>
    </div>
</template>

<script>
import { regist_svc } from "@/service";

export default {
    data() {
        var validateAccount = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入账号"));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            ruleForm2: {
                account: "",
                password: ""
            },
            rules2: {
                account: [
                    {
                        validator: validateAccount,
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        validator: validatePass2,
                        trigger: "blur"
                    }
                ]
            },
            showLogin: true
        };
    },
    mounted() {
        var a = document.getElementById("leftMenu");
        a.style.display = "none";
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    regist_svc(this.ruleForm2).then(result => {
                        if (result.status) {
                            alert(result.data.msg);
                            sessionStorage.isLogin = true;
                            this.$router.push({ path: "/" });
                        } else {
                            alert(result.data.msg);
                        }
                    });
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
.login_page {
    background-color: #324057;
}

.form_contianer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 320px;
    height: 210px;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
}

.form_contianer .ctp {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -160px;
    margin-left: -105px;
}

.manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
}

.manage_tip p {
    font-size: 34px;
    color: #fff;
}

.tip {
    font-size: 12px;
    color: red;
}
.form_contianer .submit_btn {
    width: 40%;
}
</style>
