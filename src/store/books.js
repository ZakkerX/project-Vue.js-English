import Vue from 'vue'
export default {
  state: {
    books: [],
    bookParts: []
  },
  mutations: {
    setBooks (state, payload) {
      state.books = payload
    }
  },
  actions: {
    loadBooks ({commit}) {
      Vue.$db.collection('books').get().then(qs => {
        let books = []
        qs.forEach(s => {
          const data = s.data()
          let book = {
            id: s.id,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            level: data.level.slice(),
            youtubeUrl: data.youtubeUrl
          }
          let parts = []
          if (data.parts) {
            data.parts.forEach(p => {
              let part = {
                id: p.id,
                title: p.title,
                youtube_id: p.youtube_id
              }
              parts.push(part)
            })
          }
          book.parts = parts
          books.push(book)
        })
        commit('setBooks', books)
      }).catch(e => {
        global.console.log(e)
      })
    }
  },
  getters: {
    getBooks (state) {
      return state.books
    }
  }
}
