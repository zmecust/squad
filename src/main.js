import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import router from './router/index'
import 'nprogress/nprogress.css';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
