<template>
    <div style="height: 100%; min-height: 100%;">
        <div class="vor">
            <navbar></navbar>
            <el-col :span="24" class="table_container">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="expand">
                        <template scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="食品名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>

                                <el-form-item label="食品 ID">
                                    <span>{{ props.row._id }}</span>
                                </el-form-item>

                                <el-form-item label="食品介绍">
                                    <span>{{ props.row.description }}</span>
                                </el-form-item>
                                <el-form-item label="食品价格">
                                    <span>{{ props.row.price }}</span>
                                </el-form-item>
                                <el-form-item label="包装费">
                                    <span>{{ props.row.packing_fee }}</span>
                                </el-form-item>
                                <el-form-item label="食品种类">
                                    <span>{{ props.row.catename.name }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="食品名称" prop="name">
                    </el-table-column>
                    <el-table-column label="食品介绍" prop="description">
                    </el-table-column>
                    <el-table-column label="特点" prop="trait">
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template scope="scope">
                            <el-button size="small" @click="saveEditId(scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
                    <el-form :model="editTable" status-icon :rules="rules" ref="editTable">
                        <el-form-item label="食品名称" label-width="100px" prop="name">
                            <el-input v-model="editTable.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="食品介绍" label-width="100px" prop="description">
                            <el-input v-model="editTable.description"></el-input>
                        </el-form-item>
                        <el-form-item label="食品价格" label-width="100px" prop="price">
                            <el-input v-model="editTable.price"></el-input>
                        </el-form-item>
                        <el-form-item label="食品包装费" label-width="100px" prop="packing_fee">
                            <el-input v-model="editTable.packing_fee"></el-input>
                        </el-form-item>
                        <el-form-item label="食品特点" label-width="100px" prop="catename">
                            <el-select v-model="editTable.trait">
                                <el-option label="新品" value="新品">
                                </el-option>
                                <el-option label="招牌" value="招牌">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="食品种类" label-width="100px" prop="catename">
                            <el-select v-model="editTable.catename">
                                <el-option v-for="item in cate" :key="item._id" :label="item.name" :value="item._id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editFood('editTable')">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="centerDialogVisible" width="25%" center>
                    <span>确认删除该条数据？</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button type='danger' @click="remove">确认</el-button>
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                    </span>
                </el-dialog>

            </el-col>
        </div>
    </div>
</template>

<script>
import navbar from "@/page/navbar";
import {
    addGoodscate_svc,
    addFood_svc,
    getFoodList_svc,
    getFoodCate_svc,
    getFoodId_svc,
    editFoodInfo_svc,
    removeFood_svc
} from "@/service";

export default {
    data() {
        var validatename = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入食品名称"));
            } else {
                callback();
            }
        };
        var validatedescription = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入食品描述"));
            } else {
                callback();
            }
        };
        var validateprice = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入食品价格"));
            } else {
                callback();
            }
        };
        var validatepacking_fee = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入食品包装费"));
            } else {
                callback();
            }
        };
        var validatecatename = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入食品分类"));
            } else {
                callback();
            }
        };
        return {
            tableData: [],
            delID: "",
            editTable: {
                name: "",
                description: "",
                price: "",
                packing_fee: "",
                catename: "",
                traitname: ""
            },
            //编辑
            dialogFormVisible: false,
            centerDialogVisible: false,
            cate: [],
            rules: {
                name: [
                    {
                        validator: validatename,
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        validator: validatedescription,
                        trigger: "blur"
                    }
                ],
                price: [
                    {
                        validator: validateprice,
                        trigger: "blur"
                    }
                ],
                packing_fee: [
                    {
                        validator: validatepacking_fee,
                        trigger: "blur"
                    }
                ],
                catename: [
                    {
                        validator: validatecatename,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    mounted() {
        getFoodList_svc().then(result => {
            if (result.data.status) {
                this.tableData = result.data.data;
            } else {
                alert(result.data.msg);
            }
        });
        getFoodCate_svc().then(result => {
            if (result.data.status) {
                this.cate = result.data.data;
            } else {
                alert(result.data.msg);
            }
        });
    },
    methods: {
        saveEditId(row) {
            getFoodId_svc({ _id: row._id }).then(result => {
                if (result.data.status) {
                    this.editTable = result.data.data;
                    this.dialogFormVisible = true;
                    console.log(this.editTable);
                } else {
                    alert(result.data.msg);
                }
            });
        },
        editFood(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    editFoodInfo_svc(this.editTable).then(result => {
                        if (result.data.status) {
                            alert(result.data.msg);
                            this.tableData = result.data.data;
                            this.dialogFormVisible = false;
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
        del(row) {
            this.delID = row._id;
            this.centerDialogVisible = true;
        },
        remove() {
            removeFood_svc({ _id: this.delID }).then(result => {
                if (result.data.status) {
                    alert(result.data.msg);
                    console.log(this);
                    this.tableData = result.data.data;
                    this.centerDialogVisible = false;
                } else {
                    alert(result.data.msg);
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
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.table_container {
    padding: 20px;
}
.Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
.table_container .el-table--fit {
    border-bottom: 0;
}
.el-table {
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    border: 1px solid #dfe6ec;
    font-size: 14px !important;
    color: #1f2d3d !important;
}
.el-table td,
.el-table th {
    height: 40px;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
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
.el-table__footer-wrapper thead div,
.el-table__header-wrapper thead div {
    background-color: #eef1f6;
    color: #1f2d3d;
}
.el-table__expand-icon {
    position: relative;
    cursor: pointer;
    color: #666;
    font-size: 12px;
    transition: transform 0.2s ease-in-out;
    height: 40px;
}
.cell {
    text-align: center;
}
.el-table__expand-icon > .el-icon {
    font-size: 18px;
    position: absolute;
    left: 50%;
    top: 13%;
    margin-left: -5px;
    margin-top: -5px;
    line-height: 40px;
}
.el-pagination {
    font-weight: 500;
}
.el-pager li,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next {
    border: 1px solid #d1dbe5;
    box-sizing: border-box;
}
.el-pagination.is-background .el-pager li,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next {
    margin: 0;
    background-color: #ffffff;
    border-radius: 0px;
}
.el-pager li,
.el-pagination.is-background .btn-prev {
    padding: 0 4px;
    border-right: 0;
    background: #fff;
    font-size: 13px;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
}
</style>