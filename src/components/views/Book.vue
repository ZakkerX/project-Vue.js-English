<template>
  <v-container grid-list-md v-if="book">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm-1>

        <book-detalis :book='book'></book-detalis>
      </v-flex>
      <v-flex xs12 sm10 offset-sm-1 v-for="part in book.parts" :key="part.id">
        <book-part-list-item :part='part' :bookId='book.id'></book-part-list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BookDetalis from '../BookDetalis'
import BookPartListItem from '../BookPartListItem'
export default {
  props: {
    'id': {
      type: String,
      required: true
    }
  },
  computed: {
    book () {
      return this.$store.getters.getBooks.find(b => b.id === this.id)
    }
  },
  components: {
    BookDetalis, BookPartListItem
  }
}
</script>

<style>

</style>
