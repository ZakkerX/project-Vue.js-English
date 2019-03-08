<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-tabs fixed-tabs v-model="tabMode" color="accent" dark slider-color="success">
          <v-tab :key="'Data'" ripple>
             data
          </v-tab>
          <v-tab :key="'Books'" ripple>
             Book
          </v-tab>
          <v-tab :key="'Words'" ripple>
             words
          </v-tab>
          <v-tab-item :key="'Data'">
            <user-profile-data></user-profile-data>
          </v-tab-item>
          <v-tab-item :key="'Books'">
            Books
          </v-tab-item>
          <v-tab-item :key="'Words'">
            <user-profile-words></user-profile-words>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import UserProfileData from '../UserProfileData'
import UserProfileWords from '../UserProfileWords'
export default {
  data () {
    return {
      tabMode: 'data'
    }
  },
  components: {
    UserProfileData, UserProfileWords
  }
}
</script>

<style>

</style>
