import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

// import AuthGuard from './auth-guard'

import Home from '@/components/views/Home'
import Books from '@/components/views/Books'
import Book from '@/components/views/Book'
import BookPart from '@/components/views/BookPart'
import Words from '@/components/views/Words'
import Profile from '@/components/views/Profile'

import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/book/:id',
      name: 'book',
      component: Book,
      props: true
    },
    {
      path: '/book/:bookId/part/:partId',
      name: 'bookPart',
      component: BookPart,
      props: true
    },
    {
      path: '/words',
      name: 'words',
      component: Words
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { authRequired: true }
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
router.beforeEach((to, from, next) => {
  Store.dispatch('initAuth')
    .then(user => {
      if (to.matched.some(route => route.meta.authRequired)) {
        if (user) {
          next()
        } else {
          next('/login')
        }
      } else {
        next()
      }
    })
})

export default router
