<template>
  <v-card color="grey lighten-4" class="black--text">
    <v-container fluid>

      <v-layout row class="hidden-sm-and-down">
        <v-flex xs4 md3>
          <v-img :src="book.imageUrl"></v-img>
        </v-flex>
        <v-flex xs8 md10>
          <v-card-title>
            <div>
              <div class="headline">{{ book.title}}</div>
              <div>{{ book.description }}</div>
              <div>Level: {{ getBoockLevel(book.level) }}, {{ book.parts.length}} parts</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <!-- <v-rating v-model="book.rating" color="orange" readonly dense half-increments></v-rating>
            <div class="ml-1">
              <span>{{ book.rating }}</span>
              <span class="ml-1">({{ book.ratingCounter }})</span>
            </div> -->
            <v-spacer></v-spacer>
            <v-btn
            v-if="canLoadBook(book.id)"
            @click="loadBook(book.id)"
            class="primary" flat
            >Download</v-btn>
            <div v-if="getUserDataBook(book.id)">
              <v-icon>work_outline</v-icon>
              Loaded {{getBookAddedDate(book.id) | formattedDate}}
            </div>
            <v-btn flat color="black">
              <v-icon left>visibility</v-icon> Youtube
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>

      <div class="hidden-md-and-up">
        <v-layout row>
          <v-flex xs10 sm10 offset-sm1 offset-xs1>
            <v-card-title>
              <div>
                <div class="headline">{{ book.title}}</div>
              </div>
            </v-card-title>
            <v-img max-height="300" :src="book.imageUrl"></v-img>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 offset-xs1>
            <v-card-title>
              <div>{{ book.description }}</div>
              <div>Level: {{ getBoockLevel(book.level) }}, {{ book.parts.length}} parts</div>
            </v-card-title>
            <v-card-actions>
              <!-- <v-rating v-model="book.rating" color="orange" readonly dense half-increments></v-rating>
              <div class="ml-1">
                <span>{{ book.rating }}</span>
                <span class="ml-1">({{ book.ratingCounter }})</span>
              </div> -->
            </v-card-actions>
            <v-btn
            @click="loadBook(book.id)"
            v-if="canLoadBook(book.id)"
            class="primary" flat
            >Download</v-btn>
            <div v-if="getUserDataBook(book.id)">
              <v-icon>work_outline</v-icon>
              Loaded {{getBookAddedDate(book.id) | formattedDate}}
            </div>
            <div>
            <v-btn right flat color="black"><v-icon left>visibility</v-icon>Youtube</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </div>

    </v-container>
  </v-card>
</template>

<script>
import * as BookHelper from '../helpers/book'
import {mapGetters} from 'vuex'
export default {
  props: {
    'book': {
      type: Object,
      required: true
    }
  },
  methods: {
    getBoockLevel: BookHelper.getBoockLevel,

    canLoadBook (bookId) {
      let book = this.getUserDataBook(bookId)
      return this.isUserLoggedIn && !this.loading && !book
    },
    getUserDataBook (bookId) {
      return this.userData.books[bookId]
    },
    loadBook (bookId) {
      this.$store.dispatch('addUserBook', bookId)
    },
    getBookAddedDate (bookId) {
      let book = this.getUserDataBook(bookId)
      return book.addedDate
    }
  },
  computed: {
    ...mapGetters([
      'isUserLoggedIn', 'userData', 'loading'
    ])
  }
}
</script>

<style>

</style>
