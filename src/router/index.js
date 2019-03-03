import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard'

import Home from '@/components/views/Home'
import Books from '@/components/views/Books'
import Book from '@/components/views/Book'
import BookPart from '@/components/views/BookPart'
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
      path: '/book/:id',
      name: 'book',
      component: Book,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: '/book/:bookId/part/:partId',
      name: 'bookPart',
      component: BookPart,
      props: true,
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
