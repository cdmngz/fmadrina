<template>
  <div class="text-center">
    <v-avatar class="my-5" size="100">
      <img src="../assets/1.jpg">
    </v-avatar>

    <v-tabs
      v-model="tab"
      background-color="teal lighten-4"    
      centered
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab>Dis</v-tab>
      <v-tab>Fis</v-tab>
      <v-tab>Informe Psicológico</v-tab>
      <v-tab>CV</v-tab>

      <v-tab-item>
        <v-card flat tile>
          <v-card-text>DIS</v-card-text>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat tile>
          <v-card-text>FIS</v-card-text>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat tile>
          <v-card-text>Informe</v-card-text>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat tile>
          <v-card-text>CV</v-card-text>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
  }
</script>