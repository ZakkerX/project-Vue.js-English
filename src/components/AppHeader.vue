<template>
  <div>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="isUserLoggedIn"
          @click="onLogout"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
        to="/"
        tag="span"
        class="pointer"
        >
          <v-toolbar-title  v-text="'English'"></v-toolbar-title>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          flat
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn
          @click="dialog = true"
          flat
          v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            The confirmation
          </v-card-title>

          <v-card-text>
            Do you really want to get out?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="onLogout"
            >
              Yes
            </v-btn>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      dialog: false
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          {title: 'Home', icon: 'home', url: '/'},
          {title: 'Books', icon: 'library_books', url: '/books'},
          {title: 'My profile', icon: 'account_circle', url: '/profile'}
        ]
      }
      return [
        {title: 'Home', icon: 'home', url: '/'},
        {title: 'Login', icon: 'lock', url: '/login'},
        {title: 'Registration', icon: 'face', url: '/registration'}
      ]
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.dialog = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="stylus">
.pointer
  cursor pointer
</style>
