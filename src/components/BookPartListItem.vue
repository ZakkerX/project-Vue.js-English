<template>
  <v-card color="accent">
    <v-card-title primary-title class="headline">{{part.title}}</v-card-title>
    <v-card-actions>
      <div v-if="finishedDate">
        <v-icon dark>check</v-icon>
        Done {{finishedDate | formattedDate}}
      </div>
      <v-spacer></v-spacer>
      <v-btn flat class='primary'
      :to="{name: 'bookPart', params: {bookId: bookId, partId: part.id}}"
      v-if="isUserBookLoaded"
      >Open</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    'part': {
      type: Object,
      required: true
    },
    'bookId': {
      required: true
    }
  },
  computed: {
    ...mapGetters(['isUserLoggedIn', 'userData', 'loading']),
    isUserBookLoaded () {
      return this.isUserLoggedIn && !this.loading && !!this.userData.books[this.bookId]
    },
    finishedDate () {
      if (!this.isUserBookLoaded) return false

      let book = this.userData.books[this.bookId]
      if (book && book.parts[this.part.id]) {
        return book.parts[this.part.id].finishedDate
      }
    }
  }
}
</script>

<style>

</style>
