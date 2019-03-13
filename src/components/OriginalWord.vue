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
    {{ getFullOriginalWord(word) }} <v-icon v-if="canPronounceWord" @click="pronounce(word)">music_note</v-icon>
  </div>
</template>

<script>
import {getFullOriginalWord} from '../helpers/words'
export default {
  props: {
    word: Object,
    size: Number,
    showAudio: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      canPronounceWord: false,
      voice: null
    }
  },
  methods: {
    getFullOriginalWord,
    pronounce (word) {
      let msg = new SpeechSynthesisUtterance()
      msg.voice = this.voice
      msg.rate = 1
      msg.pitch = 1
      msg.volume = 1
      msg.text = this.getFullOriginalWord(word)

      speechSynthesis.speak(msg)
    }
  },
  created () {
    if (this.showAudio) {
      if ('speechSynthesis' in window) {
        let engVoices = speechSynthesis.getVoices().filter(v => v.name.toLowerCase().indexOf('english') >= 1)
        if (engVoices.length) {
          this.canPronounceWord = true
          this.voice = engVoices[0]
        }
      }
    }
  }
}
</script>

<style>

</style>
