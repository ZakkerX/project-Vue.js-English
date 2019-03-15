<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2>
        <books-list></books-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BooksList from '../BooksList'
export default {
  components: {
    BooksList
  }
}
</script>

<style>

</style>
