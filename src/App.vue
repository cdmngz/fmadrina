<template>
  <v-app>
    <v-app-bar
      absolute
      :app="currentRouteName === 'Home' ? false : true"
      :color="currentRouteName === 'Home' ? 'transparent' : 'white'"
      class="d-print-none"
      dark
      :flat="currentRouteName === 'Home' ? true : false"
    >
      <div class="d-flex align-center">
        <v-img
          alt="https://www.instagram.com/osenb/"
          class="mx-6"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="72"
        />
      </div>
      <v-tabs class="ml-4" v-if="currentRouteName !== 'Home'">
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
        <v-tab to="/dashboard"><v-icon color="teal lighten-4">mdi-home-assistant</v-icon></v-tab>
        <v-tab to="/imprimir"><v-icon color="teal lighten-4">mdi-printer-search</v-icon></v-tab>
        <v-tab to="/solicitud"><v-icon color="teal lighten-4">mdi-baby-buggy</v-icon></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-menu :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-btn v-show="currentRouteName !== 'Home'" icon v-on="on">
            <v-icon color="grey darken-1">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn text><span class="mr-2">Perfil</span></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text @click="signOut"><span class="mr-2">Cerrar Sesión</span></v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import { auth } from './main'


export default Vue.extend({
  name: 'App',
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    signOut() {
      auth.signOut()
        .then(
          this.$router.go()
        )
        .catch(error => {
          console.log(error)
        })
    }
  }
})
</script>
