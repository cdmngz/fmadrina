import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAY480mMd3jxBxS0gll8W9pJz7jMsJ-bao",
  authDomain: "madrina-madrid.firebaseapp.com",
  databaseURL: "https://madrina-madrid.firebaseio.com",
  projectId: "madrina-madrid",
  storageBucket: "madrina-madrid.appspot.com",
  messagingSenderId: "287578642994",
  appId: "1:287578642994:web:9adc6afa2ae58a2f8ffa2b",
  measurementId: "G-9VPWWCVWF7"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = firebase.firestore()
export const google = new firebase.auth.GoogleAuthProvider()

Vue.config.productionTip = false

let app = null

firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
  if(user) {
    console.log('Hay usuario');
  } else {
    console.log('No hay usuario')
  }
})