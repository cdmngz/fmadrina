<template>
  <div class="principal">

    <v-img
      height="100vh"
      alt="https://www.instagram.com/osenb/"
      src="@/assets/plantica.jpg"
    >
    <div class="section-1">  
      <aside></aside>
      <v-row class="pt-12">
        <v-col xs="12" sm="7" md="7"></v-col>
        <v-col xs="12" sm="5" md="4">
          <v-card class="d-flex flex-column align-center pa-6">
          
            <v-card-title>Iniciar Sesión</v-card-title>
            <v-row>
              <v-btn class="white pa-6 my-7">
                <v-img src="@/assets/btn_google_light_normal_ios.svg"></v-img>Google
              </v-btn>
            </v-row>

            <v-text-field
              :autofocus="true"
              color="blue"
              outlined
              placeholder="Usuario"
              append-icon="mdi-account"
              :success="user.length > 0"
              v-model="user"
              ></v-text-field>

            <v-text-field
              :append-icon="eyeIcon ? 'mdi-eye' : 'mdi-eye-off'"
              color="blue"
              @click:append="eyeIcon = !eyeIcon"
              outlined
              placeholder="Password"
              :success="password.length > 4"
              :type="eyeIcon ? 'text' : 'password'"
              v-model="password"
            ></v-text-field>

            <v-btn class="orange darken-4 pa-6 my-2" dark @click="signIn">Iniciar Sesión</v-btn>
            
          </v-card>
        </v-col>
      </v-row>
    </div>
    </v-img>

    <div class="video">
      <div class="video-texto">
        <h1>Te</h1>
        <h1>podemos</h1>
        <h1>ayudar</h1>
      </div>
      <video class="video player" ref="videoRef" src="" muted loop></video>
    </div>

    <v-timeline>
      <v-timeline-item
        v-for="(year, i) in years"
        :key="i"
        :color="year.color"
        small
        class="my-8"
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold ${year.color}--text`"
            v-text="year.year"
          ></span>
        </template>
        <div :class="i%2===0 ? 'd-flex flex-column' : 'd-flex flex-column align-end'">
          <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">Título {{i+1}}</h2>
          <p style="text-align: justify; width: 35vw; color: #666">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit doloribus voluptas repudiandae culpa itaque modi debitis vero distinctio qui perspiciatis ad quis maiores neque dolore veritatis, eveniet aperiam mollitia officiis.</p>
        </div>
      </v-timeline-item>
    </v-timeline>

    <v-footer class="mt-8" width="100vw" padless>
    <v-card
      flat
      tile
      width="100vw"
      class="white text-center"
    >
      <v-card-text>
        <v-btn
          v-for="(item, index) in icons"
          :key="index"
          class="mx-4"
          icon
        >
          <v-icon :color="item.color" size="24px">{{ item.icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="pt-0">Nos puedes contactar a través de nuestras redes.</v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        {{ new Date().getFullYear() }} — <strong>Fundación Madrid</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  </div>
</template>

<script>
  import { auth, google } from '../main'

  export default {
    name: 'Home',
    data: () => ({
      years: [ { color: 'cyan', year: '2001', }, { color: 'blue', year: '2010', }, { color: 'purple', year: '2015', }, { color: 'red', year: '2018', } ],
      user: 'invitado@gmail.com',
      password: '123456',
      eyeIcon: false,
      icons: [ { color: 'indigo', icon: 'mdi-facebook' }, { color: 'blue', icon: 'mdi-twitter' }, {color: 'orange', icon: 'mdi-instagram'} ]
    }),
    mounted() {
      this.videoStart()
    },
    methods: {
      videoStart() {
        this.$refs.videoRef.src = require('@/assets/video.mp4');
        this.$refs.videoRef.play();
      },
      signIn() {
        this.$router.push({name: 'Dashboard'})
      }
    }
  }
</script>

<style scoped>
  .principal {
    width: 100vw;
  }
  .section-1 {
    position: relative;
    width: 100vw;
    top: 0;
    left: 0;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;    
  }
  .section-1 aside {
    background-color: rgba(0,0,0,0.2);
    clip-path: polygon(50% 0, 100% 0%, 100% 100%, 35% 100%);
    height: 100%;
    position: absolute;
    width: 100%;
  }
  .video {
    width: 100vw;
    position: relative;
  }
  .player {
    height: 100%;
  }
  .video-texto {
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    height: 100%;
    left: 0;
    padding: 5%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .video-texto h1 {
    color: rgba(255, 255, 255, 0.6);
    font-size: calc(3em + 3vw);
    justify-self: center;
  }
  .video-texto h1:nth-of-type(1) {
    align-self: end;
    grid-column: 1/2;
    grid-row: 1/2;
  }
  .video-texto h1:nth-of-type(2) {
    align-self: center;
    grid-column: 2/3;
    grid-row: 2/3;
  }
  .video-texto h1:nth-of-type(3) {
    align-self: start;
    grid-row: 3/4;
    grid-column: 3/4;
  }
</style>