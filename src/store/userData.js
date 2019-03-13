import Vue from 'vue'
import * as firebase from 'firebase'
import {EventBus} from '../infrastructure/eventBus'

let defaultUserData = {
  books: {},
  words: {}
}
export default {
  state: {
    userData: defaultUserData
  },
  mutations: {
    setUserData (state, payload) {
      state.userData = payload
    },
    addUserBook (state, payload) {
      Vue.set(state.userData.books, payload.bookId, payload.book)// для того чтобы при добавление новых свйоств они были рективными №8 31:00
    },
    addUserBookPart (state, payload) {
      Vue.set(state.userData.books[payload.bookId].parts, payload.partId, {addedDate: payload.timestamp})
    },
    updateUserBookPartLastOpenedDate (state, payload) {
      Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'lastOpenedDate', payload.timestamp)
    },
    updateUserBookPartFinishInfo (state, payload) {
      Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'finishedDate', payload.timestamp)
      Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'rating', payload.rating)
    },
    addUserWord (state, payload) {
      Vue.set(state.userData.words, payload.wordId, payload.word)
    },
    removeUserWord (state, payload) {
      Vue.delete(state.userData.words, payload)
      EventBus.notify('userword: updated', payload)
    },
    updateUserWord (state, payload) {
      Vue.set(state.userData.words[payload.wordId], 'bucket', payload.word.bucket)
      Vue.set(state.userData.words[payload.wordId], 'nextShowDate', payload.word.nextShowDate)
      EventBus.notify('userword: updated', payload.wordId)
    }
  },
  actions: {
    loadUserData ({commit}, payload) {
      commit('setLoading', true)
      let userDataRef = Vue.$db.collection('userData').doc(payload)
      userDataRef.get()
        .then((data) => {
          let userData = data.exists ? data.data() : defaultUserData
          if (!userData.books) {
            userData.books = {}
          }
          if (!userData.words) {
            userData.words = {}
          }
          commit('setUserData', userData)
          commit('setLoading', false)
        })
        .catch((e) => {
          commit('setLoading', false)
        })
    },
    addUserBook ({commit, getters}, payload) {
      commit('setLoading', true)
      let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
      let book = {
        addedDate: new Date(),
        parts: {}
      }
      userDataRef.set({
        books: {
          [payload]: book
        }
      }, {merge: true})
        .then(() => {
          commit('addUserBook', {bookId: payload, book: book})
          commit('setLoading', false)
        })
        .catch((e) => {
          commit('setLoading', false)
        })
    },
    addUserWord ({commit, getters}, payload) {
      commit('setLoading', true)
      console.log(payload)
      let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
      let word = {
        origText: payload.origText,
        transText: payload.transText,
        type: payload.type,
        addedDate: new Date(),
        bucket: 1,
        nextShowDate: new Date()
      }
      if (payload.origPrefix) {
        word.origPrefix = payload.origPrefix
      }
      userDataRef.set({
        words: {
          [payload.key]: word
        }
      }, {merge: true})
        .then(() => {
          commit('addUserWord', {wordId: payload.key, word: word})
          commit('setLoading', false)
        })
        .catch((e) => {
          commit('setLoading', false)
        })
    },
    updateUserBookPartStats ({commit, getters}, payload) {
      let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
      let timestamp = new Date()
      if (!getters.userData.books[payload.bookId].parts[payload.partId]) {
        userDataRef.update({
          [`books.${payload.bookId}.parts.${payload.partId}.addedDate`]: timestamp
        })
          .then(() => commit('addUserBookPart', {bookId: payload.bookId, partId: payload.partId, timestamp: timestamp}))
      }
      userDataRef.update({
        [`books.${payload.bookId}.parts.${payload.partId}.lastOpenDate`]: timestamp
      })
        .then(() => commit('updateUserBookPartLastOpenedDate', {bookId: payload.bookId, partId: payload.partId, timestamp: timestamp}))
        .catch((e) => {
          console.log(e)
        })
    },
    finishUserBookPart ({commit, getters}, payload) {
      let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
      let timestamp = new Date()
      userDataRef.update({
        [`books.${payload.bookId}.parts.${payload.partId}.finishedDate`]: timestamp,
        [`books.${payload.bookId}.parts.${payload.partId}.rating`]: payload.rating
      })
        .then(() => commit('updateUserBookPartFinishInfo', {bookId: payload.bookId, partId: payload.partId, timestamp: timestamp, rating: payload.rating}))
        .catch((e) => {
          console.log(e)
        })
    },
    processUserWord ({commit, getters}, payload) {
      let word = getters.userData.words[payload]
      let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
      if (word.bucket === 5) {
        userDataRef.update({
          [`words.${payload}`]: firebase.firestore.FieldValue.delete()
        })
          .then(() => commit('removeUserWord', payload))
      } else {
        let nextShowDate = new Date()
        nextShowDate = new Date(nextShowDate.setDate(new Date().getDate() + word.bucket * 2))
        word.nextShowDate = nextShowDate
        word.bucket++

        userDataRef.set({
          words: {
            [payload]: word
          }
        }, {merge: true})
          .then(() => commit('updateUserWord', {word: word, wordId: payload}))
      }
    }
  },
  getters: {
    userData (state) {
      return state.userData
    }
  }
}
