import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'

import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken3
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBYf5_mUXsOgjjdaXZmmj-okgdjPbscJnc',
      authDomain: 'i-m-learning-javascript.firebaseapp.com',
      databaseURL: 'https://i-m-learning-javascript.firebaseio.com',
      projectId: 'i-m-learning-javascript',
      storageBucket: 'i-m-learning-javascript.appspot.com',
      messagingSenderId: '146726659529'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
})
