<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="words"
      content-tag="v-layout" row wrap
      :hide-actions="true"
    >
      <v-flex
        slot="item" slot-scope="props" xs12 sm12 md6 lg6>
        <v-card>
          <v-card-title>
            <div class="headline">

              <v-tooltip bottom>
                <v-avatar slot="activator" v-if="props.item.type == 1" color="teal" size='52'>
                  <span class="white--text">W</span>
                </v-avatar>
                <span>Word</span>
              </v-tooltip>

              <v-tooltip bottom>
                <v-avatar slot="activator" v-if="props.item.type == 2" color="indigo" size='52'>
                  <span class="white--text">RW</span>
                </v-avatar>
                <span>Expression</span>
              </v-tooltip>

              {{ getFullOriginalWord(props.item)}}
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="headline">
            {{ props.item.transText }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="cheking || loading" @click="addWord(props.item)" fab dark small color='primary'>
              <v-icon dark>add</v-icon>
            </v-btn>
            <v-snackbar v-model="snackbar" bottom light color="error">
              <div><v-icon>warning</v-icon> {{snackbarText}}</div>
            </v-snackbar>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
import {getFullOriginalWord} from '../helpers/words'
export default {
  props: {
    'data': {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      snackbarText: null,
      snackbar: false,
      cheking: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    words () {
      if (!this.data) return []

      let words = []

      for (let property in this.data) {
        if (this.data.hasOwnProperty(property)) {
          let word = this.data[property]
          word.key = property
          words.push(word)
        }
      }
      return words
    }
  },
  methods: {
    getFullOriginalWord,
    addWord (entity) {
      this.cheking = true
      let userWords = this.$store.getters.userData.words
      let wordAdded = userWords[entity.key]
      if (wordAdded) {
        this.snackbar = true
        this.snackbarText = 'Word already added'
      } else if (Object.keys(userWords).length > 100) {
        this.snackbar = true
        this.snackbarText = 'Limit 100 words'
      } else {
        this.$store.dispatch('addUserWord', entity)
      }
      this.cheking = false
    }
  }
}
</script>

<style>

</style>
