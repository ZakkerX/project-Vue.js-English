<template>
  <div>
    <v-card v-if="currentWord" class="mt-2" dark>
      <v-card-title>
        <div class="headline">
          <original-word :showAudio='true' :word='currentWord' :size="45"></original-word>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="headline" v-if="currentWord.showTrans">
        {{currentWord.transText}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark small color="accent" @click="currentWord.showTrans = true" v-if="!currentWord.showTrans">
          <v-icon>visibility</v-icon> Translation
        </v-btn>
        <v-btn dark small color="success" @click="processWord(currentWord)" v-if="!currentWord.showTrans">
          <v-icon>check</v-icon> I know
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title class="display-1" v-if="words.length">
        <span>Words for today ({{words.length}})</span>
      </v-card-title>
      <v-card-title v-else>
        <span></span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <div v-for='(word, index) in words' :key="index">
            <v-list-tile @click="selectWord(word)">
              <div class="title pa-1">
                <original-word :word='word' :size="35"></original-word>
              </div>
            </v-list-tile>
          </div>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import OriginalWord from './OriginalWord'
export default {
  data () {
    return {
      words: [],
      currentWord: null
    }
  },
  methods: {
    setWords () {
      this.words = []
      let userWords = this.$store.getters.userData.words
      for (let property in userWords) {
        if (userWords.hasOwnProperty(property)) {
          let word = userWords[property]

          let isAvalible = (word.nextShowDate instanceof Date) ? word.nextShowDate <= new Date() : word.nextShowDate.toDate() <= new Date()

          if (isAvalible) {
            this.words.push({
              origText: word.origText,
              origPrefix: word.origPrefix,
              transText: word.transText,
              type: word.type,
              key: property,
              showTrans: false
            })
          }
        }
      }
      this.currentWord = this.words.length > 0 ? this.words[0] : null
    },
    processWord (word) {
      this.$store.dispatch('processUserWord', word.key)
    },
    selectWord (word) {
      word.showTrans = false
      this.currentWord = word
    }
  },
  mounted () {
    this.$bus.$on('userword: updated', () => {
      this.setWords()
    })
    this.setWords()
  },
  components: {
    OriginalWord
  }
}
</script>

<style>

</style>
