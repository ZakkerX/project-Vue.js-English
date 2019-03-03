import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import shared from './shared'
import books from './books'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, shared, books
  }
})
