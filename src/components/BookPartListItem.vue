<template>
  <v-card color="accent">
    <v-card-title primary-title class="headline">{{part.title}}</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat class='primary' :to="{name: 'bookPart', params: {bookId: bookId, partId: part.id}}">Open</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    'part': {
      type: Object,
      required: true
    },
    'bookId': {
      required: true
    }
  }
}
</script>

<style>

</style>
