export default {
  state: {
    books: [
      {
        id: '1',
        title: 'Book 1',
        description: 'Шестое издание бестселлера "JavaScript.',
        imageUrl: 'https://yandex.ru/images/5scXfo773/5e817fO1v/xWY2uHw5c4OrptuMvMlXcrXEaRgzREp6-xUL8zThx8QZU8QlLD05LfYJB-dg09mKXt0TCkfwzLai15Ug3g2RP9gmMsE0aU72j-eDqc20',
        parts: [
          {
            id: '1',
            title: 'part 1',
            youtube_id: '12qwd34'
          },
          {
            id: '2',
            title: 'part 2',
            youtube_id: '12s3qwd4'
          },
          {
            id: '3',
            title: 'part 3',
            youtube_id: '1s2qwd34'
          }
        ],
        level: ['B2', 'C1'],
        rating: 4.3,
        ratingCounter: 100,
        youtubeUrl: 'https://docviewer.yandex.ru/view/77182671/?*=Ypuu49GoLcLIT5oJ6VMCOYvRj5x7InVybCI6Imh0dHA6Ly9LaGFyY2h1ay5ydS9KYXZhU2NyaXB0LnBkZiIsInRpdGxlIjoiSmF2YVNjcmlwdC5wZGYiLCJ1aWQiOiI3NzE4MjY3MSIsInl1IjoiODQ2ODE5MDU5MTUzOTMyNDA1MiIsIm5vaWZyYW1lIjp0cnVlLCJ0cyI6MTU0OTg3NDA2ODQ5Niwic2VycFBhcmFtcyI6Imxhbmc9cnUmbmFtZT1KYXZhU2NyaXB0LnBkZiZ0bT0xNTQ5ODc0MDY1JnRsZD1ydSZ0ZXh0PUphdmFTY3JpcHQlM0ElMjBUaGUlMjBEZWZpbml0aXZlJTIwR3VpZGUlMjBwZGYlMjBkb3dubG9hZCUyMHJ1JnVybD1odHRwJTNBJTJGJTJGS2hhcmNodWsucnUlMkZKYXZhU2NyaXB0LnBkZiZscj0xMTMxNCZtaW1lPXBkZiZsMTBuPXJ1JnNpZ249N2U1OTQwN2NmODNlNzZjN2ViNzkwMGM5MGIwZWJiM2Ema2V5bm89MCJ9&page=59&lang=ru'
      },
      {
        id: '2',
        title: 'Book 2',
        description: 'Шестое издание бестселлера "JavaScript',
        imageUrl: 'https://www.picpng.com/images/large/book-hardcover-pink-cartoon-hd-png-77386',
        parts: [
          {
            id: '1',
            title: 'part 1',
            youtube_id: '12qwd34'
          },
          {
            id: '2',
            title: 'part 2',
            youtube_id: '12s3qwd4'
          },
          {
            id: '3',
            title: '3',
            youtube_id: '1s2qwd34'
          }
        ],
        level: ['B1', 'B2'],
        rating: 2.3,
        ratingCounter: 100,
        youtubeUrl: 'https://docviewer.yandex.ru/view/77182671/?*=Ypuu49GoLcLIT5oJ6VMCOYvRj5x7InVybCI6Imh0dHA6Ly9LaGFyY2h1ay5ydS9KYXZhU2NyaXB0LnBkZiIsInRpdGxlIjoiSmF2YVNjcmlwdC5wZGYiLCJ1aWQiOiI3NzE4MjY3MSIsInl1IjoiODQ2ODE5MDU5MTUzOTMyNDA1MiIsIm5vaWZyYW1lIjp0cnVlLCJ0cyI6MTU0OTg3NDA2ODQ5Niwic2VycFBhcmFtcyI6Imxhbmc9cnUmbmFtZT1KYXZhU2NyaXB0LnBkZiZ0bT0xNTQ5ODc0MDY1JnRsZD1ydSZ0ZXh0PUphdmFTY3JpcHQlM0ElMjBUaGUlMjBEZWZpbml0aXZlJTIwR3VpZGUlMjBwZGYlMjBkb3dubG9hZCUyMHJ1JnVybD1odHRwJTNBJTJGJTJGS2hhcmNodWsucnUlMkZKYXZhU2NyaXB0LnBkZiZscj0xMTMxNCZtaW1lPXBkZiZsMTBuPXJ1JnNpZ249N2U1OTQwN2NmODNlNzZjN2ViNzkwMGM5MGIwZWJiM2Ema2V5bm89MCJ9&page=59&lang=ru'
      }
    ],
    bookParts: [
      {
        bookId: '1',
        bookPartId: '1',
        bookTitle: 'Book 1',
        partTitle: 'part 1',
        youtube_id: '234refdw',
        content: [
          {
            sectences: [
              {
                originText: 'FUCK',
                transText: 'nahyi'
              },
              {
                originText: 'some',
                transText: 'kakoito'
              },
              {
                originText: 'sf',
                transText: 'asd'
              }
            ]
          }
        ]
      },
      {
        bookId: '2',
        bookPartId: '2',
        bookTitle: 'Book 2',
        partTitle: 'part 2',
        youtube_id: '234refdw',
        content: [
          {
            sectences: [
              {
                originText: 'FUCK',
                transText: 'nahyi'
              },
              {
                originText: 'some',
                transText: 'kakoito'
              },
              {
                originText: 'sf',
                transText: 'asd'
              }
            ]
          }
        ]
      }
    ],
    words: [
      {
        origWords: 'hello',
        transWords: 'Привет'
      },
      {
        origWords: 'hello2',
        transWords: 'Привет2'
      },
      {
        origWords: 'hello3',
        transWords: 'Привет3'
      },
      {
        origWords: 'hello4',
        transWords: 'Привет4'
      }
    ]
  },
  mutations: {
    setBooks (state, payload) {
      state.books = payload
    }
  },
  actions: {

  },
  getters: {
    getBooks (state) {
      return state.books
    },
    getParts (state) {
      return state.bookParts
    }
  }
}
