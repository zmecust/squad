import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Main from '../view/Main.vue';

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Main
    }
  ]
})

export default router;
