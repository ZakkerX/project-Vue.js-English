<template>
  <v-card>
    <div>
      <div class="display-1">{{ part.bookTitle }}</div>
      <div class="headline">{{ part.partTitle }}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    'part': {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
