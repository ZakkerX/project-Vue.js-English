import * as firebase from 'firebase'
import {EventBus} from '../infrastructure/eventBus'

export default {
  state: {
    user: {
      uid: null,
      email: null,
      name: null
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user.uid = payload.uid
      state.user.email = payload.email
    },
    setUserName (state, payload) {
      state.user.name = payload
    },
    setUserEmail (state, payload) {
      state.user.email = payload
    }
  },
  actions: {
    async registerUser ({commit}, {name, email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', {uid: user.uid})
        const userName = await firebase.auth().currentUser.updateProfile({ displayName: name })
        commit('setUserName', userName)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', {uid: user.uid, email: email})
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({commit, dispatch}, payload) {
      commit('setUser', {uid: payload.uid, email: payload.email})
      commit('setUserName', payload.displayName)
      dispatch('loadUserData', payload.uid)
    },
    logoutUser ({commit}, payload) {
      firebase.auth().signOut()
      commit('setUser', {uid: null})
    },
    changeUserProfileData ({commit}, payload) {
      let user = firebase.auth().currentUser
      let credential = firebase.auth.EmailAuthProvider.credential(
        payload.email,
        payload.password
      )
      commit('clearError')
      commit('setLoading', true)
      user.reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => {
          if (payload.changeType === 'name') {
            firebase.auth().currentUser.updateProfile({displayName: payload.newName})
              .then(() => {
                commit('setUserName', payload.newName)
                commit('setLoading', false)
                EventBus.notify('userProfileDataChanged')
              })
              .catch((error) => {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
              })
          }
          if (payload.changeType === 'email') {
            firebase.auth().currentUser.updateEmail(payload.newEmail)
              .then(() => {
                commit('setUserEmail', payload.newEmail)
                commit('setLoading', false)
                EventBus.notify('userProfileDataChanged')
              })
              .catch((error) => {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
              })
          }
          if (payload.changeType === 'password') {
            firebase.auth().currentUser.updatePassword(payload.newPassword)
              .then(() => {
                commit('setLoading', false)
                EventBus.notify('userProfileDataChanged')
              })
              .catch((error) => {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
              })
          }
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error.message)
          throw error
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user.uid !== null
    },
    userId (state) {
      return state.user.uid
    },
    userName (state) {
      return state.user.name
    },
    userEmail (state) {
      return state.user.email
    }
  }
}
