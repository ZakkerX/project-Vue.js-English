<template>
  <div>
    <v-card v-if="currentWord" class="mt-2" dark>
      <v-card-title>
        <div class="headline">
          <origin-word></origin-word>
        </div>
      </v-card-title>
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
              shawTrans: false
            })
          }
        }
      }
      this.currentWord = this.words.length > 0 ? this.words[0] : null
    }
  },
  mounted () {
    this.setWords()
  },
  components: {
    OriginalWord
  }
}
</script>

<style>

</style>
