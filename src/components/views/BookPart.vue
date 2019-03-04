<template>
  <v-container fluid grid-list-md v-if="part">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 v-if="finishedDate" >
        <v-card >
          <v-responsive>
            <v-img max-width='400px' src='https://firebasestorage.googleapis.com/v0/b/learn-englich.appspot.com/o/8TEAopGTa.jpg?alt=media&token=fd905756-a6ab-412b-a700-b8a596f58d0e'></v-img>
          </v-responsive>
          <v-card-title primary-title>
            <div class="headline">Done! {{finishedDate | formattedDate}}</div>
          </v-card-title>
          <v-card-text>
            <span>My mark</span>
            <v-rating v-model="savedRating" color="success" readonly large></v-rating>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-content :part='part'></book-part-content>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1>
        <book-part-words :words='part.words'></book-part-words>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 class="text-xs-center">
        <v-dialog v-model="finishDialog" persistent max-width="400px">
          <v-btn
          slot="activator"
          color="success"
          dark
          v-if='!finishedDate'
          >
          <v-icon>check</v-icon>To finish
          </v-btn>
          <v-responsive>
            <v-img max-width='400px' src='https://firebasestorage.googleapis.com/v0/b/learn-englich.appspot.com/o/8TEAopGTa.jpg?alt=media&token=fd905756-a6ab-412b-a700-b8a596f58d0e'></v-img>
          </v-responsive>
          <v-card-title primary-title>
            <div class="headline">Done!</div>
          </v-card-title>
          <v-card-text>
            <span>My mark</span>
            <v-rating v-model="rating" color="success" half-increment large></v-rating>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark flat @click.native="finishDialog = false">
              <v-icon>close</v-icon> Close
            </v-btn>
            <v-btn color="primary" dark flat @click.native="finishWork">
              <v-icon>check</v-icon> Done
            </v-btn>
          </v-card-actions>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import BookPartContent from '../BookPartContent'
import BookPartWords from '../BookPartWords'
export default {
  props: {
    'bookId': {
      type: String,
      required: true
    },
    'partId': {
      type: String,
      required: true
    }
  },
  data () {
    return {
      part: null,
      finishDialog: false,
      rating: 0
    }
  },
  computed: {
    finishedDate () {
      return this.$store.getters.userData.books[this.bookId].parts[this.partId].finishedDate
    },
    savedRating () {
      return this.$store.getters.userData.books[this.bookId].parts[this.partId].rating
    }
  },
  created () {
    Vue.$db.collection('bookParts')
      .where('bookId', '==', this.bookId)
      .where('bookPartId', '==', this.partId)
      .get()
      .then(qs => {
        qs.forEach(s => {
          this.part = s.data()
        })
      })
      .then(() => {
        this.$store.dispatch('updateUserBookPartStats', {bookId: this.bookId, partId: this.partId})
      })
      .catch(e => {
        console.log(new Error(e))
      })
  },
  methods: {
    finishWork () {
      this.$store.dispatch('finishUserBookPart', {bookId: this.bookId, partId: this.partId, rating: this.rating})
      this.finishDialog = false
    }
  },
  components: {
    BookPartContent,
    BookPartWords
  }
}
</script>

<style>

</style>
