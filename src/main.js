// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
//element-ui安装后配置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueHighcharts from 'vue-highcharts'
import echarts from 'echarts'
Vue.use(VueHighcharts)
//axios
Vue.use(VueAxios, axios)
//vuex
import Vuex from 'vuex'

Vue.use(ElementUI, {
  size: "small"
});
Vue.use(Vuex);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {

    moreChart() {
      var options = this.getMoreOptions(this.type);

      if (this.chart) {
        this.chart.destroy();
      };
      // 初始化 Highcharts 图表
      this.chart = new Highcharts.Chart('highcharts-more', options);
    }
  },
  created: function () {
    Vue.prototype.$echarts = echarts
  },
})
