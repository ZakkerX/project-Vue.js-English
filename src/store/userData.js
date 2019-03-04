import Vue from 'vue'
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
          for (let key in userData.books) {
            if (userData.books.hasOwnProperty(key)) {
              userData.books[key].addedDate = userData.books[key].addedDate.toDate()
            }
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
    }
  },
  getters: {
    userData (state) {
      return state.userData
    }
  }
}
