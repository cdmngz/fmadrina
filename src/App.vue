<template>
  <v-app>
    <v-app-bar
      absolute
      :app="currentRouteName === 'Home' ? false : true"
      :color="currentRouteName === 'Home' ? 'transparent' : 'white'"
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
      <v-spacer></v-spacer>
      <v-menu :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-btn v-show="currentRouteName === 'Dashboard'" icon v-on="on">
            <v-icon color="grey darken-1">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn text><span class="mr-2">Perfil</span></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text to="/"><span class="mr-2">Cerrar Sesión</span></v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  }
});
</script>
