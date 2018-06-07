<template>
    <div style="height: 100%; min-height: 100%;">
        <div class="vor">
            <navbar></navbar>
            <el-col :span="24" style="margin-top: 20px;">
                <el-col :span="14" :offset="4">
                    <header class="form_header">选择食品种类</header>
                    <el-form ref="categoryForm" :model="categoryForm" label-width="110px" class="form">
                        <el-row class="category_select">
                            <el-form-item label="食品种类">
                                <el-select v-model="foodForm.catename" style="width:100%;">
                                    <el-option v-for='(item,index) in cate' :key='index' :label="item.name" :value="item._id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
                            <div class="add_category">
                                <el-form-item label="食品种类" prop="name">
                                    <el-input v-model="categoryForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="种类描述" prop="description">
                                    <el-input v-model="categoryForm.description"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitcategoryForm('categoryForm')">添加</el-button>
                                </el-form-item>
                            </div>
                        </el-row>
                        <div class="add_category_button" @click="addCategoryFun">
                            <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
                            <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
                            <span>添加食品种类</span>
                        </div>
                    </el-form>
                    <header class="form_header">添加食品</header>
                    <el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
                        <el-form-item label="食品名称" prop="name">
                            <el-input v-model="foodForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="食品活动" prop="activity">
                            <el-input v-model="foodForm.activity"></el-input>
                        </el-form-item>
                        <el-form-item label="食品详情" prop="description">
                            <el-input v-model="foodForm.description"></el-input>
                        </el-form-item>
                        <el-form-item label="食品特点">
                            <el-select v-model="foodForm.trait" placeholder="请选择">
                                <el-option label="新品" value="新品"></el-option>
                                <el-option label="招牌" value="招牌"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-row v-if="foodSpecs == 'one'">
                            <el-form-item label="包装费">
                                <el-input-number v-model="foodForm.packing_fee" :min="0" :max="100"></el-input-number>
                            </el-form-item>
                            <el-form-item label="价格">
                                <el-input-number v-model="foodForm.price" :min="0" :max="10000"></el-input-number>
                            </el-form-item>
                        </el-row>
                        <el-form-item>
                            <el-button type="primary" @click="addFood('foodForm')">确认添加食品</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-col>
        </div>
    </div>
</template>

<script>
import navbar from "@/page/navbar";
import { addGoodscate_svc, getFoodCate_svc, addFood_svc } from "@/service";

export default {
    data() {
        return {
            cate: [],
            showAddCategory: false,
            foodSpecs: "one",
            dialogFormVisible: false,
            categoryForm: {
                name: "",
                description: ""
            },

            foodForm: {
                catename: "",
                name: "",
                activity: "",
                description: "",
                trait: "",
                packing_fee: 0,
                price: 20
            },
            foodrules: {
                name: [
                    {
                        required: true,
                        message: "请输入食品名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    mounted() {
        getFoodCate_svc().then(result => {
            if (result.data.status) {
                this.cate = result.data.data;
                console.log(this.cate);
            } else {
                alert(result.data.msg);
            }
        });
    },
    methods: {
        addCategoryFun() {
            this.showAddCategory = !this.showAddCategory;
        },
        submitcategoryForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    addGoodscate_svc(this.categoryForm).then(result => {
                        if (result.data.status) {
                            alert(result.data.msg);
                            this.cate = result.data.data;
                            this.$refs[formName].resetFields();
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

        tableRowClassName(row, index) {
            if (index === 1) {
                return "info-row";
            } else if (index === 3) {
                return "positive-row";
            }
            return "";
        },
        addFood(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    addFood_svc(this.foodForm).then(result => {
                        if (result.data.status) {
                            alert(result.data.msg);
                            console.log(this.foodForm);
                            this.$refs[formName].resetFields();
                        } else {
                            alert(result.data.msg);
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    components: {
        navbar
    }
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.form_header {
    text-align: center;
    margin-bottom: 10px;
}
.form {
    min-width: 400px;
    margin-bottom: 30px;
}
.add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 0.4s;
    background: #f9fafc;
}
.showEdit {
    height: 185px;
}
.add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;
}
.add_category_button :hover {
    background: #f9fafc;
}
.add_category_button :hover span,
.add_category_button :hover .edit_icon {
    color: #20a0ff;
}
.add_category_button span {
    font-size: 14px;
    color: #999;
    transition: all 400ms;
}
.add_category_button .edit_icon {
    color: #ccc;
    transition: all 400ms;
}
.el-form-item {
    margin-bottom: 22px !important;
}
.category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
}
.add_category {
    background: #f9fafc;
    padding: 10px 30px 0 10px;
    border: 1px solid #eaeefb;
    border-top: none;
}
.food_form {
    border: 1px solid #eaeefb;
    padding: 10px 10px 0;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.el-radio__inner {
    width: 18px;
    height: 18px;
}
.el-radio__inner::after {
    width: 6px;
    height: 6px;
}
.el-table {
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    border: 1px solid #dfe6ec;
    font-size: 14px;
    color: #1f2d3d;
}
.el-table thead {
    color: #1f2d3d;
    font-weight: 700;
}
.el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #dfe6ec;
}
.el-table th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #eef1f6;
    text-align: center;
}
</style>