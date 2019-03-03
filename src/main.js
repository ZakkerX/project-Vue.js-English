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
      apiKey: 'AIzaSyDKH5kigB_vIheliEtnT0MrLItzpEzq3V8',
      authDomain: 'learn-englich.firebaseapp.com',
      databaseURL: 'https://learn-englich.firebaseio.com',
      projectId: 'learn-englich',
      storageBucket: '',
      messagingSenderId: '512354013634'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
})
