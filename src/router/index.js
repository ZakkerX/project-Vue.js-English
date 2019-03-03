import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard'

import Home from '@/components/views/Home'
import Books from '@/components/views/Books'
import Words from '@/components/views/Words'
import Profile from '@/components/views/Profile'

import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/books',
      name: 'books',
      component: Books,
      beforeEnter: AuthGuard
    },
    {
      path: '/words',
      name: 'words',
      component: Words,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    }
  ],
  mode: 'history'
})
