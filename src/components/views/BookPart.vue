<template>
  <v-container fluid grid-list-md v-if="part">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-content :part='part'></book-part-content>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-words :words='part.words'></book-part-words>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import BookPartContent from '../BookPartContent'
import BookPartWords from '../BookPartWords'
export default {
  props: {
    'bookId': {
      type: String,
      required: true
    },
    'partId': {
      type: String,
      required: true
    }
  },
  data () {
    return {
      part: null
    }
  },
  created () {
    Vue.$db.collection('bookParts')
      .where('bookId', '==', this.bookId)
      .where('bookPartId', '==', this.partId)
      .get()
      .then(qs => {
        qs.forEach(s => {
          this.part = s.data()
        })
      })
      .then(() => {
        this.$store.dispatch('updateUserBookPartStats', {bookId: this.bookId, partId: this.partId})
      })
      .catch(e => global.console.log(e))
  },
  components: {
    BookPartContent,
    BookPartWords
  }
}
</script>

<style>

</style>
