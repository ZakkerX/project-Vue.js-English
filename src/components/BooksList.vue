<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md10 sm8 offset-sm2 offset-md1>
        <v-container fluid>
          <v-layout row>
            <v-flex xs7 md8>
              <v-text-field label="Search" v-model="searchTerm"></v-text-field>
            </v-flex>
            <v-flex xs5 m4>
              <v-select multiple label="Level" :items='levels' v-model="level"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 md10 sm10 offset-sm1 offset-md1
      v-for="book in filteredBooks"
      :key="book.id"
      >
        <book-list-item :book='book'></book-list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BookListItem from './BookListItem'
export default {
  data () {
    return {
      searchTerm: null,
      level: [],
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    }
  },
  computed: {
    books () {
      return this.$store.getters.getBooks
    },
    filteredBooks () {
      let books = this.books
      if (this.searchTerm) {
        books = books.filter(b =>
          b.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 ||
          b.description.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0)
      }
      if (this.level.length) {
        books = books.filter(b => this.level.filter(val => b.level.indexOf(val) !== -1).length > 0)
      }
      return books
    }
  },
  components: {
    BookListItem
  }
}
</script>

<style>

</style>
