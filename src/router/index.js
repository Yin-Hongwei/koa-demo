import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Item from '@/components/Item'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    }
  ]
})
