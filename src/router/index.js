import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '../views/LayOut.vue'
import TestCase from '../views/TestCase.vue'
import TestReport from '../views/TestReport.vue'
import TestTask from '../views/TestTask.vue'
import LoginTest from '../views/LoginTest.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/case'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginTest
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayOut,
    children:[
      {
        path: 'case',
        name: 'case',
        component: TestCase
      },
      {
        path: 'task',
        name: 'task',
        component: TestTask
      },
      {
        path: 'report',
        name: 'report',
        component: TestReport
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
