//编写接口
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/register', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    models.User.findOne({
        account: req.body.account,
        password: req.body.password
    }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        // 如果账号已存在
        if (result) {
            res.json({
                status: true,
                msg: "登录成功！"
            });
            return;
        }
        // 如果账号不存在,执行注册
        // 储存数据
        let user = new models.User({
            account: req.body.account,
            password: req.body.password
        });
        user.save((err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
            // 存储成功
            res.json({
                status: true,
                msg: "注册成功！",
                _id: doc._id
            });
        });
    });
    // 保存数据newAccount数据进mongoDB
});
//获取食品种类列表
router.get('/api/getFoodCate', (req, res) => {
    models.GoodsCate.find({}, (err, doc) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: true,
            msg: "获取分类！",
            data: doc
        });
    });
})
//添加食品种类
router.post('/api/addGoodsCate', (req, res) => {
    models.GoodsCate.find({
        name: req.body.name
    }, (err, doc) => {
        if (err) {
            console.log(err);
            return;
        }
        if (doc.length > 0) {
            res.json({
                status: false,
                msg: "食品种类已存在"
            });
            return;
        }
        let goodsCate = new models.GoodsCate(req.body);
        goodsCate.save((err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
            res.json({
                status: true,
                msg: "食品种类添加成功",
                data: doc
            });
        });
    });
});
router.post('/api/addFood', (req, res) => {
    models.AddFood.find({
        name: req.body.name
    }, (err, doc) => {
        if (err) {
            console.log(err);
            return;
        }
        if (doc.length > 0) {
            res.json({
                status: false,
                msg: "食品已存在"
            });
            return;
        }
        let addFood = new models.AddFood(req.body);
        addFood.save((err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
            res.json({
                status: true,
                msg: "食品添加成功",
                data: doc
            });
        })
    });
});
//获取食品列表
router.get('/api/getFoodList', (req, res) => {
    models.AddFood.find({}).populate('catename').exec((err, doc) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: true,
            msg: "获取食品！",
            data: doc
        });
    });
})
//获取row_id 取后台数据,前台更新取消  后台数据不更新
router.post('/api/getFoodId', (req, res) => {
    models.AddFood.findOne({ _id: req.body._id }, (err, doc) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            status: true,
            msg: "获取食品！",
            data: doc
        });
    });
})
//获取row_id 取后台数据,前台更新取消  后台数据不更新
router.post('/api/removeFood', (req, res) => {
    models.AddFood.remove({ _id: req.body._id }, (err, doc) => {
        if (err) {
            console.log(err);
            return;
        }
        models.AddFood.find({}, (err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
            res.json({
                status: true,
                msg: "刷新成功！",
                data: doc
            });
        });
    });
})
//编辑修改食品信息
router.post('/api/editFoodInfo', (req, res) => {
    models.AddFood.findOneAndUpdate({
        _id: req.body._id
    }, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            packing_fee: req.body.packing_fee,
            catename: req.body.trait,
            catename: req.body.catename
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
            models.AddFood.find({}, (err, doc) => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json({
                    status: true,
                    msg: "修改成功！",
                    data: doc
                });
            })
        });
})

module.exports = router;