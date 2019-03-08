<template>
<div>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0"><v-icon>person</v-icon> {{userName}}</h3>
        <h3 class="headline mb-0"><v-icon>email</v-icon> {{userEmail}}</h3>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="310">
        <v-btn slot="activator" color="primary" dark>To change</v-btn>
        <v-card>
          <v-card-title class="headline">Want to change the data?</v-card-title>
          <v-card-text>
            <v-alert
              :value="error"
              type="warning"
              class="mb-4"
            >
              {{error}}
            </v-alert>
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :counter="6"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <h3>I want to change</h3>
              <v-radio-group v-model="changeType">
                <v-radio label="Name" :value="`name`"></v-radio>
                <v-text-field
                v-if="changeType === 'name'"
                  prepend-icon="person"
                  name="newName"
                  label="New name"
                  type="text"
                  v-model="newName"
                  :rules="nameRules"
                ></v-text-field>
                <v-radio label="Email" :value="`email`"></v-radio>
                <v-text-field
                v-if="changeType === 'email'"
                  prepend-icon="email"
                  name="newLogin"
                  label="New email"
                  type="email"
                  v-model="newEmail"
                  :rules="emailRules"
                ></v-text-field>
                <v-radio label="Password" :value="`password`"></v-radio>
                <v-text-field
                v-if="changeType === 'password'"
                  prepend-icon="lock"
                  name="newPassword"
                  label="New password"
                  type="password"
                  :counter="6"
                  v-model="newPassword"
                  :rules="passwordRules"
                ></v-text-field>
              </v-radio-group>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn
              color="primary"
              @click.prevent="changeUserData"
              :loading="loading"
              :disabled="!valid || loading"
              flat>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
export default {
  data () {
    return {
      changeType: '',
      dialog: false,
      name: '',
      email: '',
      password: '',
      newEmail: '',
      newPassword: '',
      newName: '',
      valid: false,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => emailRegex.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ]
    }
  },
  computed: {
    ...mapGetters(['userName', 'userEmail', 'loading', 'error'])
  },
  methods: {
    changeUserData () {
      this.$store.dispatch('changeUserProfileData', {
        email: this.email,
        password: this.password,
        newName: this.newName,
        newEmail: this.newEmail,
        newPassword: this.newPassword,
        changeType: this.changeType
      })
    }
  },
  created () {
    this.$bus.$on('userProfileDataChanged', () => {
      this.dialog = false
    })
  },
  beforeDestroy () {
    this.$bus.$off('userProfileDataChanged')
  }
}
</script>

<style>

</style>
