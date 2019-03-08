<template>
  <div>
    <v-tooltip bottom>
      <v-avatar slot="activator" v-if="word.type == 1" color="teal" :size='size'>
        <span class="white--text">W</span>
      </v-avatar>
      <span>Word</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-avatar slot="activator" v-if="word.type == 2" color="indigo" :size='size'>
        <span class="white--text">RW</span>
      </v-avatar>
      <span>Expression</span>
    </v-tooltip>
    {{ getFullOriginalWord(word)}}
  </div>
</template>

<script>
import {getFullOriginalWord} from '../helpers/words'
export default {
  props: {
    word: Object,
    size: Number
  },
  methods: {
    getFullOriginalWord
  }
}
</script>

<style>

</style>
