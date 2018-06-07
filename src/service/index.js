import Vue from "vue";
//登录
var regist_svc = (data) => {
    return Vue.axios.post('/api/register', data)
}
var addGoodscate_svc = (data) => {
    return Vue.axios.post('/api/addGoodscate', data)
}
var getFoodCate_svc = (data) => {
    return Vue.axios.get('/api/getFoodCate', data)
}
var addFood_svc = (data) => {
    return Vue.axios.post('/api/addFood', data)
}
var getFoodList_svc = (data) => {
    return Vue.axios.get('/api/getFoodList', data)
}
var getFoodId_svc = (data) => {
    return Vue.axios.post('/api/getFoodId', data)
}
var editFoodInfo_svc = (data) => {
    return Vue.axios.post('/api/editFoodInfo', data)
}
var removeFood_svc = (data) => {
    return Vue.axios.post('/api/removeFood', data)
}
//获取商品列表
//var goodsList = (data)=>{
//	return Vue.axios.get('users/recommend',{
//		params:data
//	})
//}
export {
    regist_svc,
    addGoodscate_svc,
    getFoodCate_svc,
    addFood_svc,
    getFoodList_svc,
    getFoodId_svc,
    editFoodInfo_svc,
    removeFood_svc
};