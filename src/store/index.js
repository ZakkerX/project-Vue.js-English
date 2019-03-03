import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import shared from './shared'
import books from './books'
import userData from './userData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, shared, books, userData
  }
})
